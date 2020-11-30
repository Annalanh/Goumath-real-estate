import joblib
import sys
import pickle

infile = open('./training-code/price-predict-model-file.pkl', 'rb')
regressor = pickle.load(infile)

props = [sys.argv[1],sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8], sys.argv[9],sys.argv[10],sys.argv[11],sys.argv[12]]
value = regressor.predict([props])

print((value*23000)/1000000000)