import joblib
import sys
import pickle

infile = open('./training-code/price-predict-model-file.pkl', 'rb')
regressor = pickle.load(infile)
# props = [50,2,2,10,7,8,10,10,10,10,10,10,10,10]

props = [int(sys.argv[1]),int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6]), int(sys.argv[7]), int(sys.argv[8]), int(sys.argv[9]), int(sys.argv[10]), int(sys.argv[11]), int(sys.argv[12]), int(sys.argv[13]), int(sys.argv[14])]
value = regressor.predict([props])

print(value)