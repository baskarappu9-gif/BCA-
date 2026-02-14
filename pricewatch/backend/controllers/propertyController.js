import Property from '../models/Property.js';

// Get all properties with filters
export const getProperties = async (req, res) => {
  try {
    const {
      city,
      locality,
      propertyType,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      bedrooms,
      featured,
      limit = 20,
      page = 1
    } = req.query;

    // Build query
    const query = {};
    
    if (city) query['location.city'] = city;
    if (locality) query['location.locality'] = locality;
    if (propertyType) query.propertyType = propertyType;
    if (bedrooms) query.bedrooms = parseInt(bedrooms);
    if (featured === 'true') query.featured = true;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    if (minSize || maxSize) {
      query.size = {};
      if (minSize) query.size.$gte = parseFloat(minSize);
      if (maxSize) query.size.$lte = parseFloat(maxSize);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
};

// Get single property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.json({
      success: true,
      data: property
    });

  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
  }
};

// Create property
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    
    res.status(201).json({
      success: true,
      data: property
    });

  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
  }
};

// Compare properties
export const compareProperties = async (req, res) => {
  try {
    const { propertyIds } = req.body;
    
    if (!propertyIds || !Array.isArray(propertyIds) || propertyIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least 2 property IDs to compare'
      });
    }

    const properties = await Property.find({
      _id: { $in: propertyIds }
    });

    res.json({
      success: true,
      data: properties
    });

  } catch (error) {
    console.error('Compare properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error comparing properties',
      error: error.message
    });
  }
};

// Search properties
export const searchProperties = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    const properties = await Property.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'location.city': { $regex: q, $options: 'i' } },
        { 'location.locality': { $regex: q, $options: 'i' } }
      ]
    }).limit(20);

    res.json({
      success: true,
      data: properties
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching properties',
      error: error.message
    });
  }
};

// Get trending cities
export const getTrendingCities = async (req, res) => {
  try {
    // Mock trending cities data
    const trendingCities = [
      {
        name: 'Bangalore',
        imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400',
        growth: '+12%',
        avgPrice: 9500
      },
      {
        name: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400',
        growth: '+8%',
        avgPrice: 28000
      },
      {
        name: 'Hyderabad',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
        growth: '+15%',
        avgPrice: 7200
      },
      {
        name: 'Delhi NCR',
        imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
        growth: '+6%',
        avgPrice: 11000
      },
      {
        name: 'Pune',
        imageUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400',
        growth: '+10%',
        avgPrice: 8500
      },
      {
        name: 'Chennai',
        imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400',
        growth: '+7%',
        avgPrice: 7800
      }
    ];

    res.json({
      success: true,
      data: trendingCities
    });

  } catch (error) {
    console.error('Trending cities error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trending cities',
      error: error.message
    });
  }
};
