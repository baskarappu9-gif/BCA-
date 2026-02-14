import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, MapPin, BarChart3, ChevronRight, Star, Sparkles, Award, DollarSign } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import StatCard from '../components/StatCard';
import { APP_STATS } from '../utils/constants';
import { getTrendingCities, getProperties } from '../api/client';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('buy');
  const [trendingCities, setTrendingCities] = useState([]);
  const [latestProperties, setLatestProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // Use mock data for now
      setTrendingCities(mockTrendingCities);
      setLatestProperties(mockProperties);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fall back to mock data on error
      setTrendingCities(mockTrendingCities);
      setLatestProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/listings');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-blue-50 opacity-60"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <div className="px-4 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI-Powered Valuation
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
            Know the <span className="text-gradient">true value</span> of any<br />
            property in India
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl animate-fade-in-up animation-delay-200">
            ML-powered price predictions, market trends, and expert insights - with zero brokerage. All prices in ₹
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in-up animation-delay-400">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['buy', 'rent', 'sell'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSearchTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeSearchTab === tab
                    ? 'bg-primary-500 text-white transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search Properties..."
                className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {APP_STATS.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              iconName={stat.icon}
              delay={idx * 100}
            />
          ))}
        </div>
      </section>

      {/* Trending Cities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Trending Cities</h2>
          <button className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors">
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCities.map((city, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  <div className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                    {city.growth}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Investment Locations */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Top Investment Locations</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {investmentLocations.map((loc, idx) => (
            <div
              key={idx}
              className="card cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="text-sm text-gray-500 mb-1">{loc.city}</div>
              <div className="font-bold text-gray-900 mb-2">{loc.locality}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{loc.rating}</span>
                </div>
                <div className="text-green-600 font-semibold text-sm">{loc.returns}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Properties */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Latest Properties</h2>
          <button className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors">
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProperties.map((property, idx) => (
            <div key={property.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>

      {/* Market Insights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">AI Market Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketInsights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-primary-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{insight.title}</h3>
                <p className="text-gray-600">{insight.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why PriceWatch */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Why PriceWatch?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, title: 'ML Price Predictions', desc: 'AI-powered valuations with 95% accuracy' },
            { icon: DollarSign, title: 'Zero Brokerage', desc: 'Buy or sell at fair value with no fees' },
            { icon: BarChart3, title: 'Market Intelligence', desc: 'Real-time trends and insights' },
            { icon: Award, title: 'Complete Platform', desc: 'Seamless, end-to-end AI experience' }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* Testimonials - Social Proof */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Loved by 10,000+ Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul S.", role: "Home Buyer", text: "PriceWatch helped me save ₹15 Lakhs on my apartment in Whitefield. The valuation was spot on!", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
            { name: "Priya M.", role: "Property Investor", text: "The market trends analysis covers data I couldn't find anywhere else. Absolutely essential tool.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
            { name: "Vikram K.", role: "Seller", text: "Posted my property and got genuine leads within 24 hours. Sold faster than I expected!", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover ring-4 ring-primary-50" />
              <p className="text-gray-600 italic mb-6">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <span className="text-sm text-primary-500 font-semibold">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-white/10 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
        <div className="py-20 px-12 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Start Making Smart Property Decisions</h2>
          <p className="text-lg sm:text-xl text-teal-50 mb-10 max-w-2xl mx-auto">Join thousands of smart buyers and investors who use PriceWatch to get fair value.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.location.href = '/prediction'} className="px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl">
              Get Free Valuation
            </button>
            <button onClick={() => window.location.href = '/dashboard/seller'} className="px-8 py-4 bg-teal-700 text-white border border-teal-500 rounded-xl font-bold text-lg hover:bg-teal-800 transition-all transform hover:scale-105 shadow-xl">
              List Property
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
