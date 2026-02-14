import express from 'express';
import { predictPrice, getAreaAnalysis } from '../controllers/predictionController.js';

const router = express.Router();

// POST /api/predict - Predict property price
router.post('/predict', predictPrice);

// GET /api/area-analysis - Get area analysis
router.get('/area-analysis', getAreaAnalysis);

export default router;
