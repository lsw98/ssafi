from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# 테이블 자동 생성
import models
from database import engine
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# pip install "fastapi[all]"
# pip install sqlalchemy

# CORS frontend url
origins = [
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hello():
    return {"message" : "lsw"}