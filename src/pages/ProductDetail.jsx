// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// import {
//   ShoppingCart, Heart, Star, Truck, RotateCcw, ShieldCheck,
//   ChevronRight, Minus, Plus, Share2, Leaf, CheckCircle, Tag, Sparkles,
//   PackageCheck, Award,
// } from 'lucide-react';
// import { useProducts } from '../context/ProductsContext';
// import { useCart } from '../context/CartContext';
// import { useFavorites } from '../context/FavoritesContext';
// import { useSiteSettings } from '../hooks/useSiteSettings';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { products, loading } = useProducts();
//   const product = products.find((p) => p.id === parseInt(id));

//   const settings = useSiteSettings();
//   const { addToCart } = useCart();
//   const { toggleFavorite, isFavorite } = useFavorites();
//   const favorited = product ? isFavorite(product.id) : false;
//   const reduceMotion = useReducedMotion();

//   /* ================= STATE ================= */
//   const [qty, setQty] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [addedToCart, setAddedToCart] = useState(false);

//   /* ================= DYNAMIC DATA ================= */
//   const thumbnails = useMemo(() => {
//     if (!product) return [];
//     const imgs = product.images?.length ? product.images : [product.img];
//     return imgs.filter(Boolean);
//   }, [product]);

//   const colors = useMemo(() => (product?.colors?.length ? product.colors : []), [product]);

//   const activeColor = useMemo(
//     () =>
//       colors.find(
//         (c) => String(c.hex).toLowerCase() === String(selectedColor).toLowerCase()
//       ) || colors[0],
//     [colors, selectedColor]
//   );

//   const sizes = useMemo(() => {
//     if (!product) return [];
//     if (Array.isArray(product.sizes) && product.sizes.length) {
//       return product.sizes
//         .map((s) => (typeof s === 'object' ? s.label || s.name || s.value : s))
//         .filter(Boolean)
//         .map(String);
//     }
//     if (typeof product.size === 'string' && product.size.trim()) {
//       return product.size.split(',').map((s) => s.trim()).filter(Boolean);
//     }
//     if (typeof product.sizes === 'string' && product.sizes.trim()) {
//       try {
//         const parsed = JSON.parse(product.sizes);
//         if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
//       } catch {}
//     }
//     return [];
//   }, [product]);

//   useEffect(() => {
//     if (sizes.length && !sizes.includes(selectedSize)) {
//       setSelectedSize(sizes[0]);
//     }
//   }, [sizes, selectedSize]);

//   useEffect(() => {
//     setSelectedImage(0);
//     setQty(1);
//     setSelectedSize('');
//     setSelectedColor('');
//   }, [id]);

//   /* ================= PRICE ================= */
//   const currency = settings?.currency || '₹';
//   const oldPrice =
//     product?.oldPrice || product?.original_price || product?.originalPrice || null;
//   const saveAmount = oldPrice ? Number(oldPrice) - Number(product.price) : 0;
//   const discountPercent = oldPrice
//     ? Math.round((saveAmount / Number(oldPrice)) * 100)
//     : 0;

//   const inStock = Number(product?.stock_quantity || 0) > 0;

//   /* ================= HANDLERS ================= */
//   const handleAddToCart = () => {
//     if (!inStock) return;
//     addToCart(
//       {
//         ...product,
//         selectedColor: activeColor?.hex || '',
//         colorName: activeColor?.name || '',
//         selectedSize: selectedSize || '',
//       },
//       qty
//     );
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2000);
//   };

//   const handleBuyNow = () => {
//     if (!inStock) return;
//     addToCart(
//       {
//         ...product,
//         selectedColor: activeColor?.hex || '',
//         colorName: activeColor?.name || '',
//         selectedSize: selectedSize || '',
//       },
//       qty
//     );
//     navigate('/cart');
//   };

//   const handleShare = async () => {
//     const url = window.location.href;
//     if (navigator.share) {
//       try {
//         await navigator.share({ title: product.name, url });
//       } catch {}
//     } else {
//       try {
//         await navigator.clipboard.writeText(url);
//       } catch {}
//     }
//   };

//   /* ================= LOADING / NOT FOUND ================= */
//   if (loading) {
//     return (
//       <div className="min-h-[60vh] grid place-items-center bg-[#fafaf7]">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
//         >
//           <Leaf className="w-8 h-8 text-[#2d6a4f]" />
//         </motion.div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-[60vh] grid place-items-center bg-[#fafaf7] px-4">
//         <div className="text-center">
//           <h2 className="text-2xl sm:text-3xl text-[#1a3c2e] mb-3 tracking-tight">
//             Product not found
//           </h2>
//           <p className="text-[#1a3c2e]/60 text-sm mb-6 max-w-sm mx-auto">
//             This item may have been removed or the link is broken.
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-[#1a3c2e] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2d6a4f] transition-colors"
//           >
//             Back to shop <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   /* ================= RELATED ================= */
//   const related = products
//     .filter((p) => p.id !== product.id)
//     .sort((a, b) => {
//       const aMatch = a.category === product.category ? 1 : 0;
//       const bMatch = b.category === product.category ? 1 : 0;
//       return bMatch - aMatch;
//     })
//     .slice(0, 4);

//   return (
//     <div className="bg-[#fafaf7] min-h-screen">
//       <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-6 md:py-10">

//         {/* ================= BREADCRUMB ================= */}
//         <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#1a3c2e]/50 mb-8 flex-wrap">
//           <Link to="/" className="hover:text-[#1a3c2e] transition-colors">
//             Home
//           </Link>
//           <ChevronRight className="w-3 h-3" />
//           <Link
//             to={`/category/${encodeURIComponent(product.category)}`}
//             className="hover:text-[#1a3c2e] transition-colors"
//           >
//             {product.category}
//           </Link>
//           <ChevronRight className="w-3 h-3" />
//           <span className="text-[#1a3c2e] font-medium truncate max-w-[180px] normal-case tracking-normal">
//             {product.name}
//           </span>
//         </nav>

//         {/* ================= MAIN GRID ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

//           {/* ============ LEFT: GALLERY ============ */}
//           <div className="flex flex-col-reverse md:flex-row gap-3 lg:sticky lg:top-24 lg:self-start">
//             {thumbnails.length > 1 && (
//               <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:max-h-[560px] md:overflow-y-auto scrollbar-thin">
//                 {thumbnails.map((thumb, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 bg-[#f0efe9] ${
//                       selectedImage === idx
//                         ? 'border-[#1a3c2e] shadow-md'
//                         : 'border-transparent hover:border-[#1a3c2e]/30'
//                     }`}
//                   >
//                     <img
//                       src={thumb}
//                       alt={`thumb-${idx}`}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex-1 relative group">
//               <div className="relative rounded-3xl overflow-hidden bg-[#f0efe9] aspect-[4/5] shadow-[0_4px_24px_rgba(26,60,46,0.06)]">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     src={thumbnails[Math.min(selectedImage, thumbnails.length - 1)] || product.img}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
//                   />
//                 </AnimatePresence>

//                 {product.tag && (
//                   <span
//                     className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm ${
//                       product.tag === 'Bestseller'
//                         ? 'bg-[#c2410c] text-white'
//                         : product.tag === 'New'
//                         ? 'bg-[#1a3c2e] text-white'
//                         : 'bg-amber-500 text-white'
//                     }`}
//                   >
//                     {product.tag}
//                   </span>
//                 )}

//                 <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
//                   <button
//                     onClick={() => toggleFavorite(product)}
//                     className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 ${
//                       favorited
//                         ? 'bg-red-500 text-white'
//                         : 'bg-white/95 text-[#1a3c2e] hover:text-red-500 hover:scale-105'
//                     }`}
//                     aria-label="Toggle favorite"
//                   >
//                     <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="w-10 h-10 rounded-full bg-white/95 text-[#1a3c2e] flex items-center justify-center shadow-lg backdrop-blur-sm hover:text-[#2d6a4f] hover:scale-105 transition-all duration-200"
//                     aria-label="Share"
//                   >
//                     <Share2 className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {product.is_eco && (
//                   <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
//                     <Leaf className="w-3 h-3 text-[#2d6a4f]" />
//                     <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1a3c2e]">
//                       Eco-Friendly
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ============ RIGHT: INFO ============ */}
//           <div className="space-y-6">

//             {/* Eyebrow */}
//             <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-1.5 backdrop-blur-sm">
//               <Leaf className="w-3 h-3 text-[#2d6a4f]" />
//               <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#2d6a4f]">
//                 {product.category} Collection
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-2xl md:text-3xl lg:text-[2.6rem] text-[#1a3c2e] leading-[1.15] tracking-tight font-medium">
//               {product.name}
//             </h1>

//             {/* Rating + stock */}
//             <div className="flex items-center gap-3 flex-wrap">
//               {product.rating > 0 && (
//                 <div className="flex items-center gap-1.5">
//                   <div className="flex gap-0.5">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-3.5 h-3.5 ${
//                           i < Math.floor(product.rating)
//                             ? 'fill-amber-400 text-amber-400'
//                             : 'text-[#1a3c2e]/15'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-[#1a3c2e]/60">
//                     <span className="font-semibold text-[#1a3c2e]">{product.rating}</span>{' '}
//                     ({product.reviews || 0})
//                   </span>
//                 </div>
//               )}

//               <span
//                 className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-semibold ${
//                   inStock
//                     ? 'text-[#2d6a4f] bg-[#2d6a4f]/10'
//                     : 'text-rose-700 bg-rose-50'
//                 }`}
//               >
//                 {inStock ? `${product.stock_quantity} in stock` : 'Out of stock'}
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex items-baseline gap-3 flex-wrap pb-5 border-b border-[#1a3c2e]/10">
//               <span className="text-2xl md:text-3xl font-semibold text-[#1a3c2e] tabular-nums">
//                 {currency}
//                 {Number(product.price).toLocaleString('en-IN')}
//               </span>
//               {oldPrice && saveAmount > 0 && (
//                 <>
//                   <span className="text-sm text-[#1a3c2e]/40 line-through tabular-nums">
//                     {currency}
//                     {Number(oldPrice).toLocaleString('en-IN')}
//                   </span>
//                   <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-[#2d6a4f] bg-[#2d6a4f]/10 px-2 py-1 rounded-md">
//                     Save {currency}
//                     {saveAmount.toLocaleString('en-IN')}
//                   </span>
//                 </>
//               )}
//               {discountPercent > 0 && (
//                 <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-white bg-[#c2410c] px-2 py-1 rounded-md">
//                   {discountPercent}% OFF
//                 </span>
//               )}
//             </div>

//             {/* Description */}
//             {product.desc && (
//               <p className="text-[#1a3c2e]/70 text-sm leading-relaxed">
//                 {product.desc}
//               </p>
//             )}

//             {/* Info blocks */}
//             {product.features && (
//               <InfoBlock title="Product features" content={product.features} list />
//             )}
//             {product.benefits && (
//               <InfoBlock title="Benefits" content={product.benefits} list />
//             )}
//             {product.how_to_use && (
//               <InfoBlock title="How to use & care" content={product.how_to_use} />
//             )}

//             {/* WhatsApp CTA */}
//             {settings.whatsapp_number && (
//               <a
//                 href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}?text=${encodeURIComponent(
//                   `Hi, I want to know more about ${product.name}`
//                 )}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2d6a4f] text-[#2d6a4f] px-4 py-2.5 text-sm font-semibold hover:bg-[#2d6a4f]/5 transition-colors"
//               >
//                 Ask about this product on WhatsApp
//               </a>
//             )}

//             {/* ===== SIZE ===== */}
//             {sizes.length > 0 && (
//               <div>
//                 <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3">
//                   Size —{' '}
//                   <span className="text-[#1a3c2e] normal-case tracking-normal text-xs font-semibold">
//                     {selectedSize || 'Select'}
//                   </span>
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 text-xs rounded-lg border transition-all duration-200 font-medium ${
//                         selectedSize === size
//                           ? 'border-[#1a3c2e] bg-[#1a3c2e] text-white shadow-sm'
//                           : 'border-[#1a3c2e]/15 text-[#1a3c2e]/70 hover:border-[#1a3c2e]/40 hover:bg-[#1a3c2e]/[0.02]'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ===== COLOR ===== */}
//             {colors.length > 0 && (
//               <div>
//                 <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3">
//                   Color —{' '}
//                   <span className="text-[#1a3c2e] normal-case tracking-normal text-xs font-semibold">
//                     {activeColor?.name || 'Select'}
//                   </span>
//                 </h4>
//                 <div className="flex gap-2 flex-wrap">
//                   {colors.map((color) => {
//                     const isActive = (selectedColor || activeColor?.hex) === color.hex;
//                     return (
//                       <button
//                         key={color.hex}
//                         onClick={() => setSelectedColor(color.hex)}
//                         className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
//                           isActive
//                             ? 'ring-2 ring-offset-2 ring-[#1a3c2e] scale-105'
//                             : 'ring-1 ring-[#1a3c2e]/15 hover:ring-[#1a3c2e]/40 hover:scale-105'
//                         }`}
//                         style={{ backgroundColor: color.hex }}
//                         aria-label={color.name}
//                         title={color.name}
//                       >
//                         {isActive && (
//                           <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Qty + Add */}
//             <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
//               <div className="flex items-center justify-between border border-[#1a3c2e]/15 rounded-xl px-1 bg-white min-w-[130px] h-[52px]">
//                 <button
//                   onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
//                   className="p-3 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
//                   aria-label="Decrease quantity"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-2 font-semibold text-[#1a3c2e] text-sm tabular-nums">
//                   {qty}
//                 </span>
//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   className="p-3 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
//                   aria-label="Increase quantity"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               <button
//                 onClick={handleAddToCart}
//                 disabled={!inStock}
//                 className={`flex-1 h-[52px] rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
//                   !inStock
//                     ? 'bg-[#1a3c2e]/30 text-white cursor-not-allowed'
//                     : addedToCart
//                     ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20'
//                     : 'bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white hover:shadow-lg hover:shadow-[#2d6a4f]/20'
//                 }`}
//               >
//                 {addedToCart ? (
//                   <>
//                     <CheckCircle className="w-4 h-4" /> Added!
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingCart className="w-4 h-4" /> Add to cart
//                   </>
//                 )}
//               </button>
//             </div>

//             <button
//               onClick={handleBuyNow}
//               disabled={!inStock}
//               className="w-full h-[52px] border border-[#1a3c2e] text-[#1a3c2e] hover:bg-[#1a3c2e] hover:text-white rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               Buy it now
//             </button>

//             {/* Promo */}
//             {(settings.promo_code || settings.promo_text) && (
//               <div className="bg-gradient-to-r from-[#2d6a4f]/[0.06] to-transparent rounded-xl p-4 flex items-start gap-3 border border-[#2d6a4f]/15">
//                 <div className="w-8 h-8 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center shrink-0">
//                   <Tag className="w-4 h-4 text-[#2d6a4f]" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-[#1a3c2e]">
//                     {settings.promo_text || 'Extra discount on prepaid orders'}
//                   </p>
//                   {settings.promo_code && (
//                     <p className="text-xs text-[#1a3c2e]/60 mt-0.5">
//                       Use code{' '}
//                       <span className="font-bold text-[#2d6a4f] tracking-wider bg-[#2d6a4f]/10 px-1.5 py-0.5 rounded">
//                         {settings.promo_code}
//                       </span>{' '}
//                       at checkout
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Trust badges */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-[#1a3c2e]/10">
//               {[
//                 {
//                   icon: Truck,
//                   title: settings.shipping_title || 'Free Delivery',
//                   sub: settings.shipping_note || 'Orders above ₹1999',
//                 },
//                 {
//                   icon: RotateCcw,
//                   title: settings.returns_title || 'Easy Returns',
//                   sub: settings.returns_note || '7-day return policy',
//                 },
//                 {
//                   icon: ShieldCheck,
//                   title: settings.payment_title || 'Secure Payment',
//                   sub: settings.payment_note || '100% secure checkout',
//                 },
//               ].map((b, i) => {
//                 const Icon = b.icon;
//                 return (
//                   <div
//                     key={i}
//                     className="flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-[#1a3c2e]/[0.03] transition-colors"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center shrink-0">
//                       <Icon className="w-4 h-4 text-[#2d6a4f]" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-[11px] font-semibold text-[#1a3c2e] leading-tight">
//                         {b.title}
//                       </p>
//                       <p className="text-[10px] text-[#1a3c2e]/50 leading-tight mt-0.5">
//                         {b.sub}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* ================= RELATED ================= */}
//         {related.length > 0 && (
//           <div className="mt-20 pt-10 border-t border-[#1a3c2e]/10">
//             <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
//               <div>
//                 <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-1.5 mb-3 backdrop-blur-sm">
//                   <Sparkles className="w-3 h-3 text-[#2d6a4f]" />
//                   <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#2d6a4f]">
//                     You may also like
//                   </span>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl text-[#1a3c2e] tracking-tight font-medium">
//                   Pair it with
//                 </h2>
//               </div>
//               <Link
//                 to="/"
//                 className="group text-[#1a3c2e] text-sm font-medium hover:text-[#2d6a4f] flex items-center gap-2 transition-colors"
//               >
//                 View all{' '}
//                 <span className="w-7 h-7 rounded-full bg-[#eef2ed] group-hover:bg-[#2d6a4f] group-hover:text-white flex items-center justify-center transition-colors">
//                   <ChevronRight className="w-3.5 h-3.5" />
//                 </span>
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {related.map((item, idx) => (
//                 <motion.div
//                   key={item.id}
//                   initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   transition={{
//                     duration: 0.4,
//                     delay: Math.min(idx * 0.05, 0.25),
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   <Link to={`/product/${item.id}`} className="group block">
//                     <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#f0efe9] ring-1 ring-black/5 group-hover:ring-[#c9ddc9] transition-all duration-300">
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
//                       />
//                     </div>
//                     <div className="pt-3">
//                       <h3 className="text-[13px] font-medium text-[#1a3c2e] group-hover:text-[#2d6a4f] transition-colors line-clamp-1">
//                         {item.name}
//                       </h3>
//                       <p className="text-sm font-semibold text-[#1a3c2e] mt-1 tabular-nums">
//                         {currency}
//                         {Number(item.price).toLocaleString('en-IN')}
//                       </p>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ============================================================
//    InfoBlock
//    ============================================================ */
// const InfoBlock = ({ title, content, list }) => {
//   const items = list
//     ? String(content)
//         .split(/\r?\n/)
//         .map((s) => s.trim())
//         .filter(Boolean)
//     : null;

//   return (
//     <section className="rounded-2xl border border-[#1a3c2e]/8 bg-white p-4 shadow-[0_2px_8px_rgba(26,60,46,0.03)]">
//       <h3 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3">
//         {title}
//       </h3>
//       {list ? (
//         <ul className="space-y-1.5 text-sm text-[#1a3c2e]/75 leading-relaxed">
//           {items.map((line, i) => (
//             <li key={i} className="flex gap-2">
//               <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-2 shrink-0" />
//               <span>{line}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-sm text-[#1a3c2e]/75 leading-relaxed whitespace-pre-line">
//           {content}
//         </p>
//       )}
//     </section>
//   );
// };

// export default ProductDetail;


import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion
} from 'framer-motion';

import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Leaf,
  CheckCircle,
  Tag,
  Sparkles,
  PackageCheck,
  ArrowLeft,
  MessageCircle,
  X,
  Copy,
  BadgeCheck
} from 'lucide-react';

import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useSiteSettings } from '../hooks/useSiteSettings';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products = [], loading } = useProducts();
  const settings = useSiteSettings();

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const reduceMotion = useReducedMotion();

  // ==========================================
  // PRODUCT
  // ==========================================

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const favorited = product
    ? isFavorite(product.id)
    : false;


  // ==========================================
  // STATES
  // ==========================================

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const [addedToCart, setAddedToCart] = useState(false);
  const [shareMessage, setShareMessage] = useState(false);


  // ==========================================
  // PRODUCT IMAGES
  // ==========================================

  const thumbnails = useMemo(() => {

    if (!product) return [];

    const images = Array.isArray(product.images)
      ? product.images
      : [];

    const allImages = images.length
      ? images
      : [product.img];

    return allImages.filter(Boolean);

  }, [product]);


  // ==========================================
  // COLORS
  // ==========================================

  const colors = useMemo(() => {

    if (!product) return [];

    return Array.isArray(product.colors)
      ? product.colors
      : [];

  }, [product]);


  const activeColor = useMemo(() => {

    return (
      colors.find(
        (color) =>
          String(color.hex).toLowerCase() ===
          String(selectedColor).toLowerCase()
      ) || colors[0]
    );

  }, [colors, selectedColor]);


  // ==========================================
  // SIZES
  // ==========================================

  const sizes = useMemo(() => {

    if (!product) return [];

    if (Array.isArray(product.sizes) && product.sizes.length) {

      return product.sizes
        .map((size) =>
          typeof size === 'object'
            ? size.label || size.name || size.value
            : size
        )
        .filter(Boolean)
        .map(String);

    }

    if (
      typeof product.size === 'string' &&
      product.size.trim()
    ) {

      return product.size
        .split(',')
        .map((size) => size.trim())
        .filter(Boolean);

    }

    if (
      typeof product.sizes === 'string' &&
      product.sizes.trim()
    ) {

      try {

        const parsed = JSON.parse(product.sizes);

        if (Array.isArray(parsed)) {
          return parsed
            .map((size) =>
              typeof size === 'object'
                ? size.label || size.name || size.value
                : size
            )
            .filter(Boolean)
            .map(String);
        }

      } catch {
        return product.sizes
          .split(',')
          .map((size) => size.trim())
          .filter(Boolean);
      }

    }

    return [];

  }, [product]);


  useEffect(() => {

    if (sizes.length && !sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0]);
    }

  }, [sizes, selectedSize]);


  // ==========================================
  // RESET ON PRODUCT CHANGE
  // ==========================================

  useEffect(() => {

    setSelectedImage(0);
    setQty(1);
    setSelectedSize('');
    setSelectedColor('');
    setAddedToCart(false);

  }, [id]);


  // ==========================================
  // PRICE AND STOCK
  // ==========================================

  const currency = settings?.currency || '₹';

  const oldPrice =
    product?.oldPrice ||
    product?.original_price ||
    product?.originalPrice ||
    null;

  const currentPrice = Number(product?.price) || 0;

  const previousPrice = Number(oldPrice) || 0;

  const saveAmount = previousPrice > currentPrice
    ? previousPrice - currentPrice
    : 0;

  const discountPercent = previousPrice > currentPrice
    ? Math.round(
        (saveAmount / previousPrice) * 100
      )
    : 0;

  const stockQuantity = Number(
    product?.stock_quantity ?? 0
  );

  const inStock = stockQuantity > 0;

  const maximumQty = Math.max(1, stockQuantity);


  // ==========================================
  // PRODUCT CATEGORY
  // ==========================================

  const categoryName =
    typeof product?.category === 'object'
      ? product.category?.name || product.category?.slug || 'Plants'
      : product?.category || 'Plants';

  const categorySlug =
    typeof product?.category === 'object'
      ? product.category?.slug || product.category?.name || 'Plants'
      : product?.category || 'Plants';


  // ==========================================
  // CART ITEM
  // ==========================================

  const getCartProduct = () => ({
    ...product,
    selectedColor: activeColor?.hex || '',
    colorName: activeColor?.name || '',
    selectedSize: selectedSize || ''
  });


  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {

    if (!inStock) return;

    addToCart(getCartProduct(), qty);

    setAddedToCart(true);

    window.setTimeout(() => {
      setAddedToCart(false);
    }, 2200);

  };


  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {

    if (!inStock) return;

    addToCart(getCartProduct(), qty);

    navigate('/cart');

  };


  // ==========================================
  // SHARE PRODUCT
  // ==========================================

  const handleShare = async () => {

    const url = window.location.href;

    if (navigator.share) {

      try {

        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url
        });

      } catch {
        // User cancelled share
      }

    } else {

      try {

        await navigator.clipboard.writeText(url);

        setShareMessage(true);

        window.setTimeout(() => {
          setShareMessage(false);
        }, 2000);

      } catch {
        // Clipboard unavailable
      }

    }

  };


  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  const related = useMemo(() => {

    if (!product) return [];

    return products
      .filter((item) => String(item.id) !== String(product.id))
      .sort((a, b) => {

        const aCategory =
          typeof a.category === 'object'
            ? a.category?.name
            : a.category;

        const bCategory =
          typeof b.category === 'object'
            ? b.category?.name
            : b.category;

        const aMatch =
          String(aCategory).toLowerCase() ===
          String(categoryName).toLowerCase();

        const bMatch =
          String(bCategory).toLowerCase() ===
          String(categoryName).toLowerCase();

        return Number(bMatch) - Number(aMatch);

      })
      .slice(0, 4);

  }, [products, product, categoryName]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-[65vh] grid place-items-center bg-[#fcfbf7]">

        <div className="text-center">

          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#eaf2e9]"
          >

            <Leaf className="h-7 w-7 text-[#2d6a4f]" />

          </motion.div>

          <p className="text-sm font-medium text-[#526457]">
            Preparing your product...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!product) {

    return (

      <div className="min-h-[65vh] grid place-items-center bg-[#fcfbf7] px-5">

        <div className="max-w-sm text-center">

          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-[#eaf2e9]">

            <PackageCheck className="h-9 w-9 text-[#2d6a4f]" />

          </div>

          <h2 className="font-serif text-3xl font-semibold text-[#1a3c2e]">
            Product not found
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#1a3c2e]/60">
            This product may have been removed or the link may be incorrect.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a3c2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4f]"
          >

            <ArrowLeft className="h-4 w-4" />

            Back to shop

          </Link>

        </div>

      </div>

    );

  }


  // ==========================================
  // IMAGE
  // ==========================================

  const currentImage =
    thumbnails[selectedImage] ||
    product.img ||
    '';


  // ==========================================
  // TRUST ITEMS
  // ==========================================

  const trustItems = [

    {
      icon: Truck,
      title: settings?.shipping_title || 'Careful Delivery',
      description: settings?.shipping_note || 'Delivered with care'
    },

    {
      icon: RotateCcw,
      title: settings?.returns_title || 'Easy Returns',
      description: settings?.returns_note || 'Simple return process'
    },

    {
      icon: ShieldCheck,
      title: settings?.payment_title || 'Secure Payment',
      description: settings?.payment_note || 'Safe checkout'
    }

  ];


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="min-h-screen overflow-hidden bg-[#fcfbf7] pb-24 text-[#1a3c2e] lg:pb-0">


      {/* ======================================
          BREADCRUMB
      ======================================= */}

      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-8">

        <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#1a3c2e]/45 sm:text-xs">

          <Link
            to="/"
            className="transition hover:text-[#2d6a4f]"
          >
            Home
          </Link>

          <ChevronRight className="h-3 w-3" />

          <Link
            to={`/category/${encodeURIComponent(categorySlug)}`}
            className="transition hover:text-[#2d6a4f]"
          >
            {categoryName}
          </Link>

          <ChevronRight className="h-3 w-3" />

          <span className="max-w-[180px] truncate font-semibold text-[#1a3c2e]">
            {product.name}
          </span>

        </nav>

      </div>



      {/* ======================================
          MAIN PRODUCT SECTION
      ======================================= */}

      <main className="mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-10 lg:pb-20 lg:pt-10">

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">


          {/* ==================================
              LEFT PRODUCT GALLERY
          =================================== */}

          <section className="min-w-0 lg:sticky lg:top-24">


            {/* Main image */}
            <div className="relative overflow-hidden rounded-[24px] bg-[#edf0e9] shadow-[0_12px_40px_rgba(26,60,46,0.07)] sm:rounded-[30px]">

              <div className="relative aspect-[4/4.4] w-full sm:aspect-[4/4.2] lg:aspect-[4/4.5]">

                {currentImage ? (

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={product.name}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, scale: 1.035 }
                      }
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                  </AnimatePresence>

                ) : (

                  <div className="grid h-full place-items-center">

                    <Leaf className="h-16 w-16 text-[#2d6a4f]/30" />

                  </div>

                )}


                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/[0.04]" />


                {/* Back button */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                  className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/90 text-[#1a3c2e] shadow-lg backdrop-blur-md transition hover:scale-105 sm:left-5 sm:top-5"
                >

                  <ArrowLeft className="h-4 w-4" />

                </button>


                {/* Product tag */}
                {product.tag && (

                  <span
                    className={`absolute left-16 top-4 rounded-full px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg backdrop-blur-md sm:left-20 sm:top-5 ${
                      product.tag === 'Bestseller'
                        ? 'bg-[#1a3c2e] text-white'
                        : product.tag === 'New'
                          ? 'bg-[#2d6a4f] text-white'
                          : 'bg-white text-[#1a3c2e]'
                    }`}
                  >
                    {product.tag}
                  </span>

                )}


                {/* Image actions */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 sm:right-5 sm:top-5">

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    aria-label="Toggle favorite"
                    className={`grid h-10 w-10 place-items-center rounded-full shadow-lg backdrop-blur-md transition hover:scale-105 ${
                      favorited
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/95 text-[#1a3c2e] hover:text-rose-500'
                    }`}
                  >

                    <Heart
                      className={`h-4 w-4 ${
                        favorited ? 'fill-current' : ''
                      }`}
                    />

                  </button>


                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share product"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#1a3c2e] shadow-lg backdrop-blur-md transition hover:scale-105 hover:text-[#2d6a4f]"
                  >

                    {shareMessage ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}

                  </button>

                </div>


                {/* Eco badge */}
                {product.is_eco && (

                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5">

                    <Leaf className="h-3.5 w-3.5 text-[#2d6a4f]" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#1a3c2e]">
                      Eco Friendly
                    </span>

                  </div>

                )}


                {/* Image counter */}
                {thumbnails.length > 1 && (

                  <div className="absolute bottom-4 right-4 rounded-full bg-[#1a3c2e]/80 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:bottom-5 sm:right-5">
                    {selectedImage + 1} / {thumbnails.length}
                  </div>

                )}

              </div>

            </div>



            {/* Thumbnails */}
            {thumbnails.length > 1 && (

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

                {thumbnails.map((image, index) => (

                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#edf0e9] transition sm:h-[84px] sm:w-[84px] ${
                      selectedImage === index
                        ? 'border-[#2d6a4f] shadow-md'
                        : 'border-transparent opacity-70 hover:border-[#a3d9b1] hover:opacity-100'
                    }`}
                  >

                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    {selectedImage === index && (
                      <div className="absolute inset-0 border-2 border-[#2d6a4f]/20" />
                    )}

                  </button>

                ))}

              </div>

            )}



            {/* Gallery note */}
            <div className="mt-4 hidden items-center justify-center gap-2 text-[11px] text-[#1a3c2e]/45 sm:flex">

              <Sparkles className="h-3.5 w-3.5 text-[#2d6a4f]" />

              Beautifully selected for your space

            </div>

          </section>



          {/* ==================================
              RIGHT PRODUCT INFORMATION
          =================================== */}

          <section className="min-w-0">


            {/* Category label */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white px-3.5 py-2">

              <Leaf className="h-3.5 w-3.5 text-[#2d6a4f]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
                {categoryName} Collection
              </span>

            </div>


            {/* Product name */}
            <h1 className="max-w-2xl font-serif text-[32px] font-semibold leading-[1.12] tracking-tight text-[#1a3c2e] sm:text-4xl lg:text-[48px]">
              {product.name}
            </h1>


            {/* Rating and stock */}
            <div className="mt-5 flex flex-wrap items-center gap-3">

              {Number(product.rating) > 0 && (

                <div className="flex items-center gap-2">

                  <div className="flex items-center gap-0.5">

                    {[1, 2, 3, 4, 5].map((number) => (

                      <Star
                        key={number}
                        className={`h-3.5 w-3.5 ${
                          number <= Math.floor(Number(product.rating))
                            ? 'fill-[#d6a84f] text-[#d6a84f]'
                            : 'text-[#1a3c2e]/15'
                        }`}
                      />

                    ))}

                  </div>

                  <span className="text-xs font-bold text-[#1a3c2e]">
                    {product.rating}
                  </span>

                  <span className="text-xs text-[#1a3c2e]/45">
                    ({product.reviews || 0} reviews)
                  </span>

                </div>

              )}


              {Number(product.rating) > 0 && (
                <span className="h-4 w-px bg-[#1a3c2e]/15" />
              )}


              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${
                  inStock
                    ? 'bg-[#eaf4eb] text-[#2d6a4f]'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >

                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    inStock ? 'bg-[#2d6a4f]' : 'bg-rose-500'
                  }`}
                />

                {inStock
                  ? `${stockQuantity} available`
                  : 'Currently unavailable'}

              </span>

            </div>



            {/* Price section */}
            <div className="mt-7 border-b border-[#e6ebe4] pb-7">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-bold tracking-tight text-[#1a3c2e] sm:text-4xl">
                  {currency}
                  {currentPrice.toLocaleString('en-IN')}
                </span>


                {saveAmount > 0 && (

                  <>

                    <span className="text-base text-[#1a3c2e]/40 line-through">
                      {currency}
                      {previousPrice.toLocaleString('en-IN')}
                    </span>

                    <span className="rounded-full bg-[#eaf4eb] px-3 py-1.5 text-[10px] font-extrabold text-[#2d6a4f]">
                      Save {currency}
                      {saveAmount.toLocaleString('en-IN')}
                    </span>

                  </>

                )}

              </div>


              {discountPercent > 0 && (

                <p className="mt-2 text-xs font-semibold text-[#2d6a4f]">
                  You save {discountPercent}% on this product
                </p>

              )}


              <p className="mt-2 text-[11px] text-[#1a3c2e]/45">
                Inclusive of applicable taxes
              </p>

            </div>



            {/* Description */}
            {product.desc && (

              <div className="py-6">

                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a3c2e]/50">
                  About this product
                </h3>

                <p className="text-sm leading-7 text-[#526457]">
                  {product.desc}
                </p>

              </div>

            )}



            {/* Features */}
            {product.features && (

              <InfoBlock
                title="Product features"
                content={product.features}
                list
              />

            )}


            {/* Benefits */}
            {product.benefits && (

              <InfoBlock
                title="Benefits"
                content={product.benefits}
                list
              />

            )}


            {/* How to use */}
            {product.how_to_use && (

              <InfoBlock
                title="How to use & care"
                content={product.how_to_use}
              />

            )}



            {/* WhatsApp */}
            {settings?.whatsapp_number && (

              <a
                href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hi, I want to know more about ${product.name}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#b8d5c0] bg-[#edf6ee] px-4 py-3.5 text-xs font-bold text-[#22613d] transition hover:border-[#2d6a4f] hover:bg-[#e4f1e5]"
              >

                <MessageCircle className="h-4 w-4" />

                Have a question? Chat with us

              </a>

            )}



            {/* ==================================
                SIZE SELECTOR
            =================================== */}

            {sizes.length > 0 && (

              <div className="mt-7">

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a3c2e]/55">
                    Select size
                  </h3>

                  <span className="text-xs font-semibold text-[#2d6a4f]">
                    {selectedSize}
                  </span>

                </div>


                <div className="flex flex-wrap gap-2">

                  {sizes.map((size) => (

                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[65px] rounded-xl border px-4 py-3 text-xs font-semibold transition ${
                        selectedSize === size
                          ? 'border-[#1a3c2e] bg-[#1a3c2e] text-white shadow-md'
                          : 'border-[#dce5da] bg-white text-[#526457] hover:border-[#2d6a4f] hover:text-[#1a3c2e]'
                      }`}
                    >

                      {size}

                    </button>

                  ))}

                </div>

              </div>

            )}



            {/* ==================================
                COLOR SELECTOR
            =================================== */}

            {colors.length > 0 && (

              <div className="mt-7">

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a3c2e]/55">
                    Select color
                  </h3>

                  <span className="text-xs font-semibold text-[#2d6a4f]">
                    {activeColor?.name || 'Select color'}
                  </span>

                </div>


                <div className="flex flex-wrap gap-4">

                  {colors.map((color) => {

                    const isActive =
                      String(selectedColor || activeColor?.hex) ===
                      String(color.hex);

                    return (

                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => setSelectedColor(color.hex)}
                        aria-label={color.name}
                        title={color.name}
                        className={`relative grid h-9 w-9 place-items-center rounded-full transition ${
                          isActive
                            ? 'ring-2 ring-[#1a3c2e] ring-offset-4'
                            : 'ring-1 ring-black/10 hover:scale-110'
                        }`}
                        style={{
                          backgroundColor: color.hex
                        }}
                      >

                        {isActive && (

                          <CheckCircle className="h-4 w-4 text-white drop-shadow-md" />

                        )}

                      </button>

                    );

                  })}

                </div>

              </div>

            )}



            {/* ==================================
                QUANTITY AND CART
            =================================== */}

            <div className="mt-8 border-t border-[#e6ebe4] pt-7">


              {/* Quantity heading */}
              <div className="mb-3 flex items-center justify-between">

                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a3c2e]/55">
                  Quantity
                </h3>

                <span className="text-[10px] text-[#1a3c2e]/45">
                  {inStock
                    ? `Maximum ${maximumQty} available`
                    : 'Out of stock'}
                </span>

              </div>


              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Quantity selector */}
                <div className="flex h-[54px] items-center justify-between rounded-xl border border-[#dce5da] bg-white px-2 sm:w-[145px] sm:shrink-0">

                  <button
                    type="button"
                    onClick={() =>
                      setQty((previous) =>
                        Math.max(1, previous - 1)
                      )
                    }
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                    className="grid h-10 w-10 place-items-center rounded-lg text-[#1a3c2e] transition hover:bg-[#edf4ed] disabled:cursor-not-allowed disabled:opacity-30"
                  >

                    <Minus className="h-4 w-4" />

                  </button>


                  <span className="min-w-8 text-center text-sm font-bold tabular-nums text-[#1a3c2e]">
                    {qty}
                  </span>


                  <button
                    type="button"
                    onClick={() =>
                      setQty((previous) =>
                        Math.min(maximumQty, previous + 1)
                      )
                    }
                    disabled={!inStock || qty >= maximumQty}
                    aria-label="Increase quantity"
                    className="grid h-10 w-10 place-items-center rounded-lg text-[#1a3c2e] transition hover:bg-[#edf4ed] disabled:cursor-not-allowed disabled:opacity-30"
                  >

                    <Plus className="h-4 w-4" />

                  </button>

                </div>



                {/* Add to cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex h-[54px] flex-1 items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-bold transition-all duration-300 ${
                    !inStock
                      ? 'cursor-not-allowed bg-gray-300 text-white'
                      : addedToCart
                        ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20'
                        : 'bg-[#1a3c2e] text-white shadow-lg shadow-[#1a3c2e]/10 hover:-translate-y-0.5 hover:bg-[#2d6a4f] hover:shadow-xl'
                  }`}
                >

                  {addedToCart ? (

                    <>
                      <CheckCircle className="h-5 w-5" />
                      Added to cart
                    </>

                  ) : (

                    <>
                      <ShoppingCart className="h-5 w-5" />

                      {inStock ? 'Add to cart' : 'Out of stock'}

                    </>

                  )}

                </button>

              </div>



              {/* Buy now */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!inStock}
                className="mt-3 flex h-[54px] w-full items-center justify-center gap-2 rounded-xl border border-[#1a3c2e] bg-transparent text-sm font-bold text-[#1a3c2e] transition hover:bg-[#1a3c2e] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >

                Buy it now

                <ChevronRight className="h-4 w-4" />

              </button>

            </div>



            {/* ==================================
                PROMO BANNER
            =================================== */}

            {(settings?.promo_code || settings?.promo_text) && (

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#dce9dc] bg-gradient-to-br from-[#edf5ec] to-white p-4 sm:p-5">

                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1a3c2e] text-white">

                  <Tag className="h-4 w-4" />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-bold text-[#1a3c2e]">
                    {settings.promo_text || 'Special offer for you'}
                  </p>

                  {settings.promo_code && (

                    <div className="mt-2 flex flex-wrap items-center gap-2">

                      <span className="text-xs text-[#526457]">
                        Use code:
                      </span>

                      <span className="rounded-lg border border-dashed border-[#2d6a4f]/40 bg-white px-3 py-1.5 text-xs font-extrabold tracking-wider text-[#2d6a4f]">
                        {settings.promo_code}
                      </span>

                    </div>

                  )}

                </div>

              </div>

            )}



            {/* ==================================
                TRUST BADGES
            =================================== */}

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#e6ebe4] pt-6 sm:grid-cols-3">

              {trustItems.map((item, index) => {

                const Icon = item.icon;

                return (

                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-[#e8eee8] bg-white p-3 transition hover:border-[#c7ddc9]"
                  >

                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf4ed]">

                      <Icon className="h-4 w-4 text-[#2d6a4f]" />

                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] font-bold text-[#1a3c2e]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-[#1a3c2e]/50">
                        {item.description}
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>



            {/* Small assurance */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-[#1a3c2e]/45">

              <BadgeCheck className="h-3.5 w-3.5 text-[#2d6a4f]" />

              A little more green, a little more happiness.

            </div>

          </section>

        </div>



        {/* ======================================
            RELATED PRODUCTS
        ======================================= */}

        {related.length > 0 && (

          <section className="mt-20 border-t border-[#e4eae2] pt-12 sm:mt-24 sm:pt-16">


            {/* Heading */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">

              <div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white px-3.5 py-2">

                  <Sparkles className="h-3.5 w-3.5 text-[#2d6a4f]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
                    Handpicked for you
                  </span>

                </div>

                <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1a3c2e] sm:text-4xl">
                  You may also like
                </h2>

                <p className="mt-2 text-xs text-[#1a3c2e]/50 sm:text-sm">
                  Discover more beautiful additions to your space.
                </p>

              </div>


              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] transition hover:text-[#1a3c2e]"
              >

                Explore all

                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf2e9] transition group-hover:bg-[#1a3c2e] group-hover:text-white">

                  <ChevronRight className="h-4 w-4" />

                </span>

              </Link>

            </div>



            {/* Product cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">

              {related.map((item, index) => (

                <motion.div
                  key={item.id}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07
                  }}
                >

                  <Link
                    to={`/product/${item.id}`}
                    className="group block"
                  >

                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#edf0e9]">

                      {item.img && (

                        <img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

                    </div>


                    <div className="pt-3">

                      <h3 className="line-clamp-1 text-xs font-semibold text-[#1a3c2e] transition group-hover:text-[#2d6a4f] sm:text-sm">
                        {item.name}
                      </h3>

                      <div className="mt-1.5 flex items-center justify-between gap-2">

                        <p className="text-sm font-bold text-[#1a3c2e]">
                          {currency}
                          {Number(item.price).toLocaleString('en-IN')}
                        </p>

                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#eaf2e9] text-[#2d6a4f] transition group-hover:bg-[#1a3c2e] group-hover:text-white">

                          <ChevronRight className="h-3.5 w-3.5" />

                        </span>

                      </div>

                    </div>

                  </Link>

                </motion.div>

              ))}

            </div>

          </section>

        )}

      </main>



      {/* ======================================
          MOBILE STICKY CART BAR
      ======================================= */}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e3eae1] bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(26,60,46,0.08)] backdrop-blur-xl lg:hidden">

        <div className="mx-auto flex max-w-xl items-center gap-3">

          <div className="min-w-0 flex-1">

            <p className="truncate text-[10px] font-medium text-[#1a3c2e]/50">
              {product.name}
            </p>

            <p className="mt-0.5 text-lg font-extrabold leading-tight text-[#1a3c2e]">
              {currency}
              {currentPrice.toLocaleString('en-IN')}
            </p>

          </div>


          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex h-12 min-w-[155px] items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold text-white transition ${
              !inStock
                ? 'cursor-not-allowed bg-gray-300'
                : addedToCart
                  ? 'bg-[#2d6a4f]'
                  : 'bg-[#1a3c2e] active:scale-[0.98]'
            }`}
          >

            {addedToCart ? (

              <>
                <CheckCircle className="h-4 w-4" />
                Added
              </>

            ) : (

              <>
                <ShoppingCart className="h-4 w-4" />
                {inStock ? 'Add to cart' : 'Unavailable'}
              </>

            )}

          </button>

        </div>

      </div>

    </div>

  );

};


// ==========================================
// REUSABLE INFO BLOCK
// ==========================================

const InfoBlock = ({ title, content, list = false }) => {

  const items = useMemo(() => {

    if (!list) return [];

    if (Array.isArray(content)) {
      return content
        .map((item) =>
          typeof item === 'object'
            ? item.name || item.title || item.value || ''
            : String(item)
        )
        .filter(Boolean);
    }

    if (typeof content === 'string') {

      try {

        const parsed = JSON.parse(content);

        if (Array.isArray(parsed)) {
          return parsed
            .map((item) =>
              typeof item === 'object'
                ? item.name || item.title || item.value || ''
                : String(item)
            )
            .filter(Boolean);
        }

      } catch {
        // Treat as plain text
      }

      return content
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

    }

    return [];

  }, [content, list]);


  if (!content) return null;


  return (

    <section className="mt-4 rounded-2xl border border-[#e6ebe4] bg-white p-4 sm:p-5">

      <h3 className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1a3c2e]/60">

        <Leaf className="h-3.5 w-3.5 text-[#2d6a4f]" />

        {title}

      </h3>


      {list ? (

        <ul className="space-y-2.5">

          {items.map((item, index) => (

            <li
              key={index}
              className="flex items-start gap-2.5 text-sm leading-6 text-[#526457]"
            >

              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d6a4f]" />

              <span>{item}</span>

            </li>

          ))}

        </ul>

      ) : (

        <p className="whitespace-pre-line text-sm leading-7 text-[#526457]">
          {content}
        </p>

      )}

    </section>

  );

};


export default ProductDetail;
