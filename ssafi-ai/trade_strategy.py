import tensorflow as tf
from keras.models import load_model, Sequential
cnn_model = load_model('cnn_model.h5')
lstm_model = load_model('lstm_model.h5')

cnn_model.predict()