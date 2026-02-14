import mongoose from 'mongoose';

const historicalPriceSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Apartment', 'Villa', 'Penthouse', 'Studio', 'Independent House', 'Builder Floor']
  },
  avgPricePerSqft: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  volume: {
    type: Number,
    default: 0,
    comment: 'Number of transactions'
  },
  growthRate: {
    type: Number,
    comment: 'Percentage growth compared to previous period'
  },
  metadata: {
    minPrice: Number,
    maxPrice: Number,
    medianPrice: Number,
    avgSize: Number
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
historicalPriceSchema.index({ city: 1, locality: 1, date: -1 });
historicalPriceSchema.index({ propertyType: 1, date: -1 });

const HistoricalPrice = mongoose.model('HistoricalPrice', historicalPriceSchema);

export default HistoricalPrice;
