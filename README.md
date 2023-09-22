## SSAFI

빠른주문 api 테스트하려면
ssafi-fe내부에 .env파일 생성해서 아래내용 입력 후 테스트 해야함

REACT_APP_CANO_REAL = '실제 계좌'
REACT_APP_PROD = 'https://openapi.koreainvestment.com:9443'
REACT_APP_PROD_TOKEN = ''
REACT_APP_PROD_APPKEY = ''
REACT_APP_PROD_APPSECRET = ''

REACT_APP_CANO = '모의 계좌'
REACT_APP_VTS = 'https://openapi.koreainvestment.com:29443'
REACT_APP_VTS_TOKEN = ''
REACT_APP_VTS_APPKEY = ''
REACT_APP_VTS_APPSECRET = ''
REACT_APP_VTS_HASH = ''

- 프록시 때매
  setupProxy.js 파일에서
  타겟주소 -> https://openapi.koreainvestment.com:9443(실제주문)
  https://openapi.koreainvestment.com:29443(모의주문)
  변경해가면서 요청해야됨...ㅋ
