import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

def train_models():
    # Ensure directories exist
    os.makedirs('models', exist_ok=True)
    
    # Load Data
    if not os.path.exists('data/housing_data.csv'):
        print("Data file not found. Run generate_data.py first.")
        return

    df = pd.read_csv('data/housing_data.csv')
    
    # Features & Target
    X = df.drop('Price', axis=1)
    y = df['Price']
    
    # Preprocessing
    categorical_features = ['City', 'Area', 'PropertyType']
    numerical_features = ['Size', 'Bedrooms', 'Bathrooms', 'Age', 'AmenitiesCount']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train Random Forest
    print("Training Random Forest...")
    rf_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])
    rf_pipeline.fit(X_train, y_train)
    rf_score = rf_pipeline.score(X_test, y_test)
    print(f"Random Forest R2 Score: {rf_score:.4f}")
    
    # Train Linear Regression
    print("Training Linear Regression...")
    lr_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', LinearRegression())
    ])
    lr_pipeline.fit(X_train, y_train)
    lr_score = lr_pipeline.score(X_test, y_test)
    print(f"Linear Regression R2 Score: {lr_score:.4f}")
    
    # Save Models
    joblib.dump(rf_pipeline, 'models/random_forest_pipeline.pkl')
    joblib.dump(lr_pipeline, 'models/linear_regression_pipeline.pkl')
    print("Models saved to ml-service/models/")

if __name__ == "__main__":
    train_models()
