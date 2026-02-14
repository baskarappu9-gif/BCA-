# 🚀 PriceWatch - Quick Start Guide

Get PriceWatch up and running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be 18+
python --version  # Should be 3.10+
mongo --version  # Should be 6+
```

## One-Time Setup

### Step 1: Install Dependencies

```bash
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..

# ML Service
cd ml-service && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && cd ..
```

### Step 2: Setup Environment Files

**Frontend (.env):**
```bash
cd frontend
echo "VITE_API_URL=http://localhost:5000" > .env
cd ..
```

**Backend (.env):**
```bash
cd backend
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pricewatch
ML_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
EOF
mkdir -p uploads/images uploads/csv uploads/other
cd ..
```

**ML Service (.env):**
```bash
cd ml-service
cat > .env << EOF
PORT=8000
DEBUG=True
EOF
cd ..
```

### Step 3: Start MongoDB

```bash
# Option 1: System service
sudo systemctl start mongod

# Option 2: Docker
docker run -d -p 27017:27017 --name pricewatch-mongo mongo:latest
```

## Daily Development Workflow

Open 3 terminals and run:

### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:3000

### Terminal 2 - Backend
```bash
cd backend
npm run dev
```
✅ Backend API running on http://localhost:5000

### Terminal 3 - ML Service
```bash
cd ml-service
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows

python app.py
```
✅ ML Service running on http://localhost:8000

## Access Points

- 🌐 **Application**: http://localhost:3000
- 📡 **API**: http://localhost:5000
- 🤖 **ML Service**: http://localhost:8000
- 💚 **API Health**: http://localhost:5000/health
- 🔮 **ML Health**: http://localhost:8000/health

## Test the Application

1. Open http://localhost:3000
2. Click "AI Prediction" in the navigation
3. Fill in property details:
   - City: Bangalore
   - Area: Whitefield
   - Property Type: Apartment
   - Size: 1200 sq ft
   - Bedrooms: 3
   - Bathrooms: 2
   - Year Built: 2020
   - Age: 4
   - Select some amenities
4. Click "Predict Price"
5. View your prediction with 5-year forecast!

## Common Issues

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Python Virtual Environment Issues
```bash
cd ml-service
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Node Modules Issues
```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Explore the homepage
2. ✅ Try property predictions
3. 📊 Check out trending cities
4. 🔍 Browse latest properties
5. 📈 View market insights

## Production Build

```bash
# Build frontend
cd frontend && npm run build

# The build output will be in frontend/dist
# Deploy this folder to Vercel, Netlify, or any static host
```

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 🐛 Check the console for error messages
- 💬 Open an issue on GitHub

---

Happy Coding! 🎉
