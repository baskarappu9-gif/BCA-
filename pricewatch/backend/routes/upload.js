import express from 'express';
import upload from '../middleware/upload.js';
import csvParser from 'csv-parser';
import fs from 'fs';
import Property from '../models/Property.js';

const router = express.Router();

// POST /api/upload/csv - Upload and process CSV file
router.post('/upload/csv', upload.single('csv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const results = [];
    const predictions = [];

    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Process each row and create predictions
          for (const row of results) {
            // Basic validation
            if (row.size && row.bedrooms && row.price) {
              const property = {
                title: row.title || `${row.bedrooms} BHK in ${row.locality}`,
                location: {
                  city: row.city || '',
                  locality: row.locality || ''
                },
                propertyType: row.propertyType || 'Apartment',
                size: parseFloat(row.size),
                bedrooms: parseInt(row.bedrooms),
                bathrooms: parseInt(row.bathrooms || row.bedrooms),
                yearBuilt: parseInt(row.yearBuilt || new Date().getFullYear() - 5),
                age: parseInt(row.age || 5),
                amenities: row.amenities ? row.amenities.split(',').map(a => a.trim()) : [],
                price: parseFloat(row.price)
              };

              predictions.push(property);
            }
          }

          // Clean up uploaded file
          fs.unlinkSync(req.file.path);

          res.json({
            success: true,
            data: {
              processedCount: predictions.length,
              totalRows: results.length,
              predictions: predictions.slice(0, 10) // Return first 10 for preview
            }
          });

        } catch (error) {
          console.error('CSV processing error:', error);
          res.status(500).json({
            success: false,
            message: 'Error processing CSV file',
            error: error.message
          });
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        res.status(500).json({
          success: false,
          message: 'Error parsing CSV file',
          error: error.message
        });
      });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

// POST /api/upload/images - Upload multiple property images
router.post('/upload/images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    const imageUrls = req.files.map(file => `/uploads/images/${file.filename}`);

    res.json({
      success: true,
      data: {
        count: imageUrls.length,
        images: imageUrls
      }
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading images',
      error: error.message
    });
  }
});

export default router;
