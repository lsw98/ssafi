from trade_strategy import danger_rise, danger_fall, neutral_rise, neutral_fall, safe_rise, safe_fall
from urllib.parse import quote
from sqlalchemy import create_engine

user = "ssafy"
pwd = "ssafy"
host = "localhost"
port = 3306
database_name = 'ssafi'
db_url = f'mysql+pymysql://{user}:{quote(pwd)}@{host}:{port}:{database_name}'

engine = create_engine(db_url, echo=True)