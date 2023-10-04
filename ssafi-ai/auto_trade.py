from models import Base, Member, Kospi, Aitrade, Hold
from sqlalchemy import select
from db import engine, Session
# from modules.kospi_dict import kospi_dict
from KISapi import _getAccessToken, _getStockPrice, _buyStock, _sellStock, _getStockBalance
from today_prediction import danger_fall, danger_rise, neutral_fall, neutral_rise, safe_fall, safe_rise
import time
Base.metadata.create_all(engine)

session = Session()
# new_member = Member(email="lsw@gmail.com", password="1234", role="member"
#                     , app_key = "PSzvBwVvCqlukNKHciYB1xffeT9jS3590TMx", secret_key = "k6tJ0l9PXUzUejoFOCt/5kLDS5fFh8aQ+/WlHlKiuBd5jETKD0dXf2dZhK7Ca1Rl4klUB7zZZW2oq70VZBIRyLrIEs2s7VQcZIyslb/blJVamaKf5I+sVIFR2zEZCGrQI1Nfl/dFF306fiLhFu4Qcep6iFJGnSd5o66qLsAHWaq6Qfyp30A=")
# session.add(new_member)
# new_trade = Aitrade(id=1, ai_budget = 0, ai_goal = 60000000, risk_ratio = 0.4, neutral_ratio = 0.3, safety_ratio = 0.3, trading_start_yn = True)
# session.add(new_trade)
# session.commit()
members = session.query(Member).all()

# 코스피 200 DB에 저장  
# for code, name in kospi_dict.items():
#     kospi_item = Kospi(kospi_name = name, kospi_code = code)
#     session.add(kospi_item)
# session.commit()

for member in members:
    
    # 목표금액, 투자비율 정보
    trade_info = session.get(Aitrade, member.id)
    
    # 홀드 (매수/매도 안 할 종목) 정보  
    hold_statement = select(Hold).join(Kospi.kospi_id)
    hold_rows = session.scalars(hold_statement).all()
    hold_info = []
    for hold in hold_rows:
        hold_info.append(str(hold.kospi_code))

    # 거래 중인지 확인 
    if not trade_info.trading_start_yn:
        continue      
    
    # 거래 시작 -> Access Token 발급
    access_token, access_token_expired = _getAccessToken(member)

    # 보유 주식 확인 
    balance, balance2 = _getStockBalance(member, access_token)
    for record in balance:
        code = record['pdno']
        
        print("종목 : " + record['prdt_name'])
        print("보유 수량 : " + record['hldg_qty'])
        print("현재가 : " + record['prpr'])
        print("평가금액 : " + record['evlu_amt'])
        print("평가손익금액 : " + record['evlu_pfls_amt'])
        print("평가손익률 : " + record['evlu_pfls_rt'])
        print("평가수익률 : " + record['evlu_erng_rt'])
        
        
        # 홀드 종목 확인 조건 추가해야 함. 
        
        # 하락 예측 종목이면 매도 실행
        if (code in item[0] for item in danger_fall) or (code in item[0] for item in neutral_fall) or (code in item[0] for item in safe_fall):
            if code not in hold_info:
                print(_sellStock(code, member, record['hldg_qty'], access_token))
        else:
            # 상승 예측 종목이면 매도 x, 아니면 매도하고 상승 예측 종목을 매수한다.
            if (code in danger_rise) or (code in neutral_rise) or (code in safe_rise):
                continue
            else:
                if code not in hold_info:
                    print(_sellStock(code, member, record['hldg_qty'], access_token))
    
    
    # 체결 대기시간 임의로 부여
    time.sleep(10)
    # 다시 잔고 조회
    balance, balance2 = _getStockBalance(member, access_token)
    print(balance2)
    # D+2 예수금 조회 (투자 가능한 총 금액)
    deposit = int(balance2[0]['prvs_rcdl_excc_amt'])
    print(deposit)
    # 안전 / 중립 / 위험 비용 분배 
    risk_cost = deposit * trade_info.risk_ratio
    neutral_cost = deposit * trade_info.neutral_ratio
    safe_cost = deposit * trade_info.safety_ratio
    
    # 안전 / 중립 / 위험 자동 구매 종목 선정 (예측 상승률 가장 높은 것으로)
    risk_item = danger_rise[0]
    neutral_item = neutral_rise[0]
    safe_item = safe_rise[0]
    
    risk_quantity = int(risk_cost / _getStockPrice(risk_item[0], member, access_token))
    print(_buyStock(risk_item[0], member, risk_quantity, access_token))
    neutral_quantity = int(neutral_cost / _getStockPrice(neutral_item[0], member, access_token))
    print(_buyStock(neutral_item[0], member, neutral_quantity, access_token))
    safe_quantity = int(safe_cost / _getStockPrice(safe_item[0], member, access_token))
    print(_buyStock(safe_item[0], member, safe_quantity, access_token))

session.close()