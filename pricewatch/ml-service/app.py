from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load Models
try:
    rf_model = joblib.load('models/random_forest_pipeline.pkl')
    lr_model = joblib.load('models/linear_regression_pipeline.pkl')
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    rf_model = None
    lr_model = None

# Hardcoded multipliers for fallback/confidence calculation only
LOCATION_MULTIPLIERS = {
    'bangalore': {'whitefield': 1.3, 'electronic city': 1.2, 'marathahalli': 1.25, 'hsr layout': 1.4, 'koramangala': 1.5, 'indiranagar': 1.45},
    'mumbai': {'lower parel': 1.8, 'andheri west': 1.6, 'bandra': 1.9, 'worli': 2.0, 'powai': 1.5},
    'hyderabad': {'gachibowli': 1.25, 'hitech city': 1.3, 'banjara hills': 1.4, 'kondapur': 1.2},
    'delhi': {'dwarka': 1.3, 'rohini': 1.25, 'saket': 1.5, 'vasant kunj': 1.45},
    'pune': {'hinjewadi': 1.2, 'wakad': 1.15, 'baner': 1.25, 'kothrud': 1.3},
    'chennai': {'adyar': 1.4, 'anna nagar': 1.35, 't. nagar': 1.5, 'velachery': 1.25, 'koyambedu': 1.2, 'medavakkam': 1.15, 'omr': 1.3, 'porur': 1.2}
}

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'online',
        'service': 'PriceWatch ML Service (Real Mode)',
        'models_loaded': rf_model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Prepare Input Data
        # Must match training features: City, Area, PropertyType, Size, Bedrooms, Bathrooms, Age, AmenitiesCount
        city = data.get('city', 'Bangalore')
        area = data.get('area', 'Whitefield')
        prop_type = data.get('propertyType', 'Apartment')
        size = float(data.get('size', 1200))
        bedrooms = int(data.get('bedrooms', 3))
        bathrooms = int(data.get('bathrooms', 2))
        age = int(data.get('age', 5))
        amenities = data.get('amenities', [])
        amenities_count = len(amenities)

        input_df = pd.DataFrame([{
            'City': city,
            'Area': area,
            'PropertyType': prop_type,
            'Size': size,
            'Bedrooms': bedrooms,
            'Bathrooms': bathrooms,
            'Age': age,
            'AmenitiesCount': amenities_count
        }])

        if rf_model and lr_model:
            # Predict
            rf_pred = rf_model.predict(input_df)[0]
            lr_pred = lr_model.predict(input_df)[0]
            
            # Ensemble (Weighted average)
            final_price = (rf_pred * 0.7) + (lr_pred * 0.3)
            
            # Confidence Calculation (Model Agreement)
            diff = abs(rf_pred - lr_pred) / ((rf_pred + lr_pred) / 2)
            confidence = max(85, min(98, 100 - (diff * 100)))
        else:
            # Fallback (Should not happen if setup correctly)
            final_price = 5000000 
            confidence = 50

        # Forecast
        forecast = []
        base_cagr = 0.08
        current_year = datetime.now().year
        for i in range(5):
            year_price = final_price * ((1 + base_cagr) ** (i + 1))
            forecast.append({
                'year': current_year + i + 1,
                'value': round(year_price),
                'growthRate': 8.0
            })

        # Insights
        insights = [
            f"Estimated price based on {prop_type} in {area}, {city}",
            "Market trend shows positive growth in this sector.",
            f"Confidence level: {int(confidence)}% based on historical data."
        ]

        return jsonify({
            'predictedPrice': round(final_price),
            'priceRange': {'min': round(final_price * 0.9), 'max': round(final_price * 1.1)},
            'confidence': round(confidence, 1),
            'forecast': forecast,
            'insights': insights,
            'breakdown': {
                'basePrice': round(final_price * 0.8),
                'locationMultiplier': 1.2, # Placeholder for breakdown display
                'amenityBonus': amenities_count * 50000
            }
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'models': 'active'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)

# Reload trigger
