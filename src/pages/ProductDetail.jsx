
// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// import {
//   ShoppingCart, Heart, Star, Truck, RotateCcw, ShieldCheck,
//   ChevronRight, Minus, Plus, Share2, Leaf, CheckCircle, Tag, Sparkles,
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

//   const colors = useMemo(
//     () => (product?.colors?.length ? product.colors : []),
//     [product]
//   );

//   const activeColor = useMemo(
//     () =>
//       colors.find(
//         (c) => String(c.hex).toLowerCase() === String(selectedColor).toLowerCase()
//       ) || colors[0],
//     [colors, selectedColor]
//   );

//   /* ===== SIZES: backend se — multiple formats supported ===== */
//   const sizes = useMemo(() => {
//     if (!product) return [];

//     // 1) Proper array
//     if (Array.isArray(product.sizes) && product.sizes.length) {
//       return product.sizes
//         .map((s) => (typeof s === 'object' ? s.label || s.name || s.value : s))
//         .filter(Boolean)
//         .map(String);
//     }

//     // 2) Comma-separated
//     if (typeof product.size === 'string' && product.size.trim()) {
//       return product.size
//         .split(',')
//         .map((s) => s.trim())
//         .filter(Boolean);
//     }

//     // 3) JSON string like '["10 inch","12 inch"]'
//     if (typeof product.sizes === 'string' && product.sizes.trim()) {
//       try {
//         const parsed = JSON.parse(product.sizes);
//         if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
//       } catch {
//         /* ignore */
//       }
//     }

//     return [];
//   }, [product]);

//   // Auto-select first size
//   useEffect(() => {
//     if (sizes.length && !sizes.includes(selectedSize)) {
//       setSelectedSize(sizes[0]);
//     }
//   }, [sizes, selectedSize]);

//   // Reset on product change
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
//       <div className="min-h-[60vh] grid place-items-center bg-[#f4f1ea]">
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
//       <div className="min-h-[60vh] grid place-items-center bg-[#f4f1ea] px-4">
//         <div className="text-center">
//           <h2
//             className="text-3xl text-[#1a3c2e] mb-3"
//             style={{ fontFamily: 'var(--font-display)' }}
//           >
//             Product not found
//           </h2>
//           <p
//             className="text-[#1a3c2e]/60 text-sm mb-6"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             This item may have been removed or the link is broken.
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-[#1a3c2e] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2d6a4f] transition-colors"
//             style={{ fontFamily: 'var(--font-body)' }}
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
//     <div className="bg-[#f4f1ea] min-h-screen">
//       <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-6 md:py-10">

//         {/* ================= BREADCRUMB ================= */}
//         <nav
//           className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#1a3c2e]/50 mb-8 flex-wrap"
//           style={{ fontFamily: 'var(--font-body)' }}
//         >
//           <Link to="/" className="hover:text-[#1a3c2e] transition-colors">Home</Link>
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
//               <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:max-h-[520px] md:overflow-y-auto">
//                 {thumbnails.map((thumb, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`w-16 h-16 rounded-lg overflow-hidden border transition-colors duration-200 shrink-0 bg-[#e8e3d8] ${
//                       selectedImage === idx
//                         ? 'border-[#1a3c2e]'
//                         : 'border-transparent hover:border-[#1a3c2e]/30'
//                     }`}
//                   >
//                     <img src={thumb} alt={`thumb-${idx}`} className="w-full h-full object-cover" loading="lazy" />
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="flex-1 relative group">
//               <div className="relative rounded-2xl overflow-hidden bg-[#e8e3d8] aspect-[4/5]">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     initial={reduceMotion ? false : { opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.25 }}
//                     src={thumbnails[Math.min(selectedImage, thumbnails.length - 1)] || product.img}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
//                   />
//                 </AnimatePresence>

//                 {product.tag && (
//                   <span
//                     className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full shadow-md ${
//                       product.tag === 'Bestseller'
//                         ? 'bg-[#c2410c] text-white'
//                         : product.tag === 'New'
//                         ? 'bg-[#1a3c2e] text-white'
//                         : 'bg-amber-500 text-white'
//                     }`}
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     {product.tag}
//                   </span>
//                 )}

//                 <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
//                   <button
//                     onClick={() => toggleFavorite(product)}
//                     className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${
//                       favorited ? 'bg-red-500 text-white' : 'bg-white/95 text-[#1a3c2e] hover:text-red-500'
//                     }`}
//                     aria-label="Toggle favorite"
//                   >
//                     <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="w-9 h-9 rounded-full bg-white/95 text-[#1a3c2e] flex items-center justify-center shadow-md hover:text-[#2d6a4f] transition-colors duration-200"
//                     aria-label="Share"
//                   >
//                     <Share2 className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {product.is_eco && (
//                   <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
//                     <Leaf className="w-3 h-3 text-[#2d6a4f]" />
//                     <span
//                       className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1a3c2e]"
//                       style={{ fontFamily: 'var(--font-body)' }}
//                     >
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
//             <div
//               className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.3em] uppercase font-semibold"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               <span className="h-px w-6 bg-[#2d6a4f]" />
//               {product.category} Collection
//             </div>

//             {/* Title */}
//             <h1
//               className="text-2xl md:text-3xl lg:text-4xl text-[#1a3c2e] leading-[1.15] tracking-tight"
//               style={{ fontFamily: 'var(--font-display)' }}
//             >
//               {product.name}
//             </h1>

//             {/* Rating + stock */}
//             <div className="flex items-center gap-3 flex-wrap">
//               {product.rating > 0 && (
//                 <div className="flex items-center gap-1.5">
//                   <div className="flex text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-3.5 h-3.5 ${
//                           i < Math.floor(product.rating) ? 'fill-current' : 'text-[#1a3c2e]/15'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-[#1a3c2e]/60" style={{ fontFamily: 'var(--font-body)' }}>
//                     <span className="font-semibold text-[#1a3c2e]">{product.rating}</span>{' '}
//                     ({product.reviews || 0})
//                   </span>
//                 </div>
//               )}

//               <span
//                 className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-semibold ${
//                   inStock ? 'text-[#2d6a4f] bg-[#2d6a4f]/10' : 'text-rose-700 bg-rose-50'
//                 }`}
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 {inStock ? `${product.stock_quantity} in stock` : 'Out of stock'}
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex items-baseline gap-3 pb-5 border-b border-[#1a3c2e]/10">
//               <span
//                 className="text-2xl md:text-3xl font-semibold text-[#1a3c2e] tabular-nums"
//                 style={{ fontFamily: 'var(--font-mono)' }}
//               >
//                 {currency}
//                 {Number(product.price).toLocaleString('en-IN')}
//               </span>
//               {oldPrice && saveAmount > 0 && (
//                 <>
//                   <span
//                     className="text-sm text-[#1a3c2e]/40 line-through tabular-nums"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     {currency}
//                     {Number(oldPrice).toLocaleString('en-IN')}
//                   </span>
//                   <span
//                     className="text-[10px] tracking-[0.1em] uppercase font-bold text-[#2d6a4f] bg-[#2d6a4f]/10 px-2 py-1 rounded-md"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     Save {currency}
//                     {saveAmount.toLocaleString('en-IN')}
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Description */}
//             {product.desc && (
//               <p
//                 className="text-[#1a3c2e]/70 text-sm leading-relaxed"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 {product.desc}
//               </p>
//             )}

//             {/* Info blocks */}
//             {product.features && <InfoBlock title="Product features" content={product.features} list />}
//             {product.benefits && <InfoBlock title="Benefits" content={product.benefits} list />}
//             {product.how_to_use && <InfoBlock title="How to use & care" content={product.how_to_use} />}

//             {/* WhatsApp CTA */}
//             {settings.whatsapp_number && (
//               <a
//                 href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}?text=${encodeURIComponent(
//                   `Hi, I want to know more about ${product.name}`
//                 )}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2d6a4f] text-[#2d6a4f] px-4 py-2.5 text-sm font-semibold hover:bg-[#2d6a4f]/5 transition-colors"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Ask about this product on WhatsApp
//               </a>
//             )}

//             {/* ===== SIZE — auto-hide if not provided by backend ===== */}
//             {sizes.length > 0 && (
//               <div>
//                 <h4
//                   className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
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
//                       className={`px-4 py-2 text-xs rounded-lg border transition-colors duration-200 font-medium ${
//                         selectedSize === size
//                           ? 'border-[#1a3c2e] bg-[#1a3c2e] text-white'
//                           : 'border-[#1a3c2e]/15 text-[#1a3c2e]/70 hover:border-[#1a3c2e]/40'
//                       }`}
//                       style={{ fontFamily: 'var(--font-body)' }}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ===== COLOR — auto-hide if not provided ===== */}
//             {colors.length > 0 && (
//               <div>
//                 <h4
//                   className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
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
//                             ? 'ring-2 ring-offset-2 ring-[#1a3c2e]'
//                             : 'ring-1 ring-[#1a3c2e]/15 hover:ring-[#1a3c2e]/40'
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
//               <div className="flex items-center justify-between border border-[#1a3c2e]/15 rounded-xl px-1 bg-white min-w-[120px] h-[52px]">
//                 <button
//                   onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
//                   className="p-3 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
//                   aria-label="Decrease quantity"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span
//                   className="px-2 font-semibold text-[#1a3c2e] text-sm tabular-nums"
//                   style={{ fontFamily: 'var(--font-mono)' }}
//                 >
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
//                 className={`flex-1 h-[52px] rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${
//                   !inStock
//                     ? 'bg-[#1a3c2e]/30 text-white cursor-not-allowed'
//                     : addedToCart
//                     ? 'bg-[#2d6a4f] text-white'
//                     : 'bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white'
//                 }`}
//                 style={{ fontFamily: 'var(--font-body)' }}
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
//               className="w-full h-[52px] border border-[#1a3c2e] text-[#1a3c2e] hover:bg-[#1a3c2e] hover:text-white rounded-xl font-semibold text-sm transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Buy it now
//             </button>

//             {/* Promo */}
//             {(settings.promo_code || settings.promo_text) && (
//               <div className="bg-[#1a3c2e]/[0.04] rounded-xl p-4 flex items-start gap-3 border border-[#1a3c2e]/10">
//                 <Tag className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-semibold text-[#1a3c2e]" style={{ fontFamily: 'var(--font-body)' }}>
//                     {settings.promo_text || 'Extra discount on prepaid orders'}
//                   </p>
//                   {settings.promo_code && (
//                     <p className="text-xs text-[#1a3c2e]/60 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
//                       Use code{' '}
//                       <span className="font-bold text-[#2d6a4f] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
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
//                 { icon: Truck, title: settings.shipping_title || 'Free Delivery', sub: settings.shipping_note || 'Orders above ₹1999' },
//                 { icon: RotateCcw, title: settings.returns_title || 'Easy Returns', sub: settings.returns_note || '7-day return policy' },
//                 { icon: ShieldCheck, title: settings.payment_title || 'Secure Payment', sub: settings.payment_note || '100% secure checkout' },
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
//                       <p className="text-[11px] font-semibold text-[#1a3c2e] leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
//                         {b.title}
//                       </p>
//                       <p className="text-[10px] text-[#1a3c2e]/50 leading-tight mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
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
//                 <div
//                   className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <Sparkles className="w-3 h-3" />
//                   You may also like
//                 </div>
//                 <h2
//                   className="text-2xl md:text-3xl text-[#1a3c2e] tracking-tight"
//                   style={{ fontFamily: 'var(--font-display)' }}
//                 >
//                   Pair it with
//                 </h2>
//               </div>
//               <Link
//                 to="/"
//                 className="text-[#1a3c2e] text-sm font-medium hover:text-[#2d6a4f] flex items-center gap-1 transition-colors"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 View all <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {related.map((item, idx) => (
//                 <motion.div
//                   key={item.id}
//                   initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
//                 >
//                   <Link to={`/product/${item.id}`} className="group block">
//                     <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#e8e3d8]">
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
//                       />
//                     </div>
//                     <div className="pt-3">
//                       <h3
//                         className="text-[13px] font-medium text-[#1a3c2e] group-hover:text-[#2d6a4f] transition-colors line-clamp-1"
//                         style={{ fontFamily: 'var(--font-body)' }}
//                       >
//                         {item.name}
//                       </h3>
//                       <p
//                         className="text-sm font-semibold text-[#1a3c2e] mt-1 tabular-nums"
//                         style={{ fontFamily: 'var(--font-mono)' }}
//                       >
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
//     ? String(content).split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
//     : null;

//   return (
//     <section className="rounded-xl border border-[#1a3c2e]/10 bg-white/[0.5] p-4">
//       <h3
//         className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3"
//         style={{ fontFamily: 'var(--font-body)' }}
//       >
//         {title}
//       </h3>
//       {list ? (
//         <ul
//           className="space-y-1.5 text-sm text-[#1a3c2e]/75 leading-relaxed"
//           style={{ fontFamily: 'var(--font-body)' }}
//         >
//           {items.map((line, i) => (
//             <li key={i} className="flex gap-2">
//               <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-2 shrink-0" />
//               <span>{line}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p
//           className="text-sm text-[#1a3c2e]/75 leading-relaxed whitespace-pre-line"
//           style={{ fontFamily: 'var(--font-body)' }}
//         >
//           {content}
//         </p>
//       )}
//     </section>
//   );
// };

// export default ProductDetail;

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart, Heart, Star, Truck, RotateCcw, ShieldCheck,
  ChevronRight, Minus, Plus, Share2, Leaf, CheckCircle, Tag, Sparkles,
  PackageCheck, Award,
} from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useSiteSettings } from '../hooks/useSiteSettings';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === parseInt(id));

  const settings = useSiteSettings();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = product ? isFavorite(product.id) : false;
  const reduceMotion = useReducedMotion();

  /* ================= STATE ================= */
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  /* ================= DYNAMIC DATA ================= */
  const thumbnails = useMemo(() => {
    if (!product) return [];
    const imgs = product.images?.length ? product.images : [product.img];
    return imgs.filter(Boolean);
  }, [product]);

  const colors = useMemo(() => (product?.colors?.length ? product.colors : []), [product]);

  const activeColor = useMemo(
    () =>
      colors.find(
        (c) => String(c.hex).toLowerCase() === String(selectedColor).toLowerCase()
      ) || colors[0],
    [colors, selectedColor]
  );

  const sizes = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.sizes) && product.sizes.length) {
      return product.sizes
        .map((s) => (typeof s === 'object' ? s.label || s.name || s.value : s))
        .filter(Boolean)
        .map(String);
    }
    if (typeof product.size === 'string' && product.size.trim()) {
      return product.size.split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (typeof product.sizes === 'string' && product.sizes.trim()) {
      try {
        const parsed = JSON.parse(product.sizes);
        if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
      } catch {}
    }
    return [];
  }, [product]);

  useEffect(() => {
    if (sizes.length && !sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  useEffect(() => {
    setSelectedImage(0);
    setQty(1);
    setSelectedSize('');
    setSelectedColor('');
  }, [id]);

  /* ================= PRICE ================= */
  const currency = settings?.currency || '₹';
  const oldPrice =
    product?.oldPrice || product?.original_price || product?.originalPrice || null;
  const saveAmount = oldPrice ? Number(oldPrice) - Number(product.price) : 0;
  const discountPercent = oldPrice
    ? Math.round((saveAmount / Number(oldPrice)) * 100)
    : 0;

  const inStock = Number(product?.stock_quantity || 0) > 0;

  /* ================= HANDLERS ================= */
  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(
      {
        ...product,
        selectedColor: activeColor?.hex || '',
        colorName: activeColor?.name || '',
        selectedSize: selectedSize || '',
      },
      qty
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!inStock) return;
    addToCart(
      {
        ...product,
        selectedColor: activeColor?.hex || '',
        colorName: activeColor?.name || '',
        selectedSize: selectedSize || '',
      },
      qty
    );
    navigate('/cart');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {}
    }
  };

  /* ================= LOADING / NOT FOUND ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-[#fafaf7]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        >
          <Leaf className="w-8 h-8 text-[#2d6a4f]" />
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-[#fafaf7] px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl text-[#1a3c2e] mb-3 tracking-tight">
            Product not found
          </h2>
          <p className="text-[#1a3c2e]/60 text-sm mb-6 max-w-sm mx-auto">
            This item may have been removed or the link is broken.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1a3c2e] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2d6a4f] transition-colors"
          >
            Back to shop <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* ================= RELATED ================= */
  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.category === product.category ? 1 : 0;
      const bMatch = b.category === product.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 4);

  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-6 md:py-10">

        {/* ================= BREADCRUMB ================= */}
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#1a3c2e]/50 mb-8 flex-wrap">
          <Link to="/" className="hover:text-[#1a3c2e] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-[#1a3c2e] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1a3c2e] font-medium truncate max-w-[180px] normal-case tracking-normal">
            {product.name}
          </span>
        </nav>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* ============ LEFT: GALLERY ============ */}
          <div className="flex flex-col-reverse md:flex-row gap-3 lg:sticky lg:top-24 lg:self-start">
            {thumbnails.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:max-h-[560px] md:overflow-y-auto scrollbar-thin">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 bg-[#f0efe9] ${
                      selectedImage === idx
                        ? 'border-[#1a3c2e] shadow-md'
                        : 'border-transparent hover:border-[#1a3c2e]/30'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 relative group">
              <div className="relative rounded-3xl overflow-hidden bg-[#f0efe9] aspect-[4/5] shadow-[0_4px_24px_rgba(26,60,46,0.06)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={thumbnails[Math.min(selectedImage, thumbnails.length - 1)] || product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </AnimatePresence>

                {product.tag && (
                  <span
                    className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm ${
                      product.tag === 'Bestseller'
                        ? 'bg-[#c2410c] text-white'
                        : product.tag === 'New'
                        ? 'bg-[#1a3c2e] text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {product.tag}
                  </span>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 ${
                      favorited
                        ? 'bg-red-500 text-white'
                        : 'bg-white/95 text-[#1a3c2e] hover:text-red-500 hover:scale-105'
                    }`}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-white/95 text-[#1a3c2e] flex items-center justify-center shadow-lg backdrop-blur-sm hover:text-[#2d6a4f] hover:scale-105 transition-all duration-200"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {product.is_eco && (
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Leaf className="w-3 h-3 text-[#2d6a4f]" />
                    <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1a3c2e]">
                      Eco-Friendly
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============ RIGHT: INFO ============ */}
          <div className="space-y-6">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-1.5 backdrop-blur-sm">
              <Leaf className="w-3 h-3 text-[#2d6a4f]" />
              <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#2d6a4f]">
                {product.category} Collection
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-[2.6rem] text-[#1a3c2e] leading-[1.15] tracking-tight font-medium">
              {product.name}
            </h1>

            {/* Rating + stock */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.rating > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-[#1a3c2e]/15'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#1a3c2e]/60">
                    <span className="font-semibold text-[#1a3c2e]">{product.rating}</span>{' '}
                    ({product.reviews || 0})
                  </span>
                </div>
              )}

              <span
                className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-semibold ${
                  inStock
                    ? 'text-[#2d6a4f] bg-[#2d6a4f]/10'
                    : 'text-rose-700 bg-rose-50'
                }`}
              >
                {inStock ? `${product.stock_quantity} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap pb-5 border-b border-[#1a3c2e]/10">
              <span className="text-2xl md:text-3xl font-semibold text-[#1a3c2e] tabular-nums">
                {currency}
                {Number(product.price).toLocaleString('en-IN')}
              </span>
              {oldPrice && saveAmount > 0 && (
                <>
                  <span className="text-sm text-[#1a3c2e]/40 line-through tabular-nums">
                    {currency}
                    {Number(oldPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-[#2d6a4f] bg-[#2d6a4f]/10 px-2 py-1 rounded-md">
                    Save {currency}
                    {saveAmount.toLocaleString('en-IN')}
                  </span>
                </>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-white bg-[#c2410c] px-2 py-1 rounded-md">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            {product.desc && (
              <p className="text-[#1a3c2e]/70 text-sm leading-relaxed">
                {product.desc}
              </p>
            )}

            {/* Info blocks */}
            {product.features && (
              <InfoBlock title="Product features" content={product.features} list />
            )}
            {product.benefits && (
              <InfoBlock title="Benefits" content={product.benefits} list />
            )}
            {product.how_to_use && (
              <InfoBlock title="How to use & care" content={product.how_to_use} />
            )}

            {/* WhatsApp CTA */}
            {settings.whatsapp_number && (
              <a
                href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hi, I want to know more about ${product.name}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2d6a4f] text-[#2d6a4f] px-4 py-2.5 text-sm font-semibold hover:bg-[#2d6a4f]/5 transition-colors"
              >
                Ask about this product on WhatsApp
              </a>
            )}

            {/* ===== SIZE ===== */}
            {sizes.length > 0 && (
              <div>
                <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3">
                  Size —{' '}
                  <span className="text-[#1a3c2e] normal-case tracking-normal text-xs font-semibold">
                    {selectedSize || 'Select'}
                  </span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs rounded-lg border transition-all duration-200 font-medium ${
                        selectedSize === size
                          ? 'border-[#1a3c2e] bg-[#1a3c2e] text-white shadow-sm'
                          : 'border-[#1a3c2e]/15 text-[#1a3c2e]/70 hover:border-[#1a3c2e]/40 hover:bg-[#1a3c2e]/[0.02]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===== COLOR ===== */}
            {colors.length > 0 && (
              <div>
                <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3">
                  Color —{' '}
                  <span className="text-[#1a3c2e] normal-case tracking-normal text-xs font-semibold">
                    {activeColor?.name || 'Select'}
                  </span>
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => {
                    const isActive = (selectedColor || activeColor?.hex) === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color.hex)}
                        className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                          isActive
                            ? 'ring-2 ring-offset-2 ring-[#1a3c2e] scale-105'
                            : 'ring-1 ring-[#1a3c2e]/15 hover:ring-[#1a3c2e]/40 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                        title={color.name}
                      >
                        {isActive && (
                          <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Qty + Add */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
              <div className="flex items-center justify-between border border-[#1a3c2e]/15 rounded-xl px-1 bg-white min-w-[130px] h-[52px]">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="p-3 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-2 font-semibold text-[#1a3c2e] text-sm tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 h-[52px] rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  !inStock
                    ? 'bg-[#1a3c2e]/30 text-white cursor-not-allowed'
                    : addedToCart
                    ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20'
                    : 'bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white hover:shadow-lg hover:shadow-[#2d6a4f]/20'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to cart
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="w-full h-[52px] border border-[#1a3c2e] text-[#1a3c2e] hover:bg-[#1a3c2e] hover:text-white rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy it now
            </button>

            {/* Promo */}
            {(settings.promo_code || settings.promo_text) && (
              <div className="bg-gradient-to-r from-[#2d6a4f]/[0.06] to-transparent rounded-xl p-4 flex items-start gap-3 border border-[#2d6a4f]/15">
                <div className="w-8 h-8 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-[#2d6a4f]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a3c2e]">
                    {settings.promo_text || 'Extra discount on prepaid orders'}
                  </p>
                  {settings.promo_code && (
                    <p className="text-xs text-[#1a3c2e]/60 mt-0.5">
                      Use code{' '}
                      <span className="font-bold text-[#2d6a4f] tracking-wider bg-[#2d6a4f]/10 px-1.5 py-0.5 rounded">
                        {settings.promo_code}
                      </span>{' '}
                      at checkout
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-[#1a3c2e]/10">
              {[
                {
                  icon: Truck,
                  title: settings.shipping_title || 'Free Delivery',
                  sub: settings.shipping_note || 'Orders above ₹1999',
                },
                {
                  icon: RotateCcw,
                  title: settings.returns_title || 'Easy Returns',
                  sub: settings.returns_note || '7-day return policy',
                },
                {
                  icon: ShieldCheck,
                  title: settings.payment_title || 'Secure Payment',
                  sub: settings.payment_note || '100% secure checkout',
                },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-[#1a3c2e]/[0.03] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#2d6a4f]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#1a3c2e] leading-tight">
                        {b.title}
                      </p>
                      <p className="text-[10px] text-[#1a3c2e]/50 leading-tight mt-0.5">
                        {b.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RELATED ================= */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#1a3c2e]/10">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-1.5 mb-3 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-[#2d6a4f]" />
                  <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#2d6a4f]">
                    You may also like
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl text-[#1a3c2e] tracking-tight font-medium">
                  Pair it with
                </h2>
              </div>
              <Link
                to="/"
                className="group text-[#1a3c2e] text-sm font-medium hover:text-[#2d6a4f] flex items-center gap-2 transition-colors"
              >
                View all{' '}
                <span className="w-7 h-7 rounded-full bg-[#eef2ed] group-hover:bg-[#2d6a4f] group-hover:text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link to={`/product/${item.id}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#f0efe9] ring-1 ring-black/5 group-hover:ring-[#c9ddc9] transition-all duration-300">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="pt-3">
                      <h3 className="text-[13px] font-medium text-[#1a3c2e] group-hover:text-[#2d6a4f] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#1a3c2e] mt-1 tabular-nums">
                        {currency}
                        {Number(item.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   InfoBlock
   ============================================================ */
const InfoBlock = ({ title, content, list }) => {
  const items = list
    ? String(content)
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

  return (
    <section className="rounded-2xl border border-[#1a3c2e]/8 bg-white p-4 shadow-[0_2px_8px_rgba(26,60,46,0.03)]">
      <h3 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-3">
        {title}
      </h3>
      {list ? (
        <ul className="space-y-1.5 text-sm text-[#1a3c2e]/75 leading-relaxed">
          {items.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="w-1 h-1 rounded-full bg-[#2d6a4f] mt-2 shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#1a3c2e]/75 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      )}
    </section>
  );
};

export default ProductDetail;