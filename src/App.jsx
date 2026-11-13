

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import { FavoritesProvider } from './context/FavoritesContext';
// import { ProductsProvider } from './context/ProductsContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Preloader from './components/Preloader';
// import FloatingWhatsApp from './components/FloatingWhatsApp';
// import GlobalSoundEffects from './components/GlobalSoundEffects';
// import ProtectedRoute from './components/ProtectedRoute';
// import soundManager from './utils/soundManager';

// import Home from './pages/Home';
// import ProductDetail from './pages/ProductDetail';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderSuccess from './pages/OrderSuccess';
// import OrderDetails from './pages/OrderDetails';
// import Favorites from './pages/Favorites';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import CategoryPage from './pages/CategoryPage';
// import Blog from './pages/Blog';

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const hideChrome = ['/login', '/signup'].includes(location.pathname);

//   return (
//     <div className="font-sans text-gray-800 bg-[#fcfbf7] min-h-screen flex flex-col">
//       {!hideChrome && <Navbar />}
//       <main className="flex-grow">{children}</main>
//       {!hideChrome && <Footer />}
//     </div>
//   );
// };

// const GlobalOverlays = () => {
//   const location = useLocation();
//   const hide = ['/login', '/signup'].includes(location.pathname);
//   if (hide) return null;
//   return (
//     <>
//       <GlobalSoundEffects />
//       <FloatingWhatsApp />
//     </>
//   );
// };

// function App() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => { soundManager.init(); }, []);

//   return (
//     <Router>
//       <AuthProvider>
//         <ProductsProvider>
//         <CartProvider>
//           <FavoritesProvider>
//             {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
//             <Layout>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/product/:id" element={<ProductDetail />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/favorites" element={<Favorites />} />
//                 <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
//                 <Route path="/order-success/:id" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
//                 <Route path="/orders" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/terms" element={<Terms />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/blog" element={<Blog />} />
//                 <Route path="/blog/:slug" element={<Blog />} />
//                 <Route path="/contact" element={<Contact />} />
//               </Routes>
//             </Layout>
//             <GlobalOverlays />
//           </FavoritesProvider>
//         </CartProvider>
//         </ProductsProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import GlobalSoundEffects from './components/GlobalSoundEffects';
import ProtectedRoute from './components/ProtectedRoute';
import soundManager from './utils/soundManager';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetails from './pages/OrderDetails';
import Favorites from './pages/Favorites';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import Blog from './pages/Blog';

/* 🔑 SessionStorage key — bump version to re-show preloader for everyone */
const PRELOADER_KEY = 'csg_preloader_seen_v1';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideChrome = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="font-sans text-gray-800 bg-[#fcfbf7] min-h-screen flex flex-col">
      {!hideChrome && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideChrome && <Footer />}
    </div>
  );
};

const GlobalOverlays = () => {
  const location = useLocation();
  const hide = ['/login', '/signup'].includes(location.pathname);
  if (hide) return null;
  return (
    <>
      <GlobalSoundEffects />
      <FloatingWhatsApp />
    </>
  );
};

function App() {
  // 🎯 Initialize based on sessionStorage — synchronously, no flash
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.sessionStorage.getItem(PRELOADER_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    soundManager.init();
  }, []);

  const handlePreloaderComplete = () => {
    try {
      window.sessionStorage.setItem(PRELOADER_KEY, '1');
    } catch {
      /* storage might be blocked — ignore */
    }
    setIsLoaded(true);
  };

  return (
    <Router>
      <AuthProvider>
        <ProductsProvider>
        <CartProvider>
          <FavoritesProvider>
            {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/order-success/:id" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
            <GlobalOverlays />
          </FavoritesProvider>
        </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;