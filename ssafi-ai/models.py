# DB 테이블
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Double
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class News(Base):
    __tablename__ = "news"
    
    news_id = Column(Integer, primary_key=True, autoincrement=True)
    news_category = Column(String(255), nullable=False)
    news_title = Column(String(255))
    news_midtitle = Column(String(255))
    news_date = Column(String(255))
    news_writer = Column(String(255))
    news_content = Column(Text)

class Kospi(Base):
    __tablename__ = "kospi"
    kospi_id = Column(Integer, primary_key=True, autoincrement=True)
    kospi_name = Column(String(255))
    kospi_code = Column(String(255))
    kospi_type = Column(String(255))

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
    type = Column(String(255))

class Hold(Base):
    __tablename__ = "hold"
    hold_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("member.id"))
    kospi_id = Column(Integer, ForeignKey("kospi.kospi_id"))
    

class Aitrade(Base):
    __tablename__ = "ai_trade"
    id = Column(Integer, ForeignKey("member.id"), primary_key=True)
    ai_budget = Column(Integer)
    ai_goal = Column(Integer)
    risk_ratio = Column(Double)
    neutral_ratio = Column(Double)
    safety_ratio = Column(Double)
    trading_start_yn = Column(Boolean)