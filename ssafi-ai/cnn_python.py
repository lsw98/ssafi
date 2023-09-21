import tensorflow as tf
import os
import cv2
import pandas as pd
import numpy as np
import FinanceDataReader as fdr
import matplotlib.pyplot as plt
from mplfinance.original_flavor import candlestick2_ohlc
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from modules.kospi_dict import kospi_dict

# 이미지 데이터와 라벨을 저장할 리스트 초기화
data = []
labels = []

def make_dataset(dir_path, label):
    image_files = [f for f in os.listdir(dir_path) if f.endswith('.png')]
    
    # 이미지 파일 반복 처리
    for image_file in image_files:
        # 이미지 파일 경로 생성
        image_path = os.path.join(dir_path, image_file)
        
        # 이미지 읽기 (OpenCV 사용)
        image = cv2.imread(image_path)
        
        # 이미지 크기 조정 (필요한 경우)
        # image = cv2.resize(image, (width, height))
        
        # 이미지 데이터와 라벨 추가
        data.append(image)
        labels.append(label)  # 클래스 라벨을 적절하게 설정해야 합니다.


data_dir_0 = "C:/ssafy/candle/0/"
data_dir_1 = "C:/ssafy/candle/1/"

make_dataset(data_dir_0, 0)
make_dataset(data_dir_1, 1)

# 데이터와 라벨을 NumPy 배열로 변환
data = np.array(data)
labels = np.array(labels)

print(data.shape)
print(labels.shape)

# 데이터 분할
X_train, X_temp, y_train, y_temp = train_test_split(data, labels, test_size=0.4, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

# 데이터 스케일링
X_train = X_train.astype('float32') / 255
X_val = X_val.astype('float32') / 255
X_test = X_test.astype('float32') / 255

# 클래스 수 계산
num_classes = len(np.unique(labels))

# CNN 모델 정의
cnn_model = Sequential()
cnn_model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 3)))
cnn_model.add(MaxPooling2D((2, 2)))
cnn_model.add(Flatten())
cnn_model.add(Dense(1, activation='sigmoid'))

# 모델 컴파일
cnn_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 모델 학습
epochs = 3
batch_size = 64

history = cnn_model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, 
                    validation_data=(X_val, y_val))

# 모델 저장
cnn_model.save('cnn_model.h5')

# kospi_200 = pd.read_csv('kospi200.csv', encoding='EUC-KR')
# kospi = pd.DataFrame(kospi_200)
# kospi_dict = {}

# import FinanceDataReader as fdr
# import matplotlib.pyplot as plt
# from mplfinance.original_flavor import candlestick2_ohlc

# # 최근 날짜의 주가 상승/하락 리스트
# recent = []

# for code in kospi_dict.keys():
#     df = fdr.DataReader(code, '2023-08-01', '2023-09-19')
    
#     # 실제 결과가 상승이면 1, 하락이면 0
#     data = df.iloc[df.shape[0] - 11: df.shape[0] - 1]
#     if df.iloc[df.shape[0] - 2]['Close'] > df.iloc[df.shape[0] - 1]['Close']:
#         recent.append(0)
#     else:
#         recent.append(1)
        
#     fig = plt.figure(figsize=(1,1))
#     ax = fig.add_subplot(1, 1, 1)
#     candlestick2_ohlc(ax, data['Open'], data['High'],
#                         data['Low'], data['Close'], width=0.7, colorup='r', colordown='b')
#     ax.grid(False)
#     ax.set_xticklabels([])
#     ax.set_yticklabels([])
#     ax.xaxis.set_visible(False)
#     ax.yaxis.set_visible(False)
#     ax.axis('off')
#     plt.tight_layout()
#     # 최근 10일의 캔들차트 저장
#     plt.savefig('C:/ssafy/candle/recent/{}.png'.format(code), dpi=fig.dpi)
#     plt.close()

# # 최근 10일 캔들차트 가져와 테스트
# recent_data_dir = "C:/ssafy/candle/recent/"
# test_data = []
# image_files = [f for f in os.listdir(recent_data_dir) if f.endswith('.png')]
    
# # 이미지 파일 반복 처리
# for image_file in image_files:
#     # 이미지 파일 경로 생성
#     image_path = os.path.join(recent_data_dir, image_file)
        
#     # 이미지 읽기 (OpenCV 사용)
#     image = cv2.imread(image_path)
        
#     # 이미지 데이터추가
#     test_data.append(image)

# test_data = np.array(test_data)
# print(test_data.shape)
# test_data = test_data.astype('float32') / 255
# prediction = cnn_model.predict(test_data)

# acc = 0
# for i in range (200):
#     pre_value = 1
#     if prediction[i][0] < 0.5:
#         pre_value = 0
#     if recent[i] == pre_value:
#         acc += 1
#     print(prediction[i][0])
# print("정확도 : " + str(acc/200))


