# 자동매수
from models import Base, Member, Aitrade
from db import engine, Session
from KISapi import _getAccessToken, _getStockPrice, _buyStock, _getStockBalance
from today_prediction import danger_rise, neutral_rise, safe_rise

Base.metadata.create_all(engine)

session = Session()
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
    if balance2[0]['tot_evlu_amt'] >= trade_info.ai_goal:
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
    risk_quantity = int(risk_cost / _getStockPrice(risk_item[0], member, access_token))
    print(_buyStock(risk_item[0], member, risk_quantity, access_token))
    
    neutral_quantity = int(neutral_cost / _getStockPrice(neutral_item[0], member, access_token))
    print(_buyStock(neutral_item[0], member, neutral_quantity, access_token))
    
    safe_quantity = int(safe_cost / _getStockPrice(safe_item[0], member, access_token))
    print(_buyStock(safe_item[0], member, safe_quantity, access_token))

session.close()