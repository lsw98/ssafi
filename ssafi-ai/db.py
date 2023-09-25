from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

user = "ssafy"
pwd = "ssafy"
host = "localhost"
port = 3306
database_name = 'ssafi'
db_url = f'mysql+pymysql://{user}:{pwd}@{host}:{port}/{database_name}'

engine = create_engine(db_url)

# 세션 생성
Session = sessionmaker(bind=engine)