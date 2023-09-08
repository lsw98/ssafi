from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey

from database import Base

class News(Base):
    __tablename__ = "news"
    
    news_id = Column(Integer, primary_key=True, autoincrement=True)
    news_category = Column(String, nullable=False)
    news_title = Column(String, nullable=True)
    news_date = Column(DateTime, nullable=True)
    news_writer = Column(String, nullable=True)
    news_content = Column(Text, nullable=True)
    news_image = Column(String, nullable=True)