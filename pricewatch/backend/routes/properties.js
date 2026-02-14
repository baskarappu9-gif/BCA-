import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  compareProperties,
  searchProperties,
  getTrendingCities
} from '../controllers/propertyController.js';

const router = express.Router();

// GET /api/properties - Get all properties with filters
router.get('/properties', getProperties);

// GET /api/properties/:id - Get single property
router.get('/properties/:id', getPropertyById);

// POST /api/properties - Create property
router.post('/properties', createProperty);

// POST /api/compare - Compare properties
router.post('/compare', compareProperties);

// GET /api/search - Search properties
router.get('/search', searchProperties);

// GET /api/trending-cities - Get trending cities
router.get('/trending-cities', getTrendingCities);

export default router;
