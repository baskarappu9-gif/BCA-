import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    locality: {
      type: String,
      required: true
    },
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Apartment', 'Villa', 'Penthouse', 'Studio', 'Independent House', 'Builder Floor']
  },
  size: {
    type: Number,
    required: true,
    min: 100
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  yearBuilt: {
    type: Number,
    required: true,
    min: 1900
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  price: {
    type: Number,
    required: true
  },
  pricePerSqft: {
    type: Number
  },
  images: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Pending'],
    default: 'Available'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate price per sqft before saving
propertySchema.pre('save', function(next) {
  if (this.price && this.size) {
    this.pricePerSqft = Math.round(this.price / this.size);
  }
  next();
});

// Indexes for better query performance
propertySchema.index({ 'location.city': 1, 'location.locality': 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ featured: 1 });

const Property = mongoose.model('Property', propertySchema);

export default Property;
