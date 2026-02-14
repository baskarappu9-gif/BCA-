import pandas as pd
import numpy as np
import random

# Configuration
CITIES = ['Bangalore', 'Mumbai', 'Hyderabad', 'Delhi', 'Pune', 'Chennai']
AREAS = {
    'Bangalore': ['Whitefield', 'Electronic City', 'Marathahalli', 'HSR Layout', 'Koramangala', 'Indiranagar', 'Yelahanka'],
    'Mumbai': ['Lower Parel', 'Andheri West', 'Bandra', 'Worli', 'Powai', 'Goregaon', 'Juhu'],
    'Hyderabad': ['Gachibowli', 'Hitech City', 'Banjara Hills', 'Kondapur', 'Jubilee Hills', 'Madhapur'],
    'Delhi': ['Dwarka', 'Rohini', 'Saket', 'Vasant Kunj', 'Lajpat Nagar', 'Greater Kailash'],
    'Pune': ['Hinjewadi', 'Wakad', 'Baner', 'Kothrud', 'Viman Nagar', 'Magarpatta'],
    'Chennai': ['Adyar', 'Anna Nagar', 'T. Nagar', 'Velachery', 'Koyambedu', 'Medavakkam', 'OMR', 'Porur']
}

BASE_PRICES = {
    'Bangalore': 8500, 'Mumbai': 22000, 'Hyderabad': 7000, 
    'Delhi': 11000, 'Pune': 7500, 'Chennai': 7800
}

PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Studio', 'Independent House', 'Builder Floor']
AMENITIES_LIST = ['Parking', 'Gym', 'Swimming Pool', 'Clubhouse', 'Security', 'Power Backup', 'Garden', 'Lift']

def generate_dataset(num_samples=5000):
    data = []
    
    for _ in range(num_samples):
        city = random.choice(CITIES)
        area = random.choice(AREAS[city])
        prop_type = random.choice(PROPERTY_TYPES)
        
        # Realistic size constraints
        if prop_type == 'Studio':
            size = np.random.randint(400, 800)
        elif prop_type == 'Apartment':
            size = np.random.randint(800, 2500)
        elif prop_type == 'Villa':
            size = np.random.randint(2000, 5000)
        else:
            size = np.random.randint(1000, 3000)
            
        bedrooms = random.choices([1, 2, 3, 4, 5], weights=[0.1, 0.3, 0.4, 0.15, 0.05])[0]
        if prop_type == 'Studio': bedrooms = 1
        
        bathrooms = max(1, bedrooms - random.randint(0, 1))
        year_built = np.random.randint(2010, 2024)
        age = 2024 - year_built
        
        num_amenities = np.random.randint(0, len(AMENITIES_LIST) + 1)
        amenities_score = num_amenities * 50000
        
        # Calculate Base Price (Rule-based to start, but with noise)
        base_price_sqft = BASE_PRICES[city]
        
        # Location Factors (simplified simulation)
        loc_factor = 1.0 + (AREAS[city].index(area) * 0.05) # Just arbitrary variance
        if city == 'Mumbai': loc_factor += 0.5
        
        # Type Factor
        type_factor = 1.0
        if prop_type == 'Villa': type_factor = 1.4
        if prop_type == 'Studio': type_factor = 0.9
        
        # Price Calculation with Logic + Random Noise
        market_value = (size * base_price_sqft * loc_factor * type_factor) + amenities_score
        market_value = market_value * (1 - (age * 0.01)) # Age depreciation
        
        # Add random market fluctuation/noise (±10%)
        noise = np.random.uniform(0.9, 1.1)
        final_price = int(market_value * noise)
        
        data.append({
            'City': city,
            'Area': area,
            'PropertyType': prop_type,
            'Size': size,
            'Bedrooms': bedrooms,
            'Bathrooms': bathrooms,
            'YearBuilt': year_built,
            'Age': age,
            'AmenitiesCount': num_amenities,
            'Price': final_price
        })
        
    df = pd.DataFrame(data)
    df.to_csv('data/housing_data.csv', index=False)
    print(f"Generated {num_samples} records in data/housing_data.csv")

if __name__ == "__main__":
    generate_dataset()
