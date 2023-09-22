from models import Base, Member, Kospi
from db import engine, Session
from modules.kospi_dict import kospi_dict

Base.metadata.create_all(engine)

session = Session()
# new_member = Member(email="lsw@gmail.com", password="1234", role="member")
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
    app_key = member.app_key
    secret_key = member.secret_key
    
    # 한국투자증권 TOKEN 발급
    
    # 