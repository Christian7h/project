import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Brand from './pages/Brand';
import BrandPage from './pages/BrandPage';
import VehicleDetail from './pages/VehicleDetail';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />, // App sirve como el contenedor principal
      children: [
        { path: '/', element: <Home /> }, // Página de inicio
        { path: 'contact', element: <Contact /> }, // Página de contacto
        { path: 'brands', element: <Brand /> }, // Lista de marcas
        { path: 'brands/:brandId', element: <BrandPage /> }, // Detalle de marca
        { path: 'vehicles/:vehicleId', element: <VehicleDetail /> }, // Detalle de vehículo
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Habilita el uso de startTransition para actualizaciones más fluidas
      v7_relativeSplatPath: true, // Corrige la resolución de rutas relativas en rutas tipo splat
    },
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
