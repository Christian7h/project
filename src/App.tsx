//src/app.tsx
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Contact from './pages/Contact'
import Brand from './pages/Brand'
import BrandPage from './pages/BrandPage';
import VehicleDetail from './pages/VehicleDetail';
import Footer from './components/Footer.tsx'
import ScrollToTop from './components/ScrollTop.tsx';
import './App.css';


function App() {
  return (
    <>
    <ScrollToTop/>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/brands' element={<Brand/>}/>
        <Route path="/brands/:brandId" element={<BrandPage />} />
        <Route path="/vehicles/:vehicleId" element={<VehicleDetail />} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;

