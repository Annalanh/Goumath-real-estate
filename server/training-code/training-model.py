import numpy as np 
import pandas as pd

dataset = pd.read_csv('db1.csv')

used_fields = ['area', 'num_bed', 'num_bath', 'bank', 'cafe', 'college', 'hospital', 'marketplace', 'parking', 'school', 'university', 'newprice', 'point']
decision_fields = ['area', 'num_bed', 'num_bath', 'bank', 'cafe', 'college', 'hospital', 'marketplace', 'parking', 'school', 'university', 'point']

a = dataset[used_fields]
b = a.dropna()
y = b.newprice
X = b[decision_fields]

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20)

from sklearn.tree import DecisionTreeRegressor
regressor = DecisionTreeRegressor()
regressor.fit(X_train, y_train)

import joblib
import pickle

price_predict_model_file = "price-predict-model-file.pkl"
pickle.dump(regressor, open(price_predict_model_file, 'wb'), protocol=2)

