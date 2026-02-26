import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, MapPin, BarChart3, ChevronRight, Star, Sparkles, Award, DollarSign } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import StatCard from '../components/StatCard';
import { APP_STATS } from '../utils/constants';
import locationsData from '../utils/locations.json';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { MainScene } from '../components/main-scene';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('buy');
  const [trendingCities, setTrendingCities] = useState([]);
  const [latestProperties, setLatestProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Flatten locations for search
  const allLocations = React.useMemo(() => {
    const locations = [];
    Object.keys(locationsData).forEach(state => {
      locations.push({ name: state, type: 'State' });
      Object.keys(locationsData[state]).forEach(district => {
        locations.push({ name: district, type: 'District', parent: state });
        locationsData[state][district].forEach(area => {
          locations.push({ name: area, type: 'Locality', parent: district });
        });
      });
    });
    return locations;
  }, []);

  const filteredLocations = React.useMemo(() => {
    if (!searchQuery) return [];
    return allLocations.filter(loc =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8); // Limit results
  }, [searchQuery, allLocations]);

  // Mock data for trending cities
  const mockTrendingCities = [
    { name: 'Bangalore', imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400', growth: '+12%' },
    { name: 'Mumbai', imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400', growth: '+8%' },
    { name: 'Hyderabad', imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400', growth: '+15%' },
    { name: 'Delhi NCR', imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400', growth: '+6%' },
    { name: 'Pune', imageUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400', growth: '+10%' },
    { name: 'Chennai', imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400', growth: '+7%' }
  ];

  // Mock data for investment locations
  const investmentLocations = [
    { city: 'Mumbai', locality: 'Lower Parel', rating: 4.5, returns: '+12%' },
    { city: 'Bangalore', locality: 'Whitefield', rating: 4.7, returns: '+15%' },
    { city: 'Hyderabad', locality: 'Gachibowli', rating: 4.6, returns: '+18%' },
    { city: 'Delhi', locality: 'Dwarka', rating: 4.3, returns: '+8%' },
    { city: 'Bangalore', locality: 'Electronic City', rating: 4.8, returns: '+20%' }
  ];

  // Mock data for latest properties
  const mockProperties = [
    {
      id: '1',
      title: '3 BHK Apartment in Greater Noida',
      location: 'Greater Noida West',
      price: 12000000,
      size: 1450,
      bedrooms: 3,
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'],
      featured: true
    },
    {
      id: '2',
      title: '2 BHK Apartment in Andheri West',
      location: 'Andheri West, Mumbai',
      price: 28000000,
      size: 980,
      bedrooms: 2,
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      featured: true
    },
    {
      id: '3',
      title: '4 BHK Villa in Whitefield',
      location: 'Whitefield, Bangalore',
      price: 35000000,
      size: 2800,
      bedrooms: 4,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
      featured: false
    },
    {
      id: '4',
      title: '3 BHK Apartment in Banjara Hills',
      location: 'Banjara Hills, Hyderabad',
      price: 15000000,
      size: 1650,
      bedrooms: 3,
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400'],
      featured: false
    },
    {
      id: '5',
      title: '5 BHK Penthouse in Worli',
      location: 'Worli, Mumbai',
      price: 128000000,
      size: 4200,
      bedrooms: 5,
      images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400'],
      featured: true
    },
    {
      id: '6',
      title: '2 BHK Apartment in Gurgaon',
      location: 'Golf Course Road, Gurgaon',
      price: 18000000,
      size: 1100,
      bedrooms: 2,
      images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400'],
      featured: false
    }
  ];

  const marketInsights = [
    {
      title: 'Best Time to Buy',
      icon: TrendingUp,
      desc: 'Property inventories are at optimal levels, with reduced prices and better options.'
    },
    {
      title: 'Price Comparison Alert',
      icon: BarChart3,
      desc: 'Compare prices across neighborhoods to find the best deals in desired locations.'
    },
    {
      title: 'Emerging Hotspot',
      icon: MapPin,
      desc: 'North Bangalore and Pune West show exceptional rental income potential (+20%).'
    }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setTrendingCities(mockTrendingCities);
      setLatestProperties(mockProperties);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTrendingCities(mockTrendingCities);
      setLatestProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeSearchTab === 'sell') {
      navigate('/post-property');
    } else if (searchQuery.trim()) {
      navigate('/listings');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <MainScene />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">AI-Powered Real Estate Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight animate-fade-in-up">
              Know the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">true value</span>
              <br /> of any property
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Machine learning algorithms provide instant predictive valuations, market trends, and investment insights with 95% accuracy.
            </p>

            {/* Search Box */}
            <div className="max-w-3xl mx-auto mt-12 relative z-20">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-[2rem] blur opacity-30 animate-pulse-slow"></div>
              <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[1.8rem] p-3 shadow-2xl">

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 mb-3 p-1 bg-white/5 rounded-3xl">
                  {['buy', 'sell'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSearchTab(tab)}
                      className={`py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 ${activeSearchTab === tab
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)]'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search Field */}
                <form onSubmit={handleSearch} className="relative group z-50">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center bg-black border border-white/10 rounded-full px-2 transition-colors group-hover:border-teal-500/30">
                    <Search className="w-6 h-6 text-teal-500 ml-4" />
                    <Input
                      type="text"
                      placeholder={activeSearchTab === 'sell' ? "Enter property location to sell..." : "Search for City, Locality, Project..."}
                      className="flex-1 border-none bg-transparent text-white placeholder-gray-500 h-14 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    <Button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-400 text-black font-bold h-10 px-8 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all hover:scale-105"
                    >
                      {activeSearchTab === 'sell' ? 'List It' : 'Search'}
                    </Button>
                  </div>

                  {/* Suggestions Dropdown */}
                  {showSuggestions && searchQuery && filteredLocations.length > 0 && (
                    <div className="absolute top-full left-4 right-4 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                      {filteredLocations.map((loc, idx) => (
                        <div
                          key={idx}
                          onMouseDown={() => {
                            setSearchQuery(loc.name);
                            setShowSuggestions(false);
                            navigate('/listings'); // Auto-navigate on selection if desired, or just set val
                          }}
                          className="px-6 py-4 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0 flex justify-between items-center group"
                        >
                          <div>
                            <div className="text-white font-medium group-hover:text-teal-400 transition-colors">{loc.name}</div>
                            {loc.parent && <div className="text-xs text-gray-500">{loc.parent} • {loc.type}</div>}
                            {!loc.parent && <div className="text-xs text-gray-500">{loc.type}</div>}
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-teal-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {APP_STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-teal-400 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Cities */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Trending Cities</h2>
            <Button variant="ghost" className="text-teal-400 hover:text-teal-300">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCities.map((city, idx) => (
              <div
                key={idx}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10"
              >
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {city.growth}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Insights */}
        <section className="py-24 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">AI Market Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketInsights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <Card key={idx} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-teal-500/50 transition-colors">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{insight.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Latest Properties */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Latest Properties</h2>
            <Button variant="ghost" className="text-teal-400 hover:text-teal-300">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProperties.map((property, idx) => (
              <div key={property.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {property.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-teal-500 text-black border-none font-bold">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                    <span className="font-bold text-white">₹ {property.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-teal-500" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between py-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase">Size</div>
                      <div className="font-semibold text-white">{property.size} sqft</div>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase">Beds</div>
                      <div className="font-semibold text-white">{property.bedrooms} BHK</div>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase">Type</div>
                      <div className="font-semibold text-white">Sale</div>
                    </div>
                  </div>
                  <Button className="w-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/50 mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Market Activity (New Feature) */}
        <section className="py-12 bg-black border-t border-white/5 relative z-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide uppercase text-sm">Live Market Pulse</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { type: 'Prediction', text: 'User in Whitefield predicted value for 3 BHK', time: '2 mins ago', color: 'bg-teal-500' },
                { type: 'Listing', text: 'New 4 BHK Villa just listed in Sarjapur Road', time: '5 mins ago', color: 'bg-blue-500' },
                { type: 'Alert', text: 'Price drop alert sent for Indiranagar property', time: '12 mins ago', color: 'bg-red-500' },
                { type: 'Insight', text: 'User in Mumbai analyzed rental yields', time: '15 mins ago', color: 'bg-purple-500' }
              ].map((activity, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:border-teal-500/30 transition-all hover:bg-white/10">
                  <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${activity.color}`}></div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium mb-1 leading-snug">{activity.text}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center relative overflow-hidden bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-teal-500/20 rounded-3xl p-12 sm:p-20">
            <div className="absolute inset-0 bg-grid-white/5 mask-image-b"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Start Making Smart Decisions</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of smart buyers and investors who use PriceWatch AI to get fair value estimates instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-black font-bold text-lg px-8 h-14">
                  Get Free Valuation
                </Button>
                <Button size="lg" variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-950 text-lg px-8 h-14">
                  List Property
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="py-12 border-t border-white/10 bg-black text-center text-gray-500 text-sm">
          <p>&copy; 2024 PriceWatch AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
