// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { ShoppingCart, User, Search, ChevronDown, Menu, X, Heart, LogOut, ArrowRight } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { useFavorites } from '../context/FavoritesContext';
// import { useSiteSettings } from '../hooks/useSiteSettings';
// import { api } from '../utils/api';
// import { mediaUrl } from '../utils/api';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [storeCategories, setStoreCategories] = useState([]);
//   const settings = useSiteSettings();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { user, logout } = useAuth();
//   const { totalItems } = useCart();
//   const { favorites } = useFavorites();

//   useEffect(() => {
//     let mounted = true;
//     api('/categories').then((data) => {
//       // Supports both a plain array and common API response wrappers.
//       const list = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.categories)
//           ? data.categories
//           : Array.isArray(data?.data)
//             ? data.data
//             : Array.isArray(data?.data?.categories)
//               ? data.data.categories
//               : [];

//       const normalized = list.map((category) => ({
//         ...category,
//         subcategories: Array.isArray(category.subcategories)
//           ? category.subcategories
//           : [],
//       }));

//       if (mounted) setStoreCategories(normalized);
//     }).catch((error) => {
//       console.error('Unable to load navbar categories:', error);
//       if (mounted) setStoreCategories([]);
//     });
//     return () => { mounted = false; };
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsUserMenuOpen(false);
//   }, [location]);

//   const fallbackNavLinks = [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Blog', path: '/blog' }, { name: 'Contact', path: '/contact' }];
//   const navLinks = (() => { try { const parsed = JSON.parse(settings.navigation_json || '[]'); return Array.isArray(parsed) && parsed.length ? parsed.filter(x => x.name && x.path) : fallbackNavLinks; } catch { return fallbackNavLinks; } })();

//   const submitSearch = (e) => { e.preventDefault(); const term = searchTerm.trim(); navigate(term ? `/?search=${encodeURIComponent(term)}#products` : '/'); };

//   const handleLogout = () => {
//     logout();
//     setIsUserMenuOpen(false);
//     navigate('/');
//   };

//   return (
//     // ✅ NOT fixed — normal flow, scroll ke saath chala jayega
//     <header className="relative w-full z-40 bg-white">
      
//       {/* Fast, seamless looping announcement bar */}
//       <div className="announcement-marquee bg-gradient-to-r from-[#1a3c2e] via-[#2d6a4f] to-[#1a3c2e] text-white text-[11px] sm:text-xs py-2 font-medium tracking-widest overflow-hidden" aria-label="Store announcements">
//         {(() => {
//           const fallback = `Free Shipping on orders above ₹${Number(settings.free_shipping_threshold || 1999).toLocaleString('en-IN')}`;
//           const messages = String(settings.announcement_text || fallback).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
//           const items = messages.length ? messages : [fallback];
//           return <div className="announcement-track flex w-max items-center" aria-hidden="true">
//             {[...items, ...items, ...items, ...items].map((line, index) => (
//               <span key={`${index}-${line}`} className="flex items-center gap-3 whitespace-nowrap px-7">
//                <span className="h-1 w-1 rounded-full bg-[#a3d9b1] shrink-0" />{line}
//               </span>
//             ))}
//           </div>;
//         })()}
//       </div>

//       {/* Main Navbar */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 md:h-20">
            
//             {/* Logo */}
//            {/* Website Logo */}

// <Link to="/" className="flex items-center gap-3 shrink-0 group">
//   {settings.logo_url && (
//     <img
//       src={mediaUrl(settings.logo_url)}
//       alt={settings.brand_name || 'Website Logo'}
//       className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#d8e8dc] shadow-sm"
//     />
//   )}

//   <div className="flex flex-col justify-center">
//     <h1 className="text-lg md:text-xl font-bold text-[#1a3c2e] leading-tight group-hover:text-[#2d6a4f] transition-colors">
//       {settings.brand_name || 'Cityscape Greenery'}
//     </h1>

//     <p className="text-[9px] md:text-[10px] font-semibold text-[#2d6a4f] tracking-[0.16em] uppercase mt-1">
//       Conscious Plant Living
//     </p>
//   </div>
// </Link>


//             {/* Search Desktop */}
//             <form onSubmit={submitSearch} className="hidden lg:flex flex-1 max-w-xl mx-10 relative group">
//               <input
//                 type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search products, pots, plants..."
//                 className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 pl-11 pr-12 focus:outline-none focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10 text-sm"
//               />
//               <button type="submit" aria-label="Search products" className="absolute right-3 top-2.5 text-gray-500 hover:text-[#2d6a4f]"><Search className="w-4 h-4" /></button>
//             </form>

//             {/* Right Icons */}
//             <div className="flex items-center gap-2 sm:gap-3">
              
//               {/* Favorites */}
//               <Link
//                 to="/favorites"
//                 className="relative w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f]"
//                 aria-label="Favorites"
//               >
//                 <Heart className="w-5 h-5" />
//                 {favorites.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
//                     {favorites.length}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart */}
//               <Link
//                 to="/cart"
//                 className="relative w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f]"
//                 aria-label="Cart"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-[#2d6a4f] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>

//               {/* User */}
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                     className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-full hover:bg-[#eef2ed]"
//                   >
//                     <div className="w-7 h-7 rounded-full bg-[#2d6a4f] text-white text-xs font-bold flex items-center justify-center">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="text-sm font-medium hidden md:inline">
//                       {user.name.split(' ')[0]}
//                     </span>
//                     <ChevronDown className={`w-3.5 h-3.5 hidden md:inline transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {isUserMenuOpen && (
//                     <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
//                       <div className="px-4 py-2 border-b border-gray-100">
//                         <p className="text-xs text-gray-500">Signed in as</p>
//                         <p className="text-sm font-semibold text-[#1a3c2e] truncate">{user.email}</p>
//                       </div>
//                       <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef2ed]">My Orders</Link>
//                       <Link to="/favorites" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef2ed]">Favorites</Link>
//                       <Link to="/cart" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef2ed]">My Cart</Link>
//                       <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100 mt-1">
//                         <LogOut className="w-4 h-4" /> Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#eef2ed] text-gray-600 hover:text-[#2d6a4f]"
//                 >
//                   <User className="w-5 h-5" />
//                   <span className="text-sm font-medium">Login</span>
//                 </Link>
//               )}

//               {/* Mobile Toggle */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600"
//                 aria-label="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Nav Links Desktop */}
//         <div className="hidden md:block border-t border-gray-100/70">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <ul className="flex flex-wrap items-center justify-center gap-3 py-2.5 text-sm font-medium text-gray-600">
//               {/* Home always stays first */}
//               <li className="relative group">
//                 <Link to="/" className={`px-3 py-1 rounded-lg transition-all ${location.pathname === '/' ? 'text-[#2d6a4f] font-semibold' : 'hover:text-[#2d6a4f]'}`}>Home</Link>
//                 <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2d6a4f] rounded-full transition-all duration-300 ${location.pathname === '/' ? 'w-8' : 'w-0 group-hover:w-8'}`} />
//               </li>

//               {/* Dynamic categories immediately after Home */}
//               {storeCategories.map((category) => (
//                 <li key={`cat-${category.id}`} className="group relative py-1">
//                   <Link to={`/category/${encodeURIComponent(category.slug || category.name)}`} className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium text-gray-600 transition hover:bg-[#eef2ed] hover:text-[#2d6a4f]">
//                     {category.name}<ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
//                   </Link>
//                   <div className="invisible absolute left-1/2 top-full z-50 w-[min(680px,90vw)] -translate-x-1/2 translate-y-2 rounded-b-2xl border border-gray-100 bg-white p-6 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
//                     <div className="grid grid-cols-[0.9fr_1.4fr] gap-6">
//                       <div className="rounded-xl bg-[#eef2ed] p-5">
//                         <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78917d]">Explore collection</p>
//                         <h3 className="mt-2 text-2xl font-semibold text-[#1a3c2e]">{category.name}</h3>
//                         <p className="mt-2 text-xs leading-5 text-gray-600">Explore our curated collection and bring more green into your space.</p>
//                         <Link to={`/category/${encodeURIComponent(category.slug || category.name)}`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#2d6a4f]">Shop all <ArrowRight className="h-3.5 w-3.5" /></Link>
//                       </div>
//                       <div>
//                         <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Shop by subcategory</p>
//                         <div className="grid grid-cols-2 gap-x-4">
//                           {(category.subcategories || []).map((sub) => (
//                             <Link key={sub.id} to={`/category/${encodeURIComponent(category.slug || category.name)}/${encodeURIComponent(sub.slug || sub.name)}`} className="border-b border-gray-100 px-1 py-3 text-xs text-gray-600 transition hover:pl-2 hover:text-[#2d6a4f]">{sub.name}</Link>
//                           ))}
//                         </div>
//                         {(!category.subcategories || category.subcategories.length === 0) && <p className="py-3 text-xs text-gray-400">Subcategories will appear here when added in admin.</p>}
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}

//               {navLinks.filter((link) => link.name.toLowerCase() !== 'home').map((link) => {
//                 const isActive = location.pathname === link.path;
//                 return <li key={link.name} className="relative group"><Link to={link.path} className={`px-3 py-1 rounded-lg transition-all ${isActive ? 'text-[#2d6a4f] font-semibold' : 'hover:text-[#2d6a4f]'}`}>{link.name}</Link><span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2d6a4f] rounded-full transition-all duration-300 ${isActive ? 'w-8' : 'w-0 group-hover:w-8'}`} /></li>;
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ${
//           isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="px-4 py-4 space-y-1.5">
//           {!user && (
//             <Link
//               to="/login"
//               className="flex items-center justify-center gap-2 bg-[#1a3c2e] text-white px-4 py-3 rounded-xl text-sm font-semibold mb-2"
//             >
//               <User className="w-4 h-4" /> Login / Signup
//             </Link>
//           )}
//           <Link to="/" className={`block px-4 py-3 rounded-xl text-sm font-medium ${location.pathname === '/' ? 'bg-[#eef2ed] text-[#2d6a4f]' : 'text-gray-600 hover:bg-gray-50'}`}>Home</Link>
//           {storeCategories.map((category) => (
//             <div key={`mobile-cat-${category.id}`} className="rounded-xl bg-[#f7f9f6] overflow-hidden">
//               <Link to={`/category/${encodeURIComponent(category.slug || category.name)}`} className="block px-4 py-3 text-sm font-semibold text-[#1a3c2e]">{category.name}</Link>
//               {(category.subcategories || []).map((sub) => <Link key={sub.id} to={`/category/${encodeURIComponent(category.slug || category.name)}/${encodeURIComponent(sub.slug || sub.name)}`} className="block border-t border-white px-4 py-2.5 pl-7 text-sm text-gray-600">{sub.name}</Link>)}
//             </div>
//           ))}
//           {navLinks.filter((link) => link.name.toLowerCase() !== 'home').map((link) => {
//             const isActive = location.pathname === link.path;
//             return (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`block px-4 py-3 rounded-xl text-sm font-medium ${
//                   isActive
//                     ? 'bg-[#eef2ed] text-[#2d6a4f]'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//           {user && (
//             <>
//               <div className="h-px bg-gray-100 my-2"></div>
//               <Link to="/orders" className="block px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">My Orders</Link>
//               <Link to="/favorites" className="block px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Favorites ({favorites.length})</Link>
//               <Link to="/cart" className="block px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cart ({totalItems})</Link>
//               <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50">Logout</button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  Menu,
  X,
  Heart,
  LogOut,
  ArrowRight,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { api, mediaUrl } from '../utils/api';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [storeCategories, setStoreCategories] = useState([]);

  const settings = useSiteSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  // Fetch categories
  useEffect(() => {
    let mounted = true;

    api('/categories')
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
            ? data.categories
            : Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.data?.categories)
                ? data.data.categories
                : [];

        const normalized = list.map((category) => ({
          ...category,
          subcategories: Array.isArray(category.subcategories)
            ? category.subcategories
            : [],
        }));

        if (mounted) setStoreCategories(normalized);
      })
      .catch((error) => {
        console.error('Unable to load navbar categories:', error);
        if (mounted) setStoreCategories([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Close menus whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setExpandedCategory(null);
  }, [location.pathname]);

  // Prevent background page scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const fallbackNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const navLinks = (() => {
    try {
      const parsed = JSON.parse(settings.navigation_json || '[]');

      return Array.isArray(parsed) && parsed.length
        ? parsed.filter((item) => item.name && item.path)
        : fallbackNavLinks;
    } catch {
      return fallbackNavLinks;
    }
  })();

  const otherNavLinks = navLinks.filter(
    (link) => link.name.toLowerCase() !== 'home'
  );

  const submitSearch = (e) => {
    e.preventDefault();

    const term = searchTerm.trim();

    setIsMobileMenuOpen(false);

    navigate(
      term
        ? `/?search=${encodeURIComponent(term)}#products`
        : '/'
    );
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory((current) =>
      current === categoryId ? null : categoryId
    );
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path ||
      location.pathname.startsWith(`${path}/`);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedCategory(null);
  };

  return (
    <header className=" top-0 z-50 w-full bg-white shadow-sm">

      {/* Announcement Bar */}
      <div
        className="announcement-marquee overflow-hidden bg-[#193b2b] py-2 text-[10px] font-medium tracking-wider text-white sm:text-xs"
        aria-label="Store announcements"
      >
        {(() => {
          const fallback = `Free Shipping on orders above ₹${Number(
            settings.free_shipping_threshold || 1999
          ).toLocaleString('en-IN')}`;

          const messages = String(
            settings.announcement_text || fallback
          )
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

          const items = messages.length ? messages : [fallback];

          return (
            <div
              className="announcement-track flex w-max items-center"
              aria-hidden="true"
            >
              {[...items, ...items, ...items].map((line, index) => (
                <span
                  key={`${index}-${line}`}
                  className="flex shrink-0 items-center gap-3 whitespace-nowrap px-6"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/70" />
                  {line}
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">

          <div className="flex h-[68px] items-center justify-between gap-2 sm:h-[76px] md:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            >
              {settings.logo_url && (
                <img
                  src={mediaUrl(settings.logo_url)}
                  alt={settings.brand_name || 'Website Logo'}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover sm:h-12 sm:w-12 md:h-14 md:w-14"
                />
              )}

              <div className="flex min-w-0 flex-col justify-center">
                <h1 className="truncate text-sm font-bold leading-tight text-[#193b2b] transition-colors group-hover:text-[#315b43] sm:text-base md:text-xl">
                  {settings.brand_name || 'Cityscape Greenery'}
                </h1>

                <p className="mt-1 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] text-[#193b2b]/70 sm:text-[9px] md:text-[10px] md:tracking-[0.16em]">
                  Conscious Plant Living
                </p>
              </div>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={submitSearch}
              className="group relative mx-6 hidden max-w-xl flex-1 lg:flex"
            >
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, pots, plants..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-14 text-sm outline-none transition focus:border-[#193b2b] focus:bg-white focus:ring-4 focus:ring-[#193b2b]/10"
              />

              <button
                type="submit"
                aria-label="Search products"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#193b2b]"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">

              {/* Favorites */}
              <Link
                to="/favorites"
                aria-label="Favorites"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b] sm:h-10 sm:w-10"
              >
                <Heart className="h-5 w-5" />

                {favorites.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label="Cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b] sm:h-10 sm:w-10"
              >
                <ShoppingCart className="h-5 w-5" />

                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#193b2b] px-1 text-[9px] font-bold text-white ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Dropdown - Desktop */}
              {user ? (
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-full px-2 py-2 transition hover:bg-gray-50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#193b2b] text-xs font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    <span className="max-w-24 truncate text-sm font-medium text-gray-700">
                      {user.name?.split(' ')[0] || 'Account'}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full z-[60] mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="text-xs text-gray-400">
                          Signed in as
                        </p>
                        <p className="truncate text-sm font-semibold text-[#193b2b]">
                          {user.email || user.name}
                        </p>
                      </div>

                      <Link
                        to="/orders"
                        className="block px-4 py-3 text-sm text-gray-600 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b]"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/favorites"
                        className="block px-4 py-3 text-sm text-gray-600 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b]"
                      >
                        Favorites
                      </Link>

                      <Link
                        to="/cart"
                        className="block px-4 py-3 text-sm text-gray-600 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b]"
                      >
                        My Cart
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b] md:flex"
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#193b2b] transition hover:bg-[#193b2b]/5 md:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden border-t border-gray-100 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 py-2.5 text-sm font-medium">

              {/* Home */}
              <li className="group relative">
                <Link
                  to="/"
                  className={`block rounded-lg px-3 py-2 transition ${
                    isActive('/')
                      ? 'font-semibold text-[#193b2b]'
                      : 'text-gray-600 hover:text-[#193b2b]'
                  }`}
                >
                  Home
                </Link>

                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#193b2b] transition-all ${
                    isActive('/') ? 'w-7' : 'w-0 group-hover:w-7'
                  }`}
                />
              </li>

              {/* Dynamic Categories */}
              {storeCategories.map((category) => {
                const categoryId =
                  category.id || category.slug || category.name;

                const categoryPath = `/category/${encodeURIComponent(
                  category.slug || category.name
                )}`;

                return (
                  <li
                    key={categoryId}
                    className="group relative py-1"
                  >
                    <Link
                      to={categoryPath}
                      className={`flex items-center gap-1 rounded-lg px-3 py-2 transition hover:bg-[#193b2b]/5 hover:text-[#193b2b] ${
                        isActive(categoryPath)
                          ? 'font-semibold text-[#193b2b]'
                          : 'text-gray-600'
                      }`}
                    >
                      {category.name}

                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Desktop Hover Dropdown */}
                    <div className="invisible absolute left-1/2 top-full z-[60] w-[min(680px,90vw)] -translate-x-1/2 translate-y-2 rounded-2xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">

                      <div className="grid grid-cols-[0.9fr_1.4fr] gap-6">

                        <div className="rounded-xl bg-[#193b2b]/5 p-5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#193b2b]/60">
                            Explore Collection
                          </p>

                          <h3 className="mt-2 text-xl font-semibold text-[#193b2b]">
                            {category.name}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-gray-500">
                            Explore our curated collection and bring more
                            green into your space.
                          </p>

                          <Link
                            to={categoryPath}
                            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#193b2b] hover:gap-3"
                          >
                            Shop all
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        <div>
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                            Shop by Subcategory
                          </p>

                          <div className="grid grid-cols-2 gap-x-4">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.id || sub.slug || sub.name}
                                to={`${categoryPath}/${encodeURIComponent(
                                  sub.slug || sub.name
                                )}`}
                                className="border-b border-gray-100 px-1 py-3 text-xs text-gray-600 transition hover:pl-2 hover:text-[#193b2b]"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>

                          {category.subcategories.length === 0 && (
                            <p className="py-3 text-xs text-gray-400">
                              Subcategories will appear here when added in
                              admin.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              {/* CMS Navigation */}
              {otherNavLinks.map((link) => (
                <li key={link.name} className="group relative">
                  <Link
                    to={link.path}
                    className={`block rounded-lg px-3 py-2 transition ${
                      isActive(link.path)
                        ? 'font-semibold text-[#193b2b]'
                        : 'text-gray-600 hover:text-[#193b2b]'
                    }`}
                  >
                    {link.name}
                  </Link>

                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#193b2b] transition-all ${
                      isActive(link.path)
                        ? 'w-7'
                        : 'w-0 group-hover:w-7'
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 top-[108px] z-40 bg-black/30 md:hidden"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-[108px] z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : 'pointer-events-none -translate-x-full'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >

        {/* Mobile Search */}
        <div className="shrink-0 border-b border-gray-100 p-4">
          <form onSubmit={submitSearch} className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plants, pots, products..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#193b2b] focus:bg-white focus:ring-2 focus:ring-[#193b2b]/10"
            />
          </form>
        </div>

        {/* Scrollable Menu Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">

          {/* Login */}
          {!user && (
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-[#193b2b] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#274d39]"
            >
              <User className="h-4 w-4" />
              Login / Signup
            </Link>
          )}

          {/* Home */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`mb-2 flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive('/')
                ? 'bg-[#193b2b]/10 text-[#193b2b]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Home
          </Link>

          {/* Categories Accordion */}
          {storeCategories.length > 0 && (
            <div className="mb-3">
              <p className="mb-2 px-4 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Shop Categories
              </p>

              <div className="space-y-2">
                {storeCategories.map((category) => {
                  const categoryId =
                    category.id || category.slug || category.name;

                  const categoryPath = `/category/${encodeURIComponent(
                    category.slug || category.name
                  )}`;

                  const isExpanded = expandedCategory === categoryId;

                  return (
                    <div
                      key={`mobile-${categoryId}`}
                      className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50/70"
                    >
                      <div className="flex items-center justify-between gap-2">

                        <Link
                          to={categoryPath}
                          onClick={closeMobileMenu}
                          className="min-w-0 flex-1 px-4 py-3.5 text-sm font-semibold text-[#193b2b]"
                        >
                          {category.name}
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleCategory(categoryId)}
                          aria-label={`${
                            isExpanded ? 'Collapse' : 'Expand'
                          } ${category.name}`}
                          aria-expanded={isExpanded}
                          className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#193b2b] transition hover:bg-[#193b2b]/10"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expandable Subcategories */}
                      <div
                        className={`grid transition-all duration-300 ${
                          isExpanded
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-gray-100 bg-white px-3 py-2">

                            <Link
                              to={categoryPath}
                              onClick={closeMobileMenu}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold text-[#193b2b] hover:bg-[#193b2b]/5"
                            >
                              Shop All {category.name}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>

                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.id || sub.slug || sub.name}
                                to={`${categoryPath}/${encodeURIComponent(
                                  sub.slug || sub.name
                                )}`}
                                onClick={closeMobileMenu}
                                className="block border-t border-gray-50 px-3 py-3 text-sm text-gray-600 transition hover:pl-4 hover:text-[#193b2b]"
                              >
                                {sub.name}
                              </Link>
                            ))}

                            {category.subcategories.length === 0 && (
                              <p className="px-3 py-3 text-xs text-gray-400">
                                No subcategories available.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other CMS Links */}
          <div className="mb-4">
            <p className="mb-2 px-4 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Explore
            </p>

            <div className="space-y-1">
              {otherNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive(link.path)
                      ? 'bg-[#193b2b]/10 text-[#193b2b]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Logged In User Links */}
          {user && (
            <div className="mb-4 border-t border-gray-100 pt-4">
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#193b2b]/5 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#193b2b] text-sm font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#193b2b]">
                    {user.name || 'My Account'}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user.email || ''}
                  </p>
                </div>
              </div>

              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                My Orders
              </Link>

              <Link
                to="/favorites"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                Favorites ({favorites.length})
              </Link>

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                My Cart ({totalItems})
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}

          {/* Bottom spacing */}
          <div className="h-6" />
        </div>

        {/* Mobile Menu Footer */}
        <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
          <p className="text-center text-[10px] font-medium tracking-wider text-gray-400">
            {settings.brand_name || 'Cityscape Greenery'} · Conscious Plant Living
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
