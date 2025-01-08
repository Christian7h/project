import Navigation from './components/Navigation';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollTop.tsx';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <div className="content">
        {/* Aquí se renderizan las rutas configuradas en main.tsx */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
