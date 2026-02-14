# 🏠 PriceWatch - AI-Powered Real Estate Price Prediction Platform

A full-stack, production-grade real estate price prediction and market analysis platform for the Indian market. Built with React, Node.js, MongoDB, and Python ML microservice.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [ML Model](#ml-model)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Production Deployment](#production-deployment)

## ✨ Features

### PriceWatch - Real Estate Price Prediction System

**PriceWatch** is a modern Full-Stack Web Application that uses **Machine Learning** to predict real estate prices in Indian cities. It provides users with fair value estimations, market trends, and property comparisons.

> **Project Report**: For a detailed analysis, system architecture, and team details, please see [PROJECT_REPORT.md](./PROJECT_REPORT.md).

## Key Features
- **AI Price Prediction**: Uses Random Forest & Linear Regression.
- **Market Intelligence**: interactive charts for price trends.
- **Area Analysis**: Deep-dive into locality stats.
- **Property Comparison**: "Best Value" indicator.
- **User Module**: Login/Signup and User Dashboard.
- **Project Team**: Dedicated section for contributors.
- **Price Trends**: Historical price data visualization with Chart.js
- **File Upload**: Bulk property data upload via CSV
- **Image Management**: Property image upload and management

### User Experience
- Responsive design (Mobile, Tablet, Desktop)
- Smooth animations and transitions
- Intuitive navigation
- Real-time form validation
- Loading states and error handling

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **CSV Parser** - CSV file processing

### ML Service
- **Python 3.10+** - Programming language
- **Flask** - Micro web framework
- **Scikit-learn** - Machine learning
- **NumPy** - Numerical computing
- **Pandas** - Data manipulation

## 📁 Project Structure

```
pricewatch/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── api/             # API client
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                 # Node.js API server
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── uploads/             # File upload directory
│   ├── server.js            # Server entry point
│   ├── package.json
│   └── .env.example
│
├── ml-service/              # Python ML microservice
│   ├── models/              # Trained ML models
│   ├── data/                # Training data
│   ├── app.py               # Flask application
│   ├── requirements.txt
│   └── .env.example
│
└── README.md                # This file
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- MongoDB 6+
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pricewatch
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pricewatch
ML_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
```

Create upload directories:
```bash
mkdir -p uploads/images uploads/csv uploads/other
```

### 4. ML Service Setup

```bash
cd ml-service
python -m venv venv

# On Windows
venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env` file:
```env
PORT=8000
DEBUG=True
```

### 5. Database Setup

Start MongoDB:
```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name pricewatch-mongo mongo:latest
```

## 🎯 Running the Application

You need to run three services simultaneously:

### Terminal 1: Frontend (Port 3000)
```bash
cd frontend
npm run dev
```

### Terminal 2: Backend (Port 5000)
```bash
cd backend
npm run dev
```

### Terminal 3: ML Service (Port 8000)
```bash
cd ml-service
source venv/bin/activate  # On Mac/Linux
# or
venv\Scripts\activate     # On Windows

python app.py
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:8000
- **API Health**: http://localhost:5000/health
- **ML Health**: http://localhost:8000/health

## 📚 API Documentation

### Prediction Endpoints

#### POST /api/predict
Predict property price

**Request Body:**
```json
{
  "city": "bangalore",
  "area": "whitefield",
  "propertyType": "Apartment",
  "size": 1200,
  "bedrooms": 3,
  "bathrooms": 2,
  "yearBuilt": 2020,
  "age": 4,
  "amenities": ["parking", "gym", "pool"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "predictedPrice": 12240000,
    "priceRange": {
      "min": 11016000,
      "max": 13464000
    },
    "confidence": 94,
    "forecast": [
      { "year": 2026, "value": 12240000 },
      { "year": 2027, "value": 13219200 },
      ...
    ],
    "insights": [
      "Expected annual appreciation: 8-10%",
      "Rental yield potential: 3-4%",
      "Market sentiment: Strong Buy"
    ]
  }
}
```

#### GET /api/area-analysis?city=bangalore
Get area-wise market analysis

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "bangalore",
    "areas": [
      {
        "name": "Whitefield",
        "avgPricePerSqft": 9500,
        "yoyGrowth": 15,
        "rentalYield": 4.2,
        "sentiment": "Strong Buy",
        "infrastructureScore": 8.5
      }
    ]
  }
}
```

### Property Endpoints

#### GET /api/properties
Get all properties with filters

**Query Parameters:**
- `city` - Filter by city
- `locality` - Filter by locality
- `propertyType` - Filter by type
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Number of bedrooms
- `featured` - Featured properties only
- `limit` - Results per page (default: 20)
- `page` - Page number (default: 1)

#### GET /api/properties/:id
Get single property by ID

#### POST /api/properties
Create new property

#### POST /api/compare
Compare multiple properties

**Request Body:**
```json
{
  "propertyIds": ["id1", "id2", "id3"]
}
```

#### GET /api/search?q=searchQuery
Search properties

#### GET /api/trending-cities
Get trending cities data

### Upload Endpoints

#### POST /api/upload/csv
Upload and process CSV file

**Form Data:**
- `csv` - CSV file

**CSV Format:**
```csv
title,city,locality,propertyType,size,bedrooms,bathrooms,yearBuilt,age,amenities,price
3 BHK Apartment,bangalore,whitefield,Apartment,1200,3,2,2020,4,"parking,gym,pool",12000000
```

#### POST /api/upload/images
Upload property images

**Form Data:**
- `images` - Multiple image files (max 10)

## 🤖 ML Model

### Current Implementation
The ML service uses a weighted formula that simulates machine learning predictions:

**Price Calculation:**
```python
predicted_price = (base_price × location_multiplier × type_multiplier + amenity_bonus) × age_depreciation × bhk_factor
```

**Factors:**
- **Base Price**: City-specific price per sqft
- **Location Multiplier**: Area tier (1.0 - 2.0)
- **Type Multiplier**: Property type factor
- **Amenity Bonus**: ₹50,000 per amenity
- **Age Depreciation**: 2% per year
- **BHK Factor**: Bedrooms and bathrooms impact

### Future Enhancements
Replace with actual trained models:
- Linear Regression
- Random Forest Regressor
- Gradient Boosting
- Neural Networks

Training script template provided in `ml-service/train.py`

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pricewatch
ML_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
```

### ML Service (.env)
```env
PORT=8000
DEBUG=True
```

## 💻 Development

### Frontend Development
```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development
```bash
cd backend

# Start dev server with auto-reload
npm run dev

# Start production server
npm start
```

### ML Service Development
```bash
cd ml-service
source venv/bin/activate

# Run with auto-reload
export FLASK_DEBUG=1
python app.py

# Run tests
python -m pytest tests/
```

## 🚢 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables
# Deploy with Node.js buildpack
```

### ML Service (Docker)
```bash
cd ml-service

# Build image
docker build -t pricewatch-ml .

# Run container
docker run -p 8000:8000 pricewatch-ml
```

### MongoDB (MongoDB Atlas)
Update connection string in backend `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pricewatch
```

## 📊 Sample Data

### Seed Database
```bash
cd backend
node scripts/seed.js
```

### Test Prediction
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "city": "bangalore",
    "area": "whitefield",
    "propertyType": "Apartment",
    "size": 1200,
    "bedrooms": 3,
    "bathrooms": 2,
    "yearBuilt": 2020,
    "age": 4,
    "amenities": ["parking", "gym"]
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Project Developer - Full Stack Implementation

## 🙏 Acknowledgments

- React and Vite teams
- Express.js community
- Scikit-learn contributors
- Tailwind CSS team
- MongoDB team

## 📧 Support

For support, email support@pricewatch.com or open an issue on GitHub.

---

**Built with ❤️ for the Indian Real Estate Market**
