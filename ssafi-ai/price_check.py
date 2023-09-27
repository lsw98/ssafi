# 주기적으로 주가 확인하여 3프로 이상 하락하면 매도 처리
from models import Base, Member, Kospi, Aitrade, Hold
from sqlalchemy import select
from sqlalchemy.orm import join
from db import Session, engine
from KISapi import _getAccessToken, _sellStock, _getStockBalance

Base.metadata.create_all(engine)
session = Session()
# new_member = Member(email="lsw@gmail.com", password="1234", role="member"
#                     , app_key = "PSzvBwVvCqlukNKHciYB1xffeT9jS3590TMx", secret_key = "k6tJ0l9PXUzUejoFOCt/5kLDS5fFh8aQ+/WlHlKiuBd5jETKD0dXf2dZhK7Ca1Rl4klUB7zZZW2oq70VZBIRyLrIEs2s7VQcZIyslb/blJVamaKf5I+sVIFR2zEZCGrQI1Nfl/dFF306fiLhFu4Qcep6iFJGnSd5o66qLsAHWaq6Qfyp30A=")
# session.add(new_member)
# session.commit()
# new_trade = Aitrade(id=1, ai_budget = 0, ai_goal = 60000000, risk_ratio = 0.4, neutral_ratio = 0.3, safety_ratio = 0.3, trading_start_yn = True)
# session.add(new_trade)
# session.commit()
# new_hold = Hold(user_id = 1, kospi_id = 1)
# session.add(new_hold)
# session.commit()
# new_hold2 = Hold(user_id = 1, kospi_id = 136)
# session.add(new_hold2)
# session.commit()
members = session.query(Member).all()

for member in members:
    # 목표금액, 투자비율 정보
    trade_info = session.get(Aitrade, member.id)
    
    # 홀드 (매수/매도 안 할 종목) 정보  
    hold_statement = select(Kospi).select_from(join(Kospi, Hold)).filter(Hold.user_id == member.id)
    hold_rows = session.scalars(hold_statement).all()
    hold_info = []
    for hold in hold_rows:
        hold_info.append(str(hold.kospi_code))
        print(hold.kospi_code)

    # 거래 중인지 확인 
    if not trade_info.trading_start_yn:
        continue      
    
    # 거래 시작 -> Access Token 발급
    access_token, access_token_expired = _getAccessToken(member)

    # 보유 주식 확인 
    balance, balance2 = _getStockBalance(member, access_token)
    for record in balance:
        code = record['pdno']
        print(code)
        print("종목 : " + record['prdt_name'])
        print("보유 수량 : " + record['hldg_qty'])
        print("현재가 : " + record['prpr'])
        print("평가금액 : " + record['evlu_amt'])
        print("평가손익금액 : " + record['evlu_pfls_amt'])
        print("평가손익률 : " + record['evlu_pfls_rt'])
        print("평가수익률 : " + record['evlu_erng_rt'])
        
        # 홀드 x, 샀을 때 보다 3%이상 하락하면 매도처리
        if record['evlu_pfls_rt'] <= -3 and code not in hold_info:
            print(code, record['hldg_qty'], '주 매도')
            print(_sellStock(code, member, record['hldg_qty'], access_token))
        
        # 홀드 확인
        if code in hold_info:
            print(code, "Hold")