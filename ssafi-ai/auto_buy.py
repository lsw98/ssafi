# 자동매수
from models import Base, Member, Aitrade, TradeRecord, Kospi, Hold
from db import engine, Session
from KISapi import _getAccessToken, _getStockPrice, _buyStock, _getStockBalance
from load_prediction import danger_rise, neutral_rise, safe_rise
from datetime import datetime
from sqlalchemy import select 
Base.metadata.create_all(engine)

session = Session()
# new_member = Member(email="lsw@gmail.com", password="1234", role="member", account_prefix = '50090046', account_suffix = '01',
#                     app_key = "PSzvBwVvCqlukNKHciYB1xffeT9jS3590TMx", secret_key = "k6tJ0l9PXUzUejoFOCt/5kLDS5fFh8aQ+/WlHlKiuBd5jETKD0dXf2dZhK7Ca1Rl4klUB7zZZW2oq70VZBIRyLrIEs2s7VQcZIyslb/blJVamaKf5I+sVIFR2zEZCGrQI1Nfl/dFF306fiLhFu4Qcep6iFJGnSd5o66qLsAHWaq6Qfyp30A=")
# session.add(new_member)
# session.commit()
# new_trade = Aitrade(id=1, ai_budget = 0, ai_goal = 60000000, risk_ratio = 0.4, neutral_ratio = 0.3, safety_ratio = 0.3, trading_start_yn = True)
# session.add(new_trade)
# session.commit()
# new_hold = Hold(user_id = 1, kospi_id = 1)
# session.add(new_hold)
session.commit()

members = session.query(Member).all()

for member in members:
    
    # 목표금액, 투자비율 정보
    trade_info = session.get(Aitrade, member.id)
    
    # 거래 중인지 확인 
    if not trade_info.trading_start_yn:
        continue      
    
    # 거래 시작 -> Access Token 발급
    access_token, access_token_expired = _getAccessToken(member)
        
    # 잔고 조회
    balance, balance2 = _getStockBalance(member, access_token)
    print(balance2)
    
    # 주식 + 현금 평가금액이 목표 금액 도달하면 중단
    if int(balance2[0]['tot_evlu_amt']) >= trade_info.ai_goal:
        trade_info.trading_start_yn = False
        continue
        
        
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
    
    # 안전 / 중립 / 위험 종목 매수
    risk_id = session.scalars(select(Kospi).filter(Kospi.kospi_code == risk_item[0])).first().kospi_id
    risk_price = _getStockPrice(risk_item[0], member, access_token)
    risk_quantity = int(risk_cost / risk_price)
    print(_buyStock(risk_item[0], member, risk_quantity, access_token))  
    # 위험 종목 거래 내역 저장
    risk_record = TradeRecord(trade_price = risk_price, trade_date = datetime.now(), trade_quantity = risk_quantity, user_id = member.id, kospi_id = risk_id)
    session.add(risk_record)
    
    neutral_id = session.scalars(select(Kospi).filter(Kospi.kospi_code == neutral_item[0])).first().kospi_id
    neutral_price = _getStockPrice(neutral_item[0], member, access_token)
    neutral_quantity = int(neutral_cost / neutral_price)
    print(_buyStock(neutral_item[0], member, neutral_quantity, access_token))  
    # 중립 종목 거래 내역 저장
    neutral_record = TradeRecord(trade_price =  neutral_price, trade_date = datetime.now(), trade_quantity = neutral_quantity, user_id = member.id, kospi_id = neutral_id)
    session.add(neutral_record)
    
    safe_id = session.scalars(select(Kospi).filter(Kospi.kospi_code == safe_item[0])).first().kospi_id
    safe_price = _getStockPrice(safe_item[0], member, access_token)
    safe_quantity = int(safe_cost / safe_price)
    print(_buyStock(safe_item[0], member, safe_quantity, access_token))  
    # 안전 종목 거래 내역 저장
    safe_record = TradeRecord(trade_price = safe_price, trade_date = datetime.now(), trade_quantity = safe_quantity, user_id = member.id, kospi_id = safe_id)
    session.add(safe_record)

session.close()