import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Brand from './pages/Brand.tsx'
import BrandPage from './pages/BrandPage';
import VehicleDetail from './pages/VehicleDetail';
import Footer from './components/Footer.tsx'
import ScrollToTop from './components/ScrollTop.tsx';
function App() {
  return (
    <>
    <ScrollToTop/>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/brands' element={<Brand/>}/>
        <Route path="/brands/:brandId" element={<BrandPage />} />
        <Route path="/vehicles/:vehicleId" element={<VehicleDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;