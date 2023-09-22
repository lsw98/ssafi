from models import Base, Member
from db import engine, Session

Base.metadata.create_all(engine)

session = Session()
# new_member = Member(email="lsw@gmail.com", password="1234", role="member")
# session.add(new_member)
# session.commit()
members = session.query(Member).all()
session.close()
print(members)
for member in members:
    app_key = member.app_key
    secret_key = member.secret_key
    
    # 한국투자증권 TOKEN 발급
    
    # 