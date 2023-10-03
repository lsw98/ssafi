# DB 테이블
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Double, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# 뉴스 
class News(Base):
    __tablename__ = "news"
    
    news_id = Column(Integer, primary_key=True, autoincrement=True)
    news_category = Column(String(255), nullable=False)
    news_title = Column(String(255))
    news_midtitle = Column(String(255))
    news_date = Column(String(255))
    news_writer = Column(String(255))
    news_content = Column(Text)

# 코스피 종목 정보
class Kospi(Base):
    __tablename__ = "kospi"
    kospi_id = Column('id', Integer, primary_key=True, autoincrement=True)
    kospi_name = Column(String(255))
    kospi_code = Column(String(255))
    kospi_type = Column(String(255))

# 회원 정보
class Member(Base):
    __tablename__ = "member"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    exit = Column(Boolean)
    sns_type = Column(String(255))
    personal_agreement_yn = Column(String(255))
    app_key = Column(String(255))
    secret_key = Column(String(255))
    account_prefix = Column(String(255))
    account_suffix = Column(String(255))
    type = Column(String(255))

# 홀드 정보
class Hold(Base):
    __tablename__ = "hold"
    hold_id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('member', Integer, ForeignKey("member.id"))
    kospi_id = Column('kospi', Integer, ForeignKey("kospi.id"))
    
# 회원 별 AI 설정 정보
class Aitrade(Base):
    __tablename__ = "ai_trade"
    id = Column(Integer, ForeignKey("member.id"), primary_key=True)
    ai_budget = Column(Integer)
    ai_goal = Column(Integer)
    risk_ratio = Column(Double)
    neutral_ratio = Column(Double)
    safety_ratio = Column(Double)
    trading_start_yn = Column(Boolean)
    
# 거래 내역
class TradeRecord(Base):
    __tablename__ = "trade_record"
    id = Column(Integer, primary_key=True, autoincrement=True)
    trade_price = Column(Integer)
    trade_date = Column(DateTime)
    trade_quantity = Column(Integer)
    user_id = Column(Integer, ForeignKey("member.id"))
    kospi_id = Column(Integer, ForeignKey("kospi.id"))
    
# 일자별 지수 정보
class StockIndex(Base):
    __tablename__ = "stock_index"
    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String(255))
    number = Column(Double)
    date = Column(Date)