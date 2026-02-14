import React from 'react';
import { MapPin, Maximize2, Star, ArrowRight } from 'lucide-react';
import { formatPrice, formatArea } from '../utils/formatters';

const PropertyCard = ({ property, onSelect }) => {
  const {
    id,
    title,
    location,
    price,
    size,
    images = [],
    featured = false,
    bedrooms,
    bathrooms
  } = property;

  const imageUrl = images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400';

  return (
    <div className="card cursor-pointer group">
      <div className="relative mb-4">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover rounded-xl transition-transform group-hover:scale-105"
        />
        
        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {bedrooms && (
            <span>{bedrooms} BHK</span>
          )}
          {size && (
            <div className="flex items-center gap-1">
              <Maximize2 className="w-4 h-4" />
              {formatArea(size)}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">
            {formatPrice(price)}
          </div>
          
          <button 
            onClick={() => onSelect && onSelect(id)}
            className="p-2 bg-primary-50 text-primary-500 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
