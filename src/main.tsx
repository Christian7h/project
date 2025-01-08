import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
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
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/contact', element: <Contact /> },
        { path: '/brands', element: <Brand /> },
        { path: '/brands/:brandId', element: <BrandPage /> },
        { path: '/vehicles/:vehicleId', element: <VehicleDetail /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
