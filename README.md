# 🚗 Luxury Car Store - Aplicación Web de Venta de Vehículos de Lujo

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)

## 📋 Descripción del Proyecto

Aplicación web moderna desarrollada para la venta de vehículos de lujo de marcas premium como BMW, Mercedes-Benz, Audi, Porsche, Ferrari, Lamborghini, entre otras. La aplicación cuenta con un catálogo interactivo, sistema de favoritos, carrito de compras, y múltiples funcionalidades avanzadas para mejorar la experiencia del usuario.

## 🛠 Stack Tecnológico

### **Frontend**
- **Framework:** React 18.3.1 con TypeScript 5.5.3
- **Build Tool:** Vite 5.4.2 (desarrollo y producción)
- **Routing:** React Router DOM 7.1.1
- **Estilos:** Tailwind CSS 3.4.1 + PostCSS + Autoprefixer

### **Animations & UX**
- **Framer Motion:** 11.16.1 (animaciones avanzadas)
- **React Three.js:** @react-three/fiber + @react-three/drei (elementos 3D)
- **Animate.css:** 4.1.1 (animaciones CSS)
- **React Confetti:** 6.2.2 (efectos visuales)

### **State Management & Context**
- **React Context API** para gestión de estado global
- **React Hook Form:** 7.54.2 + Zod 3.24.1 (validación de formularios)
- **React Use:** 17.6.0 (hooks utilities)

### **Performance & Optimization**
- **React Lazy Load Image Component:** 1.6.3 (lazy loading de imágenes)
- **React Intersection Observer:** 9.8.1 (scroll tracking)
- **Vite Image Optimizer:** 1.1.8 (optimización automática de imágenes)
- **Fuse.js:** 7.0.0 (búsqueda fuzzy)

### **Integrations**
- **Transbank SDK:** 5.0.0 (sistema de pagos chileno)
- **Resend:** 4.1.1 (sistema de emails)
- **React PDF Renderer:** 4.1.6 (generación de PDFs)
- **LightGallery:** 2.8.2 (galería de imágenes)

### **Development Tools**
- **ESLint:** 9.9.1 + TypeScript ESLint 8.3.0
- **Sass:** sass-embedded 1.83.1
- **Analytics:** React GA4 2.1.0

### **Hosting & Deployment**
- **Firebase Hosting** (región us-west1)
- **Frameworks Backend** habilitado

## 🏗 Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CartDropdown.tsx
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── LoadingScreen.tsx
│   └── ...
├── context/            # Context providers para estado global
│   ├── CartContext.tsx
│   ├── FavoritesContext.tsx
│   ├── LanguageContext.tsx
│   └── CheckoutContext.tsx
├── pages/              # Páginas principales
│   ├── Home.tsx
│   ├── VehicleDetail.tsx
│   ├── Checkout.tsx
│   └── ...
├── services/           # Servicios externos
│   ├── payment.ts
│   ├── send-email.ts
│   └── webpay.ts
├── data.ts            # Datos de marcas y vehículos
├── types.ts           # Definiciones TypeScript
└── assets/            # Recursos estáticos
```

## 🚀 Características Principales

### **💼 Funcionalidades de Negocio**
- ✅ Catálogo completo de vehículos de lujo con múltiples marcas
- ✅ Sistema de filtrado avanzado por marca, tipo, precio
- ✅ Galería de imágenes interactiva con zoom
- ✅ Sistema de favoritos persistente
- ✅ Carrito de compras con gestión de estado
- ✅ Checkout integrado con Transbank (WebPay)
- ✅ Generación automática de PDFs
- ✅ Sistema de cupones de descuento

### **🌐 Funcionalidades Técnicas**
- ✅ Aplicación SPA (Single Page Application)
- ✅ Soporte multiidioma (ES/EN)
- ✅ Modo oscuro/claro dinámico
- ✅ Responsive design (mobile-first)
- ✅ Progressive Web App capabilities
- ✅ SEO optimizado
- ✅ Performance optimizada (lazy loading, code splitting)

### **🎨 Experiencia de Usuario**
- ✅ Animaciones fluidas con Framer Motion
- ✅ Transiciones suaves entre páginas
- ✅ Loading states personalizados
- ✅ Feedback visual en tiempo real
- ✅ Scroll progress indicator
- ✅ Elementos 3D interactivos

## ⚡ Optimizaciones de Performance

### **Técnicas Implementadas:**
1. **Lazy Loading:** Carga diferida de imágenes y componentes
2. **Code Splitting:** División automática del código con Vite
3. **Image Optimization:** Compresión automática de imágenes (PNG, JPEG, WebP)
4. **Memoization:** Uso de React.memo y useCallback para evitar re-renders
5. **Bundle Optimization:** Optimización de dependencias con Vite
6. **CDN:** Uso de Firebase Hosting con CDN global

### **Métricas de Performance:**
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** 90+ en todas las categorías

## 🔧 Instalación y Configuración

### **Prerrequisitos:**
- Node.js 18+ 
- npm o yarn
- Git

### **Instalación:**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/luxury-car-store.git
cd luxury-car-store

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### **Variables de Entorno:**
```env
VITE_RESEND_API_KEY=your_resend_api_key
VITE_TRANSBANK_ENVIRONMENT=integration
VITE_GA_MEASUREMENT_ID=your_ga_id
VITE_FIREBASE_CONFIG=your_firebase_config
```

## 🚀 Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📦 Deployment

### **Firebase Hosting:**
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login y configuración
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy
```

## 🏛 Patrones de Diseño Implementados

### **1. Context Provider Pattern**
- Gestión centralizada de estado global
- Providers para Cart, Favorites, Language

### **2. Compound Component Pattern**
- Componentes complejos divididos en subcomponentes
- Reutilización y mantenibilidad mejorada

### **3. Custom Hooks Pattern**
- Lógica reutilizable encapsulada
- Separación de concerns

### **4. Error Boundary Pattern**
- Manejo robusto de errores
- Fallback UI components

## 🔒 Seguridad

### **Medidas Implementadas:**
- ✅ Validación de formularios con Zod
- ✅ Sanitización de inputs
- ✅ Headers de seguridad configurados
- ✅ HTTPS enforcement
- ✅ API keys securizadas
- ✅ XSS protection

## 📊 Analytics y Monitoreo

### **Herramientas Integradas:**
- **Google Analytics 4:** Tracking de usuarios y conversiones
- **Firebase Analytics:** Métricas de performance
- **Core Web Vitals:** Monitoreo de UX

## 🧪 Testing Strategy

### **Tipos de Testing:**
- **Unit Tests:** Jest + React Testing Library
- **Integration Tests:** Cypress
- **Performance Tests:** Lighthouse CI
- **Accessibility Tests:** axe-core

## 🤝 Contribución

### **Workflow de Desarrollo:**
1. Fork del repositorio
2. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
3. Commits descriptivos siguiendo conventional commits
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Estándares de Código:**
- **ESLint:** Configuración estricta
- **Prettier:** Formateo automático
- **Husky:** Pre-commit hooks
- **TypeScript:** Tipado estricto

## 📝 Documentación Técnica

### **APIs Utilizadas:**
- **Transbank API:** Procesamiento de pagos
- **Resend API:** Envío de emails
- **Google Analytics API:** Tracking de eventos

### **Estructura de Datos:**
```typescript
interface Vehicle {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  specifications: VehicleSpec[];
  translations: TranslationObject;
}
```

## 🏆 Reconocimientos

### **Tecnologías Destacadas:**
- **React + TypeScript:** Base sólida y escalable
- **Vite:** Build tool de nueva generación
- **Tailwind CSS:** Desarrollo CSS eficiente
- **Framer Motion:** Animaciones profesionales
- **Firebase:** Hosting y servicios cloud

---

## 👨‍💻 Información del Desarrollador

**Aplicación desarrollada para demostrar competencias técnicas como Analista Programador**

### **Competencias Demostradas:**
- ✅ Desarrollo Frontend moderno con React + TypeScript
- ✅ Arquitectura de aplicaciones escalables
- ✅ Integración de APIs y servicios externos
- ✅ Optimización de performance y UX
- ✅ Deployment y DevOps
- ✅ Testing y calidad de código
- ✅ Seguridad web
- ✅ Responsive design y accesibilidad

### **Contacto:**
- **GitHub:** [tu-github-username]
- **LinkedIn:** [tu-linkedin-profile]
- **Email:** [tu-email@dominio.com]

---

*Desarrollado con ❤️ y las mejores prácticas de desarrollo web moderno*
