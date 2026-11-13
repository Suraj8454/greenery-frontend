// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, User, Search, ChevronDown, Menu, X, Leaf, Heart } from 'lucide-react';

// const Navbar = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const location = useLocation();

//   // Scroll logic: Hide on scroll down, show on scroll up
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > 80) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsVisible(false);
//         setIsMobileMenuOpen(false);
//       } else {
//         setIsVisible(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsSearchOpen(false);
//   }, [location]);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Pots', path: '/pots', hasDropdown: true },
//     { name: 'Plants', path: '/plants' },
//     { name: 'Cocopeat', path: '/cocopeat' },
//     { name: 'Gardening Supplies', path: '/supplies' },
//     { name: 'Bulk Order', path: '/bulk' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
//         isVisible ? 'translate-y-0' : '-translate-y-full'
//       }`}
//     >
//       {/* ==================== TOP ANNOUNCEMENT BAR ==================== */}
//       <div className="bg-gradient-to-r from-[#1a3c2e] via-[#2d6a4f] to-[#1a3c2e] text-white text-[11px] sm:text-xs text-center py-2 font-medium tracking-widest relative overflow-hidden">
//         {/* Animated shine */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine"></div>
//         <span className="relative z-10 flex items-center justify-center gap-2">
//           <Leaf className="w-3 h-3 text-[#a3d9b1]" />
//           {settings.announcement_text && settings.announcement_text.toLowerCase() !== 'free shipping on orders above ₹1999' ? settings.announcement_text : `Free Shipping on orders above ₹${Number(settings.free_shipping_threshold || 1999).toLocaleString('en-IN')}`}
//           <Leaf className="w-3 h-3 text-[#a3d9b1]" />
//         </span>
//       </div>

//       {/* ==================== MAIN NAVBAR ==================== */}
//       <div
//         className={`transition-all duration-300 ${
//           isScrolled
//             ? 'bg-white/85 backdrop-blur-xl shadow-lg shadow-gray-200/40 border-b border-white/20'
//             : 'bg-white border-b border-gray-100'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
            
//             {/* ============ LOGO ============ */}
//             <Link to="/" className="flex items-center gap-2 cursor-pointer group shrink-0">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-[#2d6a4f]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <Leaf 
//                   className="text-[#2d6a4f] w-9 h-9 group-hover:rotate-12 transition-all duration-500 relative z-10" 
//                   strokeWidth={1.8}
//                 />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-[#1a3c2e] leading-tight tracking-tight group-hover:text-[#2d6a4f] transition-colors">
//                   Cityscape
//                 </h1>
//                 <h1 className="text-[11px] font-semibold text-[#2d6a4f] leading-tight tracking-[0.2em] uppercase">
//                   Greenery
//                 </h1>
//               </div>
//             </Link>

//             {/* ============ SEARCH BAR (Desktop) ============ */}
//             <div className="hidden lg:flex flex-1 max-w-xl mx-10 relative group">
//               <input
//                 type="text"
//                 placeholder="Search for plants, pots, cocopeat..."
//                 className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 pl-11 pr-12 focus:outline-none focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10 text-sm transition-all duration-300"
//               />
//               <Search className="absolute left-4 top-3 text-gray-400 w-4 h-4 group-focus-within:text-[#2d6a4f] transition-colors" />
              
              
//             </div>

//             {/* ============ RIGHT ICONS ============ */}
//             <div className="flex items-center gap-2 sm:gap-3">
              
//               {/* Search Icon (Mobile) */}
//               <button 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="lg:hidden w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f] transition-all"
//                 aria-label="Search"
//               >
//                 <Search className="w-5 h-5" />
//               </button>

//               {/* Wishlist (Hidden on small) */}
//               <button 
//                 className="hidden md:flex relative w-10 h-10 rounded-full hover:bg-[#eef2ed] items-center justify-center text-gray-600 hover:text-[#2d6a4f] transition-all group"
//                 aria-label="Wishlist"
//               >
//                 <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* Account */}
//               <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#eef2ed] text-gray-600 hover:text-[#2d6a4f] transition-all group">
//                 <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 <span className="text-sm font-medium">Account</span>
//               </button>

//               {/* Cart */}
//               <button className="relative w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f] transition-all group" aria-label="Cart">
//                 <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#2d6a4f] to-[#1a3c2e] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
//                   3
//                 </span>
//               </button>

//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f] transition-all"
//                 aria-label="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ============ NAVIGATION LINKS (CENTERED) ============ */}
//         <div className="hidden md:block border-t border-gray-100/70">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <ul className="flex items-center justify-center gap-1 py-2 text-sm font-medium text-gray-600">
//               {navLinks.map((link) => {
//                 const isActive = location.pathname === link.path;
//                 return (
//                   <li key={link.name} className="relative group">
//                     <Link
//                       to={link.path}
//                       className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#eef2ed] ${
//                         isActive ? 'text-[#2d6a4f] bg-[#eef2ed] font-semibold' : 'hover:text-[#2d6a4f]'
//                       }`}
//                     >
//                       {link.name}
//                       {link.hasDropdown && (
//                         <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
//                       )}
//                     </Link>
                    
//                     {/* Underline Animation */}
//                     <span
//                       className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#2d6a4f] to-[#a3d9b1] rounded-full transition-all duration-300 ${
//                         isActive ? 'w-8' : 'w-0 group-hover:w-8'
//                       }`}
//                     ></span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* ==================== MOBILE SEARCH BAR ==================== */}
//       <div
//         className={`lg:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
//           isSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="px-4 py-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for plants, pots..."
//               className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 pl-10 focus:outline-none focus:border-[#2d6a4f] focus:bg-white text-sm"
//             />
//             <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//           </div>
//         </div>
//       </div>

//       {/* ==================== MOBILE MENU ==================== */}
//       <div
//         className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-500 ease-in-out ${
//           isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="px-4 py-4 space-y-1.5">
          
//           {/* Mobile Links */}
//           {navLinks.map((link, idx) => {
//             const isActive = location.pathname === link.path;
//             return (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 style={{ transitionDelay: isMobileMenuOpen ? `${idx * 30}ms` : '0ms' }}
//                 className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
//                   isActive
//                     ? 'bg-gradient-to-r from-[#eef2ed] to-[#f4f1ea] text-[#2d6a4f] shadow-sm'
//                     : 'text-gray-600 hover:bg-gray-50 hover:text-[#2d6a4f] hover:pl-5'
//                 }`}
//               >
//                 <span>{link.name}</span>
//                 {isActive && <Leaf className="w-4 h-4 text-[#2d6a4f]" />}
//               </Link>
//             );
//           })}

//           {/* Divider */}
//           <div className="h-px bg-gray-100 my-3"></div>

//           {/* Mobile Contact Info */}
//           <div className="px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
//             <Leaf className="w-3 h-3 text-[#2d6a4f]" />
//             Free shipping above ₹1999
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, ChevronDown, Menu, X, Leaf, Heart, LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { api } from '../utils/api';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [storeCategories, setStoreCategories] = useState([]);
  const settings = useSiteSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  useEffect(() => {
    let mounted = true;
    api('/categories').then((data) => {
      // Supports both a plain array and common API response wrappers.
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
    }).catch((error) => {
      console.error('Unable to load navbar categories:', error);
      if (mounted) setStoreCategories([]);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const fallbackNavLinks = [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Blog', path: '/blog' }, { name: 'Contact', path: '/contact' }];
  const navLinks = (() => { try { const parsed = JSON.parse(settings.navigation_json || '[]'); return Array.isArray(parsed) && parsed.length ? parsed.filter(x => x.name && x.path) : fallbackNavLinks; } catch { return fallbackNavLinks; } })();

  const submitSearch = (e) => { e.preventDefault(); const term = searchTerm.trim(); navigate(term ? `/?search=${encodeURIComponent(term)}#products` : '/'); };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    // ✅ NOT fixed — normal flow, scroll ke saath chala jayega
    <header className="relative w-full z-40 bg-white">
      
      {/* Fast, seamless looping announcement bar */}
      <div className="announcement-marquee bg-gradient-to-r from-[#1a3c2e] via-[#2d6a4f] to-[#1a3c2e] text-white text-[11px] sm:text-xs py-2 font-medium tracking-widest overflow-hidden" aria-label="Store announcements">
        {(() => {
          const fallback = `Free Shipping on orders above ₹${Number(settings.free_shipping_threshold || 1999).toLocaleString('en-IN')}`;
          const messages = String(settings.announcement_text || fallback).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
          const items = messages.length ? messages : [fallback];
          return <div className="announcement-track flex w-max items-center" aria-hidden="true">
            {[...items, ...items, ...items, ...items].map((line, index) => (
              <span key={`${index}-${line}`} className="flex items-center gap-3 whitespace-nowrap px-7">
                <Leaf className="h-3 w-3 shrink-0 text-[#a3d9b1]" />{line}
              </span>
            ))}
          </div>;
        })()}
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <Leaf
                className="text-[#2d6a4f] w-8 h-8 md:w-9 md:h-9 group-hover:rotate-12 transition-all duration-500"
                strokeWidth={1.8}
              />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-[#1a3c2e] leading-tight">{settings.brand_name || 'Cityscape Greenery'}</h1>
                <h1 className="text-[10px] md:text-[11px] font-semibold text-[#2d6a4f] tracking-[0.2em] uppercase">Conscious plant living</h1>
              </div>
            </Link>

            {/* Search Desktop */}
            <form onSubmit={submitSearch} className="hidden lg:flex flex-1 max-w-xl mx-10 relative group">
              <input
                type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, pots, plants..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 pl-11 pr-12 focus:outline-none focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10 text-sm"
              />
              <button type="submit" aria-label="Search products" className="absolute right-3 top-2.5 text-gray-500 hover:text-[#2d6a4f]"><Search className="w-4 h-4" /></button>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f]"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600 hover:text-[#2d6a4f]"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2d6a4f] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-full hover:bg-[#eef2ed]"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#2d6a4f] text-white text-xs font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium hidden md:inline">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 hidden md:inline transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-[#1a3c2e] truncate">{user.email}</p>
                      </div>
                      <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef2ed]">My Orders</Link>
                      <Link to="/favorites" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef2ed]">Favorites</Link>
                      <Link to="/cart" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef2ed]">My Cart</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100 mt-1">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#eef2ed] text-gray-600 hover:text-[#2d6a4f]"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full hover:bg-[#eef2ed] flex items-center justify-center text-gray-600"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav Links Desktop */}
        <div className="hidden md:block border-t border-gray-100/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-3 py-2.5 text-sm font-medium text-gray-600">
              {/* Home always stays first */}
              <li className="relative group">
                <Link to="/" className={`px-3 py-1 rounded-lg transition-all ${location.pathname === '/' ? 'text-[#2d6a4f] font-semibold' : 'hover:text-[#2d6a4f]'}`}>Home</Link>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2d6a4f] rounded-full transition-all duration-300 ${location.pathname === '/' ? 'w-8' : 'w-0 group-hover:w-8'}`} />
              </li>

              {/* Dynamic categories immediately after Home */}
              {storeCategories.map((category) => (
                <li key={`cat-${category.id}`} className="group relative py-1">
                  <Link to={`/category/${encodeURIComponent(category.slug || category.name)}`} className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium text-gray-600 transition hover:bg-[#eef2ed] hover:text-[#2d6a4f]">
                    {category.name}<ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[min(680px,90vw)] -translate-x-1/2 translate-y-2 rounded-b-2xl border border-gray-100 bg-white p-6 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid grid-cols-[0.9fr_1.4fr] gap-6">
                      <div className="rounded-xl bg-[#eef2ed] p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78917d]">Explore collection</p>
                        <h3 className="mt-2 text-2xl font-semibold text-[#1a3c2e]">{category.name}</h3>
                        <p className="mt-2 text-xs leading-5 text-gray-600">Explore our curated collection and bring more green into your space.</p>
                        <Link to={`/category/${encodeURIComponent(category.slug || category.name)}`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#2d6a4f]">Shop all <ArrowRight className="h-3.5 w-3.5" /></Link>
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Shop by subcategory</p>
                        <div className="grid grid-cols-2 gap-x-4">
                          {(category.subcategories || []).map((sub) => (
                            <Link key={sub.id} to={`/category/${encodeURIComponent(category.slug || category.name)}/${encodeURIComponent(sub.slug || sub.name)}`} className="border-b border-gray-100 px-1 py-3 text-xs text-gray-600 transition hover:pl-2 hover:text-[#2d6a4f]">{sub.name}</Link>
                          ))}
                        </div>
                        {(!category.subcategories || category.subcategories.length === 0) && <p className="py-3 text-xs text-gray-400">Subcategories will appear here when added in admin.</p>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              {navLinks.filter((link) => link.name.toLowerCase() !== 'home').map((link) => {
                const isActive = location.pathname === link.path;
                return <li key={link.name} className="relative group"><Link to={link.path} className={`px-3 py-1 rounded-lg transition-all ${isActive ? 'text-[#2d6a4f] font-semibold' : 'hover:text-[#2d6a4f]'}`}>{link.name}</Link><span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2d6a4f] rounded-full transition-all duration-300 ${isActive ? 'w-8' : 'w-0 group-hover:w-8'}`} /></li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1.5">
          {!user && (
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-[#1a3c2e] text-white px-4 py-3 rounded-xl text-sm font-semibold mb-2"
            >
              <User className="w-4 h-4" /> Login / Signup
            </Link>
          )}
          <Link to="/" className={`block px-4 py-3 rounded-xl text-sm font-medium ${location.pathname === '/' ? 'bg-[#eef2ed] text-[#2d6a4f]' : 'text-gray-600 hover:bg-gray-50'}`}>Home</Link>
          {storeCategories.map((category) => (
            <div key={`mobile-cat-${category.id}`} className="rounded-xl bg-[#f7f9f6] overflow-hidden">
              <Link to={`/category/${encodeURIComponent(category.slug || category.name)}`} className="block px-4 py-3 text-sm font-semibold text-[#1a3c2e]">{category.name}</Link>
              {(category.subcategories || []).map((sub) => <Link key={sub.id} to={`/category/${encodeURIComponent(category.slug || category.name)}/${encodeURIComponent(sub.slug || sub.name)}`} className="block border-t border-white px-4 py-2.5 pl-7 text-sm text-gray-600">{sub.name}</Link>)}
            </div>
          ))}
          {navLinks.filter((link) => link.name.toLowerCase() !== 'home').map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-[#eef2ed] text-[#2d6a4f]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {user && (
            <>
              <div className="h-px bg-gray-100 my-2"></div>
              <Link to="/orders" className="block px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">My Orders</Link>
              <Link to="/favorites" className="block px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Favorites ({favorites.length})</Link>
              <Link to="/cart" className="block px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cart ({totalItems})</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;