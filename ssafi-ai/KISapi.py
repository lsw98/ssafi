import requests
from collections import namedtuple
import json

URL_BASE = 'https://openapivts.koreainvestment.com:29443'

_base_headers = {
    "Content-Type": "application/json"
}

def _getResultObject(json_data):
    _tc_ = namedtuple('res', json_data.keys())
    return _tc_(**json_data)

def _getAccessToken(member):
    access_url = f'{URL_BASE}/oauth2/tokenP'
    body = {
        'grant_type' : 'client_credentials',
        'appkey' : member.app_key,
        'appsecret' : member.secret_key
    }
    access_token = '1'
    access_token_expired = '2'
    # 한국투자증권 TOKEN 발급 요청
    res = requests.post(access_url, data = json.dumps(body), headers=_base_headers)
    if res.status_code == 200:
        access_token = _getResultObject(res.json()).access_token
        access_token_expired = _getResultObject(res.json()).access_token_token_expired
    else:
        print(f"Get Access Token Error: {res.status_code}")
    return access_token, access_token_expired

def _getHashKey(member, data):
    hash_url = f'{URL_BASE}/uapi/hashkey'
    headers = _base_headers
    headers['appKey'] = member.app_key
    headers['appSecret'] = member.secret_key
    res = requests.post(hash_url, headers = headers, data=json.dumps(data))
    if res.status_code == 200:
        hashkey = res.json()["HASH"]
        return hashkey
    else:
        print(f"Get Hash Key Error: {res.status_code}" + " | " + res.text)
        return 0

# 종목번호 받아 주가 반환
def _getStockPrice(code, member, access_token):
    stock_url = f'{URL_BASE}/uapi/domestic-stock/v1/quotations/inquire-price'
    headers = _base_headers
    headers['authorization'] = f"Bearer {access_token}"
    headers['appKey'] = member.app_key
    headers['appSecret'] = member.secret_key
    headers['tr_id'] = "FHKST01010100"
    params = {
        "fid_cond_mrkt_div_code" : "J",
        "fid_input_iscd" : code
    }
    res = requests.get(stock_url, headers=headers, params=params)
    if res.status_code == 200:
        price = res.json()['output']['stck_prpr']
        return price
    else:
        print(f"Get Stock Price Error: {res.status_code}" + " | " + res.text)
        return 0

def _buyStock(code, member, quantity, access_token):
    buy_url = f'{URL_BASE}/uapi/domestic-stock/v1/trading/order-cash'
    data = {
    "CANO": "50090046",
    "ACNT_PRDT_CD": "01",
    # 종목코드
    "PDNO": code,
    # 시장가 구매
    "ORD_DVSN": "01",
    # 주문량
    "ORD_QTY": f"{quantity}",
    "ORD_UNPR": "0",
    }
    headers = {
        "Content-Type":"application/json", 
        "authorization":f"Bearer {access_token}",
        "appKey": member.app_key,
        "appSecret": member.secret_key,
        "tr_id":"VTTC0802U",
        "custtype":"P",
        "hashkey" : _getHashKey(member, data)
    }
    res = requests.post(buy_url, headers=headers, data=json.dumps(data))
    if res.status_code == 200:
        msg = res.json()['msg1']
        return msg
    else:
        print(f"Buy Stock Error: {res.status_code}" + " | " + res.text)
        return 0

def _sellStock(code, member, quantity, access_token):
    sell_url = f'{URL_BASE}/uapi/domestic-stock/v1/trading/order-cash'
    data = {
    "CANO": "50090046",
    "ACNT_PRDT_CD": "01",
    # 종목코드
    "PDNO": code,
    # 시장가 구매
    "ORD_DVSN": "01",
    # 주문량
    "ORD_QTY": f"{quantity}",
    "ORD_UNPR": "0",
    }
    headers = {
        "Content-Type":"application/json", 
        "authorization":f"Bearer {access_token}",
        "appkey": member.app_key,
        "appsecret": member.secret_key,
        "tr_id":"VTTC0801U",
        "custtype":"P",
        "hashkey" : _getHashKey(member, data)
    }
    res = requests.post(sell_url, headers=headers, data=json.dumps(data))
    if res.status_code == 200:
        msg = res.json()['msg1']
        return msg
    else:
        print(f"Sell Stock Error: {res.status_code}" + " | " + res.text)
        return 0

# 현금잔고조회
def _getCashBalance(member, access_token):
    balance_url = f'{URL_BASE}/uapi/domestic-stock/v1/trading/inquire-psbl-order'
    params = {
        "CANO": "50090046",
        "ACNT_PRDT_CD": "01",
        "PDNO" : "000660",
        "ORD_UNPR" : "0",
        "ORD_DVSN" : "01",
        "CMA_EVLU_AMT_ICLD_YN" : "N",
        "OVRS_ICLD_YN" : "N" 
    }
    headers = {
        "Content-Type":"application/json", 
        "authorization":f"Bearer {access_token}",
        "appKey": member.app_key,
        "appSecret": member.secret_key,
        "tr_id":"VTTC8908R",
    }
    res = requests.get(balance_url, headers=headers, params=params)
    if res.status_code == 200:
        balance = res.json()['output']['ord_psbl_cash']
        return balance
    else:
        print(f"Stock Balance Error: {res.status_code}" + " | " + res.text)
        return 0

# 주식잔고조회
def _getStockBalance(member, access_token):
    balance_url = f'{URL_BASE}/uapi/domestic-stock/v1/trading/inquire-balance'
    headers = {
        'authorization':f'Bearer {access_token}',
        'appkey': member.app_key,
        'appsecret': member.secret_key,
        'tr_id' : 'VTTC8434R',
        'tr_cont' : ""
    }
    params = {
        "CANO": "50090046",
        "ACNT_PRDT_CD": "01",
        "AFHR_FLPR_YN" : "N",
        "OFL_YN" : "",
        "INQR_DVSN" : "02",
        "UNPR_DVSN" : "01",
        "FUND_STTL_ICLD_YN" : "N",
        "FNCG_AMT_AUTO_RDPT_YN" : "N",
        "PRCS_DVSN" : "00",
        "CTX_AREA_FK100" : "",
        "CTX_AREA_NK100" : "",
    }
    res = requests.get(balance_url, params=params, headers=headers)
    if res.status_code == 200:
        balance = res.json()['output1']
        return balance
    else:
        print(f"Stock Balance Error: {res.status_code}" + " | " + res.text)
        return 0
        