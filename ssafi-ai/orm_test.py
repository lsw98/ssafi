# DB 테스트
from models import Base, News, Member, Kospi, Hold, Aitrade, TradeRecord, StockIndex
from db import Session, engine

Base.metadata.create_all(engine)

session = Session()

# News

# Member

# Kospi

# Hold

# Aitrade

# TradeRecord

# StockIndex

session.close()