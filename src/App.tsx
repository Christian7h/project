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
      <main className='content'>
        <Outlet /> {/* Renderiza las rutas hijas */}
      </main>
      <Footer />
    </>
  );
}

export default App;
