import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// Predict property price
export const predictPrice = async (req, res) => {
  try {
    const {
      city,
      area,
      propertyType,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      age,
      amenities
    } = req.body;

    // Validate required fields
    if (!area || !propertyType || !size || !bedrooms || !bathrooms || !yearBuilt || age === undefined || age === null) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    try {
      // Try to call Python ML service
      const response = await axios.post(`${ML_SERVICE_URL}/predict`, {
        city,
        area,
        propertyType,
        size: parseFloat(size),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        yearBuilt: parseInt(yearBuilt),
        age: parseInt(age),
        amenities: amenities || []
      }, {
        timeout: 10000
      });

      return res.json({
        success: true,
        data: response.data
      });

    } catch (mlError) {
      console.log('ML service unavailable, using fallback calculation');

      // Fallback to simple calculation if ML service is down
      const prediction = calculatePriceFallback(req.body);

      return res.json({
        success: true,
        data: prediction,
        note: 'Using fallback calculation'
      });
    }

  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Error predicting price',
      error: error.message
    });
  }
};

// Fallback price calculation
const calculatePriceFallback = (data) => {
  const { size, age, amenities = [] } = data;

  // Base price calculation
  const basePrice = parseFloat(size) * 8500;

  // Location multiplier (can be enhanced with actual data)
  const locationMultiplier = 1.2;

  // Amenity bonus
  const amenityBonus = amenities.length * 50000;

  // Age depreciation (2% per year)
  const ageDepreciation = (parseInt(age) || 0) * 0.02;

  // Calculate predicted price
  const predictedPrice = (basePrice * locationMultiplier + amenityBonus) * (1 - ageDepreciation);

  // Generate 5-year forecast with 8% annual appreciation
  const forecast = [];
  for (let i = 0; i < 5; i++) {
    forecast.push({
      year: 2026 + i,
      value: Math.round(predictedPrice * Math.pow(1.08, i))
    });
  }

  return {
    predictedPrice: Math.round(predictedPrice),
    priceRange: {
      min: Math.round(predictedPrice * 0.9),
      max: Math.round(predictedPrice * 1.1)
    },
    confidence: 94,
    forecast,
    insights: [
      'Expected annual appreciation: 8-10%',
      'Rental yield potential: 3-4%',
      'Market sentiment: Strong Buy'
    ]
  };
};

// Get area analysis
export const getAreaAnalysis = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City parameter is required'
      });
    }

    // Mock data for area analysis
    const areas = {
      bangalore: [
        {
          name: 'Whitefield',
          avgPricePerSqft: 9500,
          yoyGrowth: 15,
          rentalYield: 4.2,
          sentiment: 'Strong Buy',
          infrastructureScore: 8.5
        },
        {
          name: 'Electronic City',
          avgPricePerSqft: 7500,
          yoyGrowth: 18,
          rentalYield: 4.5,
          sentiment: 'Strong Buy',
          infrastructureScore: 7.8
        }
      ],
      mumbai: [
        {
          name: 'Lower Parel',
          avgPricePerSqft: 35000,
          yoyGrowth: 12,
          rentalYield: 3.2,
          sentiment: 'Buy',
          infrastructureScore: 9.0
        }
      ]
    };

    res.json({
      success: true,
      data: {
        city,
        areas: areas[city.toLowerCase()] || []
      }
    });

  } catch (error) {
    console.error('Area analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching area analysis',
      error: error.message
    });
  }
};
