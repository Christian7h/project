import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BrandPage from './pages/BrandPage';
import VehicleDetail from './pages/VehicleDetail';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/:brandId" element={<BrandPage />} />
        <Route path="/vehicles/:vehicleId" element={<VehicleDetail />} />
      </Routes>
    </>
  );
}

export default App;