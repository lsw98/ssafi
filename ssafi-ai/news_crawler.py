# 매일경제 기사 크롤링 하여 DB에 저장
from ranking_crawler import ranking_news_crawler
from category_crawler import news_category_crawler
from models import Base, News
from db import engine, Session
news_list = []
# 랭킹뉴스
ranking_news_crawler('https://www.mk.co.kr/news/ranking/stock/', news_list)
# 증권정책
news_category_crawler('https://www.mk.co.kr/news/stock/stock-policy/', "stock_policy", news_list)
# 시황
news_category_crawler('https://www.mk.co.kr/news/stock/conditions/', "conditions", news_list)
# 공시
news_category_crawler('https://www.mk.co.kr/news/stock/public-announcement/', "public_announcement", news_list)
# 기업정보
news_category_crawler('https://www.mk.co.kr/news/stock/business-information/', "business_information", news_list)
# 증시지표
news_category_crawler('https://www.mk.co.kr/news/stock/market-index/', "market_index", news_list)

Base.metadata.create_all(engine)

session = Session()

for news in news_list:
    session.add(news)

session.commit()
session.close()
