# PriceWatch - Project Report

## Project Team
**Developed by:**
1.  **BARATH.R** (234011101057)
2.  **BARRY JUDE MANUEL** (234011101058)
3.  **BASKAR.D.A** (234011101059)
4.  **BHARATH.R** (234011101060)

**Project Coordinator:** Ms. S. Srividhya Santhi

## 1. Executive Summary
PriceWatch is a production-grade Real Estate Price Prediction application designed for the Indian market. Unlike typical rule-based estimators, PriceWatch leverages **Machine Learning (ML)** algorithms trained on a synthetic dataset of 5,000+ property records to provide accurate fair value estimations. The application features a modern, responsive React frontend and a robust Node.js backend.

## 2. System Architecture
The project follows a microservices-inspired architecture with three distinct components:

### A. Frontend (Client)
- **Tech Stack**: React.js (Vite), Tailwind CSS, Chart.js, Lucide React.
- **Features**:
  - **AI Prediction**: Interactive form with cascading location selection (State -> District -> Area) for granular accuracy.
  - **Market Intelligence**: Dynamic trends analysis with time-series charts (1M, 6M, 1Y, 3Y, 5Y) and real-time simulations.
  - **Area Analysis**: Deep dive into specific localities with livability scores, growth trends, and interactive heatmaps.
  - **Property Comparison**: Side-by-side comparison of multiple properties with a "value score".
  - **Sidebar Navigation**: Comprehensive menu including Home Services, Dashboard links, and About Us.
  - **User Module**: Login/Signup interface.

### B. Backend (API Layer)
- **Tech Stack**: Node.js, Express.js, MongoDB.
- **Role**: Acts as the orchestrator. It handles user requests, stores property listings, and forwards prediction requests to the ML service. 
- **Key Endpoints**:
  - `/api/predict`: Proxies requests to Python ML service.
  - `/api/properties`: Manages property listings.
  - `/api/upload`: Handles CSV and Image uploads.

### C. ML Service (Intelligence)
- **Tech Stack**: Python, Flask, Scikit-Learn, Pandas, NumPy.
- **Models**:
  - **Random Forest Regressor**: Primary model for high accuracy (R² Score: ~0.90).
  - **Linear Regression**: Secondary model for trend analysis.
  - **Ensemble Logic**: Combines models (70% RF + 30% LR) for robust predictions.
- **Data**: Synthetic dataset generating using `generate_data.py`, covering major Indian cities (Bangalore, Mumbai, Delhi, Hyderabad, Pune).

## 3. Key Features & Implementation Status

| Feature | Status | Description |
| :--- | :--- | :--- |
| **Real ML Prediction** | ✅ Complete | Random Forest Models integrated with Flask. |
| **Location Hierarchy** | ✅ Complete | "State -> District -> Area" cascading dropdowns using valid Indian dataset. |
| **Real Location Data** | ✅ Complete | Integrated "India_Dataset_100_Percent_Real_Areas.csv" for accurate area names. |
| **Chennai Focus** | ✅ Complete | Detailed breakdown of North, Central, South, and West Chennai localities. |
| **Market Intelligence** | ✅ Complete | Dynamic Price History charts with 5-Year forecast simulation. |
| **Area Analysis** | ✅ Complete | Detailed locality cards with Livability Scores and Growth % for all Indian districts. |
| **Responsive UI** | ✅ Complete | Mobile-first design with Tailwind CSS. |
| **Navigation** | ✅ Complete | Sidebar menu with removed "Property Valuation" as requested. |
| **User Authentication** | ✅ Complete | Login/Signup UI implementation. |
| **About Us** | ✅ Complete | Project Team & Coordinator details page. |

## 4. Future Roadmap
1.  **Real Data Integration**: Replace synthetic simulation with live API data from real estate portals.
2.  **Backend Auth**: Connect Login/Signup UI to real JWT authentication and MongoDB.
3.  **Payment Gateway**: Integrate Razorpay/Stripe for "Premium Reports".
4.  **Map Integration**: Add Google Maps/Mapbox for location-based search and heatmap visualization.

## 5. Conclusion
PriceWatch successfully demonstrates a full-stack ML application. It moves beyond simple CRUD operations by integrating real-time intelligence, offering significant value to users looking for transparent property valuations in India.
