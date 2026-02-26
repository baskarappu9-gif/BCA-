import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Trends from './pages/Trends';
import Comparison from './pages/Comparison';
import AreaAnalysis from './pages/AreaAnalysis';
import Login from './pages/Login';
import About from './pages/About';
import PlaceholderPage from './pages/PlaceholderPage';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import PostProperty from './pages/PostProperty';
import Profile from './pages/Profile';
import Valuation from './pages/Valuation';
import './index.css';
import ParticleBackground from './components/ui/ParticleBackground';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans relative text-white">
        <ParticleBackground />
        <Header />
        <main className="flex-1 pt-16 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/analysis" element={<AreaAnalysis />} />

            {/* New Routes */}
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/post-property" element={<PostProperty />} />
            <Route path="/services" element={<PlaceholderPage title="Home Services" />} />
            <Route path="/interiors" element={<PlaceholderPage title="Interiors" />} />
            <Route path="/packers" element={<PlaceholderPage title="Packers & Movers" />} />
            <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
            <Route path="/dashboard/seller" element={<SellerDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/valuation" element={<Valuation />} />
            <Route path="/payment" element={<PlaceholderPage title="Payment & Rewards" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
