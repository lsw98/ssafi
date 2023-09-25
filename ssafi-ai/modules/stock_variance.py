import FinanceDataReader as fdr
from modules.kospi_dict import kospi_dict
var_dict = {}

for code in kospi_dict.keys():
    df = fdr.DataReader(code, '2023-01-01', '2023-09-18')
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    
    # 평균
    average = df['Close'].sum() / len(df)
    
    # 분산
    variation = 0
    
    # 분산 (변동률) 계산
    for index, row in df.iterrows():
        variation += (((row['Close']) - average) / average) ** 2
    
    var_dict[code] = variation
    # mpf.plot(df, type='candle', style='charles', title=code, ylabel='Price', volume=True)

print(type(var_dict))
var_dic = sorted(var_dict.items(), key = lambda x : x[1], reverse = True)

for item in var_dic:
    print(item[0] + " " + kospi_dict[item[0]] + " " + str(item[1]))

# 1~66 위험, 67~133 중립, 134~200 안전
danger = var_dic[:66]
neutral = var_dic[66:133]
safe = var_dic[133:]

# print(len(danger))
# print(danger)

# print(len(neutral))
# print(neutral)

# print(len(safe))
# print(safe)