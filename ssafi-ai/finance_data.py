import FinanceDataReader as fdr
import pandas as pd
import mplfinance as mpf

kospi_200 = pd.read_csv('kospi200.csv', encoding='EUC-KR')
kospi = pd.DataFrame(kospi_200)
kospi_dict = {}

# 코스피 200 종목코드, 종목명 딕셔너리 생성
for index, row in kospi.iterrows():
    code = str(row['종목코드'])
    length = len(code)
    if length < 6:
         for _ in range (6-length):
             code = '0' + code
    kospi_dict[code] = row['종목명']
print(kospi_dict)
    