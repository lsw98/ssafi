from models import Base, Member, Kospi
from db import engine, Session
from modules.kospi_dict import kospi_dict
from KISapi import _getAccessToken, _getStockPrice, _buyStock, _sellStock, _getStockBalance, _getCashBalance
from modules.stock_variance import danger, neutral, safe

Base.metadata.create_all(engine)

session = Session()
# new_member = Member(email="lsw@gmail.com", password="1234", role="member"
#                     , app_key = "PSzvBwVvCqlukNKHciYB1xffeT9jS3590TMx", secret_key = "k6tJ0l9PXUzUejoFOCt/5kLDS5fFh8aQ+/WlHlKiuBd5jETKD0dXf2dZhK7Ca1Rl4klUB7zZZW2oq70VZBIRyLrIEs2s7VQcZIyslb/blJVamaKf5I+sVIFR2zEZCGrQI1Nfl/dFF306fiLhFu4Qcep6iFJGnSd5o66qLsAHWaq6Qfyp30A=")
# session.add(new_member)
# session.commit()
members = session.query(Member).all()

# 코스피 200 DB에 저장
# for code, name in kospi_dict.items():
#     kospi_item = Kospi(kospi_name = name, kospi_code = code)
#     session.add(kospi_item)
# session.commit()
session.close()
print(members)

for member in members:
    access_token, access_token_expired = _getAccessToken(member)
    print(access_token, access_token_expired)
    price = _getStockPrice('000660', member, access_token) 
    print(price)
    # msg = _buyStock('000660', member, 1, access_token)
    # print(msg)
    # msg1 = _sellStock('000660', member, 1, access_token)
    # print(msg1)
    balance = _getStockBalance(member, access_token)
    for record in balance:
        print("종목 : " + record['prdt_name'])
        print("보유 수량 : " + record['hldg_qty'])
        print("현재가 : " + record['prpr'])
        print("평가금액 : " + record['evlu_amt'])
        print("평가손익금액 : " + record['evlu_pfls_amt'])
        print("평가손익률 : " + record['evlu_pfls_rt'])
        print("평가수익률 : " + record['evlu_erng_rt'])
    balance1 = _getCashBalance(member, access_token)
    print("예수금 : " + balance1)