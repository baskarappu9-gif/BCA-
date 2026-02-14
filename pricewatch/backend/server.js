import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './config/database.js';
import predictRoutes from './routes/predict.js';
import propertyRoutes from './routes/properties.js';
import uploadRoutes from './routes/upload.js';

// Load environment variables
dotenv.config();

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Connect to database
connectDatabase();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', predictRoutes);
app.use('/api', propertyRoutes);
app.use('/api', uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'PriceWatch API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to PriceWatch API',
    version: '1.0.0',
    endpoints: {
      prediction: '/api/predict',
      properties: '/api/properties',
      trending: '/api/trending-cities',
      areaAnalysis: '/api/area-analysis',
      compare: '/api/compare',
      search: '/api/search',
      uploadCSV: '/api/upload/csv',
      uploadImages: '/api/upload/images'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   🏠 PriceWatch API Server                        ║
║                                                   ║
║   Server running on port ${PORT}                       ║
║   Environment: ${process.env.NODE_ENV || 'development'}                    ║
║   Database: MongoDB                               ║
║                                                   ║
║   📍 http://localhost:${PORT}                          ║
║   📊 Health: http://localhost:${PORT}/health           ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

export default app;
