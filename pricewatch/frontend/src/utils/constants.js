// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  PREDICT: '/api/predict',
  PROPERTIES: '/api/properties',
  TRENDING_CITIES: '/api/trending-cities',
  AREA_ANALYSIS: '/api/area-analysis',
  PRICE_TRENDS: '/api/trends',
  COMPARE: '/api/compare',
  UPLOAD_CSV: '/api/upload/csv',
  UPLOAD_IMAGES: '/api/upload/images',
  SEARCH: '/api/search'
};

// Property types
export const PROPERTY_TYPES = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Penthouse', label: 'Penthouse' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Independent House', label: 'Independent House' },
  { value: 'Builder Floor', label: 'Builder Floor' }
];

// Major cities in India
export const MAJOR_CITIES = [
  { value: 'bangalore', label: 'Bangalore', state: 'Karnataka' },
  { value: 'mumbai', label: 'Mumbai', state: 'Maharashtra' },
  { value: 'delhi', label: 'Delhi NCR', state: 'Delhi' },
  { value: 'hyderabad', label: 'Hyderabad', state: 'Telangana' },
  { value: 'pune', label: 'Pune', state: 'Maharashtra' },
  { value: 'chennai', label: 'Chennai', state: 'Tamil Nadu' },
  { value: 'kolkata', label: 'Kolkata', state: 'West Bengal' },
  { value: 'ahmedabad', label: 'Ahmedabad', state: 'Gujarat' },
  { value: 'gurgaon', label: 'Gurgaon', state: 'Haryana' },
  { value: 'noida', label: 'Noida', state: 'Uttar Pradesh' }
];

// Localities by city
export const LOCALITIES = {
  bangalore: [
    { value: 'whitefield', label: 'Whitefield' },
    { value: 'electronic-city', label: 'Electronic City' },
    { value: 'marathahalli', label: 'Marathahalli' },
    { value: 'hsr-layout', label: 'HSR Layout' },
    { value: 'koramangala', label: 'Koramangala' },
    { value: 'indiranagar', label: 'Indiranagar' },
    { value: 'jayanagar', label: 'Jayanagar' },
    { value: 'bellandur', label: 'Bellandur' }
  ],
  mumbai: [
    { value: 'lower-parel', label: 'Lower Parel' },
    { value: 'andheri-west', label: 'Andheri West' },
    { value: 'bandra', label: 'Bandra' },
    { value: 'worli', label: 'Worli' },
    { value: 'powai', label: 'Powai' },
    { value: 'thane', label: 'Thane' }
  ],
  hyderabad: [
    { value: 'gachibowli', label: 'Gachibowli' },
    { value: 'hitech-city', label: 'Hitech City' },
    { value: 'banjara-hills', label: 'Banjara Hills' },
    { value: 'kondapur', label: 'Kondapur' },
    { value: 'madhapur', label: 'Madhapur' }
  ],
  delhi: [
    { value: 'dwarka', label: 'Dwarka' },
    { value: 'rohini', label: 'Rohini' },
    { value: 'saket', label: 'Saket' },
    { value: 'vasant-kunj', label: 'Vasant Kunj' },
    { value: 'greater-kailash', label: 'Greater Kailash' }
  ],
  pune: [
    { value: 'hinjewadi', label: 'Hinjewadi' },
    { value: 'wakad', label: 'Wakad' },
    { value: 'baner', label: 'Baner' },
    { value: 'kothrud', label: 'Kothrud' },
    { value: 'magarpatta', label: 'Magarpatta' }
  ]
};

// Amenities list
export const AMENITIES = [
  { value: 'parking', label: 'Parking', icon: '🚗' },
  { value: 'garden', label: 'Garden', icon: '🌳' },
  { value: 'pool', label: 'Swimming Pool', icon: '🏊' },
  { value: 'gym', label: 'Gym', icon: '💪' },
  { value: 'security', label: '24/7 Security', icon: '🔒' },
  { value: 'balcony', label: 'Balcony', icon: '🏡' },
  { value: 'clubhouse', label: 'Clubhouse', icon: '🏛️' },
  { value: 'power-backup', label: 'Power Backup', icon: '⚡' },
  { value: 'lift', label: 'Lift/Elevator', icon: '🛗' },
  { value: 'cctv', label: 'CCTV', icon: '📹' },
  { value: 'wifi', label: 'WiFi', icon: '📶' },
  { value: 'playground', label: 'Playground', icon: '🎪' }
];

// Market sentiments
export const MARKET_SENTIMENTS = [
  { value: 'strong-buy', label: 'Strong Buy', color: 'green' },
  { value: 'buy', label: 'Buy', color: 'green' },
  { value: 'hold', label: 'Hold', color: 'amber' },
  { value: 'sell', label: 'Sell', color: 'red' },
  { value: 'strong-sell', label: 'Strong Sell', color: 'red' }
];

// Chart color schemes
export const CHART_COLORS = {
  primary: '#14b8a6',
  secondary: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  gradient: [
    'rgba(20, 184, 166, 0.8)',
    'rgba(6, 182, 212, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)'
  ]
};

// Time ranges for trends
export const TIME_RANGES = [
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last3months', label: 'Last 3 Months' },
  { value: 'last6months', label: 'Last 6 Months' },
  { value: 'last1year', label: 'Last 1 Year' },
  { value: 'last3years', label: 'Last 3 Years' }
];

// File upload configurations
export const FILE_UPLOAD_CONFIG = {
  csv: {
    accept: '.csv',
    maxSize: 10 * 1024 * 1024, // 10MB
    mimeTypes: ['text/csv', 'application/vnd.ms-excel']
  },
  images: {
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB per image
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp']
  }
};

// Default form values
export const DEFAULT_PROPERTY_FORM = {
  city: '',
  area: '',
  propertyType: 'Apartment',
  size: '1200',
  bedrooms: '3',
  bathrooms: '2',
  yearBuilt: new Date().getFullYear() - 4,
  age: '4',
  amenities: []
};

// Stats data
export const APP_STATS = [
  { label: 'Properties Analyzed', value: '10,000+', icon: 'Building2' },
  { label: 'Years of Data', value: '10+', icon: 'Calendar' },
  { label: 'Accuracy Rate', value: '95%', icon: 'Award' },
  { label: 'Total Value', value: '₹500Cr+', icon: 'DollarSign' }
];

// Navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/', icon: 'Home' },
  { id: 'prediction', label: 'AI Predicted Fair Value', path: '/prediction', icon: 'Sparkles' },
  { id: 'trends', label: 'Market Intelligence', path: '/trends', icon: 'BarChart3' },
  { id: 'analysis', label: 'Area Analysis', path: '/analysis', icon: 'MapPin' },
  { id: 'listings', label: 'Property Listings', path: '/listings', icon: 'Building' },
  { id: 'post', label: 'Post Property', path: '/post-property', icon: 'PlusCircle' },
  { id: 'buyer-dash', label: 'Buyer Dashboard', path: '/dashboard/buyer', icon: 'User' },
  { id: 'seller-dash', label: 'Seller Dashboard', path: '/dashboard/seller', icon: 'Store' },
  { id: 'about', label: 'Project Team / About', path: '/about', icon: 'Info' },
  { id: 'profile', label: 'My Profile', path: '/profile', icon: 'User' },
  { id: 'login', label: 'Login / Signup', path: '/login', icon: 'LogIn' }
];
