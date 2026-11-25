// import React, { useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// import {
//   Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck,
//   Truck, Leaf, Sparkles, ChevronRight, Tag,
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { useProducts } from '../context/ProductsContext';

// const Cart = () => {
//   const { cart, removeFromCart, updateQty, subtotal, shipping, total } = useCart();
//   const { user } = useAuth();
//   const { products } = useProducts();
//   const navigate = useNavigate();
//   const reduceMotion = useReducedMotion();

//   const handleCheckout = () => {
//     if (!user) navigate('/login', { state: { from: '/checkout' } });
//     else navigate('/checkout');
//   };

//   /* ===== RELATED PRODUCTS — smart category match ===== */
//   const relatedProducts = useMemo(() => {
//     if (!Array.isArray(products) || !cart.length) return [];

//     // Cart item IDs + categories
//     const cartIds = new Set(cart.map((c) => c.id));
//     const cartCategories = new Set(
//       cart.map((c) => String(c.category || '').toLowerCase()).filter(Boolean)
//     );

//     // Score: same category = +2, other = +0. Take top 4
//     return products
//       .filter((p) => !cartIds.has(p.id))
//       .map((p) => ({
//         product: p,
//         score:
//           (cartCategories.has(String(p.category || '').toLowerCase()) ? 2 : 0) +
//           (p.rating || 0) * 0.1,
//       }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, 4)
//       .map((x) => x.product);
//   }, [products, cart]);

//   const currency = '₹';

//   /* ================= EMPTY CART ================= */
//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center px-5 py-20">
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           className="text-center max-w-sm"
//         >
//           <div className="w-20 h-20 rounded-full bg-[#1a3c2e]/[0.06] flex items-center justify-center mx-auto mb-6">
//             <ShoppingBag className="w-9 h-9 text-[#2d6a4f]" />
//           </div>
//           <h2
//             className="text-3xl md:text-4xl text-[#1a3c2e] mb-3 tracking-tight"
//             style={{ fontFamily: 'var(--font-display)' }}
//           >
//             Your bag is empty.
//           </h2>
//           <p
//             className="text-[#1a3c2e]/60 text-sm mb-8 leading-relaxed"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Add some greens to your life — they'll show up right here.
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-7 py-3 rounded-full font-semibold text-sm transition-colors group"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Continue shopping
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f4f1ea] py-8 md:py-12">
//       <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12">

//         {/* ================= HEADER ================= */}
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           className="mb-8 md:mb-10"
//         >
//           <div
//             className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             <span className="h-px w-6 bg-[#2d6a4f]" />
//             Your bag
//           </div>
//           <div className="flex items-end justify-between flex-wrap gap-3">
//             <h1
//               className="text-3xl md:text-4xl lg:text-5xl text-[#1a3c2e] leading-[1.05] tracking-tight"
//               style={{ fontFamily: 'var(--font-display)' }}
//             >
//               Shopping cart
//               <span className="text-[#a3d9b1]">.</span>
//             </h1>
//             <p
//               className="text-[#1a3c2e]/50 text-sm"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               {cart.length} {cart.length === 1 ? 'item' : 'items'}
//             </p>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

//           {/* ================= ITEMS LIST ================= */}
//           <div className="lg:col-span-2 space-y-3">
//             <AnimatePresence mode="popLayout">
//               {cart.map((item) => {
//                 const key = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
//                 return (
//                   <motion.div
//                     key={key}
//                     layout
//                     initial={reduceMotion ? false : { opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -24, transition: { duration: 0.25 } }}
//                     transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//                     className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] p-3 md:p-4 flex gap-3 md:gap-4"
//                   >
//                     {/* Image */}
//                     <Link
//                       to={`/product/${item.id}`}
//                       className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#e8e3d8] shrink-0"
//                     >
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-500"
//                       />
//                     </Link>

//                     {/* Info */}
//                     <div className="flex-1 min-w-0 flex flex-col">
//                       <div className="flex justify-between gap-2 items-start">
//                         <div className="min-w-0 flex-1">
//                           <Link
//                             to={`/product/${item.id}`}
//                             className="block text-[#1a3c2e] text-sm md:text-[15px] font-semibold hover:text-[#2d6a4f] transition-colors line-clamp-1"
//                             style={{ fontFamily: 'var(--font-body)' }}
//                           >
//                             {item.name}
//                           </Link>
//                           <p
//                             className="text-[11px] text-[#1a3c2e]/45 tracking-[0.1em] uppercase mt-0.5"
//                             style={{ fontFamily: 'var(--font-body)' }}
//                           >
//                             {item.category}
//                           </p>

//                           {/* Variant chips */}
//                           <div className="flex flex-wrap gap-2 mt-1.5">
//                             {item.colorName && (
//                               <span
//                                 className="inline-flex items-center gap-1.5 text-[10px] text-[#1a3c2e]/70 bg-[#1a3c2e]/[0.04] px-2 py-1 rounded-md"
//                                 style={{ fontFamily: 'var(--font-body)' }}
//                               >
//                                 <span
//                                   className="inline-block h-2.5 w-2.5 rounded-full border border-[#1a3c2e]/10"
//                                   style={{ backgroundColor: item.selectedColor }}
//                                 />
//                                 {item.colorName}
//                               </span>
//                             )}
//                             {item.selectedSize && (
//                               <span
//                                 className="text-[10px] text-[#1a3c2e]/70 bg-[#1a3c2e]/[0.04] px-2 py-1 rounded-md"
//                                 style={{ fontFamily: 'var(--font-body)' }}
//                               >
//                                 {item.selectedSize}
//                               </span>
//                             )}
//                           </div>
//                         </div>

//                         <button
//                           onClick={() => removeFromCart(item)}
//                           aria-label="Remove item"
//                           className="text-[#1a3c2e]/35 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors shrink-0"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>

//                       <div className="flex items-end justify-between gap-2 mt-auto pt-2">
//                         {/* Qty */}
//                         <div className="flex items-center border border-[#1a3c2e]/15 rounded-lg overflow-hidden bg-white">
//                           <button
//                             onClick={() => updateQty(item, item.qty - 1)}
//                             className="p-1.5 md:p-2 hover:bg-[#1a3c2e]/5 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
//                             aria-label="Decrease quantity"
//                           >
//                             <Minus className="w-3 h-3" />
//                           </button>
//                           <span
//                             className="px-2.5 text-xs font-semibold text-[#1a3c2e] min-w-[1.75rem] text-center tabular-nums"
//                             style={{ fontFamily: 'var(--font-mono)' }}
//                           >
//                             {item.qty}
//                           </span>
//                           <button
//                             onClick={() => updateQty(item, item.qty + 1)}
//                             className="p-1.5 md:p-2 hover:bg-[#1a3c2e]/5 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
//                             aria-label="Increase quantity"
//                           >
//                             <Plus className="w-3 h-3" />
//                           </button>
//                         </div>

//                         {/* Price */}
//                         <div className="text-right">
//                           <p
//                             className="text-sm md:text-base font-semibold text-[#1a3c2e] tabular-nums"
//                             style={{ fontFamily: 'var(--font-mono)' }}
//                           >
//                             {currency}
//                             {(item.price * item.qty).toLocaleString('en-IN')}
//                           </p>
//                           {item.qty > 1 && (
//                             <p
//                               className="text-[10px] text-[#1a3c2e]/40 tabular-nums mt-0.5"
//                               style={{ fontFamily: 'var(--font-body)' }}
//                             >
//                               {currency}
//                               {item.price.toLocaleString('en-IN')} each
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>

//             {/* Continue shopping — mobile only, below items */}
//             <Link
//               to="/"
//               className="lg:hidden inline-flex items-center gap-2 text-[#1a3c2e]/60 hover:text-[#1a3c2e] text-xs font-medium pt-2 transition-colors"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               <ChevronRight className="w-3 h-3 rotate-180" />
//               Continue shopping
//             </Link>
//           </div>

//           {/* ================= SUMMARY ================= */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//               className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] p-5 md:p-6 lg:sticky lg:top-24"
//             >
//               <h2
//                 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-4"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Order summary
//               </h2>

//               <div className="space-y-2.5 text-sm">
//                 <div className="flex justify-between items-center">
//                   <span className="text-[#1a3c2e]/60" style={{ fontFamily: 'var(--font-body)' }}>
//                     Subtotal
//                   </span>
//                   <span
//                     className="font-semibold text-[#1a3c2e] tabular-nums"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     {currency}
//                     {subtotal.toLocaleString('en-IN')}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-[#1a3c2e]/60" style={{ fontFamily: 'var(--font-body)' }}>
//                     Shipping
//                   </span>
//                   <span
//                     className="font-semibold tabular-nums"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     {shipping === 0 ? (
//                       <span className="text-[#2d6a4f]">FREE</span>
//                     ) : (
//                       `${currency}${shipping.toLocaleString('en-IN')}`
//                     )}
//                   </span>
//                 </div>

//                 <div className="border-t border-dashed border-[#1a3c2e]/15 pt-3 mt-3 flex justify-between items-baseline">
//                   <span
//                     className="text-[#1a3c2e] font-semibold text-sm"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     Total
//                   </span>
//                   <span
//                     className="font-semibold text-[#1a3c2e] text-xl tabular-nums"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     {currency}
//                     {total.toLocaleString('en-IN')}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 className="w-full mt-5 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 group"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Proceed to checkout
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//               </button>

//               {/* Trust */}
//               <div className="mt-5 pt-4 border-t border-[#1a3c2e]/10 space-y-2.5">
//                 <div
//                   className="flex items-center gap-2 text-[11px] text-[#1a3c2e]/60"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <Truck className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
//                   Free delivery above ₹1,999
//                 </div>
//                 <div
//                   className="flex items-center gap-2 text-[11px] text-[#1a3c2e]/60"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
//                   100% secure checkout
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* ================= RELATED PRODUCTS ================= */}
//         {relatedProducts.length > 0 && (
//           <motion.section
//             initial={reduceMotion ? false : { opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.15 }}
//             transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             className="mt-16 md:mt-20 pt-10 border-t border-[#1a3c2e]/10"
//           >
//             <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
//               <div>
//                 <div
//                   className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <Sparkles className="w-3 h-3" />
//                   Complete the look
//                 </div>
//                 <h2
//                   className="text-2xl md:text-3xl text-[#1a3c2e] tracking-tight"
//                   style={{ fontFamily: 'var(--font-display)' }}
//                 >
//                   You may also like
//                 </h2>
//               </div>
//               <Link
//                 to="/"
//                 className="text-[#1a3c2e] text-sm font-medium hover:text-[#2d6a4f] flex items-center gap-1 transition-colors"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Browse all <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {relatedProducts.map((p, idx) => (
//                 <motion.div
//                   key={p.id}
//                   initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   transition={{
//                     duration: 0.4,
//                     delay: Math.min(idx * 0.05, 0.25),
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   <RelatedCard product={p} currency={currency} />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ============================================================
//    RelatedCard — compact, modern
//    ============================================================ */
// const RelatedCard = ({ product, currency }) => (
//   <Link to={`/product/${product.id}`} className="group block">
//     <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e8e3d8]">
//       <img
//         src={product.img}
//         alt={product.name}
//         loading="lazy"
//         decoding="async"
//         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
//       />

//       {product.tag && (
//         <span
//           className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 rounded-full bg-[#1a3c2e] text-white"
//           style={{ fontFamily: 'var(--font-body)' }}
//         >
//           {product.tag}
//         </span>
//       )}

//       {/* Quick add icon on hover */}
//       <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-[#1a3c2e] flex items-center justify-center shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
//         <Plus className="w-3.5 h-3.5" />
//       </div>
//     </div>

//     <div className="pt-3">
//       <h3
//         className="text-[13px] font-medium text-[#1a3c2e] group-hover:text-[#2d6a4f] transition-colors line-clamp-1"
//         style={{ fontFamily: 'var(--font-body)' }}
//       >
//         {product.name}
//       </h3>
//       <p
//         className="text-sm font-semibold text-[#1a3c2e] mt-1 tabular-nums"
//         style={{ fontFamily: 'var(--font-mono)' }}
//       >
//         {currency}
//         {Number(product.price).toLocaleString('en-IN')}
//       </p>
//     </div>
//   </Link>
// );

// export default Cart;



import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
  Sparkles,
  ChevronRight,
  PackageCheck,
  LockKeyhole,
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQty,
    subtotal,
    shipping,
    total,
  } = useCart();

  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const currency = '₹';

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  // Related products based on cart categories
  const relatedProducts = useMemo(() => {
    if (!Array.isArray(products) || !cart.length) return [];

    const cartIds = new Set(cart.map((item) => item.id));

    const cartCategories = new Set(
      cart
        .map((item) => String(item.category || '').toLowerCase())
        .filter(Boolean)
    );

    return products
      .filter((product) => !cartIds.has(product.id))
      .map((product) => ({
        product,
        score:
          (cartCategories.has(
            String(product.category || '').toLowerCase()
          ) ? 2 : 0) +
          (Number(product.rating) || 0) * 0.1,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.product);
  }, [products, cart]);

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('en-IN');

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#f4f1ea] flex items-center justify-center px-4 py-16 sm:py-20 overflow-hidden font-['DM_Sans',sans-serif]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md text-center"
        >
          <div className="absolute -top-16 -left-10 w-36 h-36 bg-[#a3d9b1]/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#2d6a4f]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border border-[#1a3c2e]/10 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingBag className="w-9 h-9 sm:w-10 sm:h-10 text-[#2d6a4f]" />
            </div>

            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2d6a4f] bg-[#a3d9b1]/20 px-3 py-2 rounded-full mb-4">
              <Leaf className="w-3.5 h-3.5" />
              Your shopping bag
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1a3c2e] mb-3 tracking-tight">
              Your bag is empty.
            </h2>

            <p className="text-[#1a3c2e]/60 text-sm leading-relaxed mb-7 max-w-xs mx-auto">
              Your favourite greens are waiting for you.
              Discover something beautiful for your space.
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#1a3c2e]/15 group"
            >
              Explore products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-7 sm:py-9 md:py-12 overflow-hidden font-['DM_Sans',sans-serif]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 sm:mb-9"
        >
          <div className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3">
            <span className="w-6 h-px bg-[#2d6a4f]" />
            Your shopping bag
          </div>

          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#1a3c2e] leading-tight tracking-tight">
                Shopping Cart
                <span className="text-[#a3d9b1]">.</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#1a3c2e]/50 mt-1.5">
                Review your selected products before checkout.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-white border border-[#1a3c2e]/10 rounded-full px-3.5 py-2">
              <ShoppingBag className="w-4 h-4 text-[#2d6a4f]" />
              <span className="text-xs font-semibold text-[#1a3c2e]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 min-w-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-sm font-semibold text-[#1a3c2e]">
                Your items
              </h2>
              <span className="text-[11px] text-[#1a3c2e]/45">
                {cart.length} products
              </span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => {
                  const key = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;

                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -20,
                        transition: { duration: 0.2 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] p-3 sm:p-4 shadow-[0_3px_15px_rgba(26,60,46,0.025)] hover:shadow-[0_6px_22px_rgba(26,60,46,0.06)] transition-shadow"
                    >
                      <div className="flex gap-3 sm:gap-4">

                        {/* PRODUCT IMAGE */}
                        <Link
                          to={`/product/${item.id}`}
                          className="relative w-[88px] h-[105px] sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-[#eeeae1] shrink-0"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </Link>

                        {/* PRODUCT DETAILS */}
                        <div className="flex-1 min-w-0 flex flex-col">

                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link
                                to={`/product/${item.id}`}
                                className="block text-[13px] sm:text-[15px] font-semibold text-[#1a3c2e] hover:text-[#2d6a4f] transition-colors line-clamp-2"
                              >
                                {item.name}
                              </Link>

                              {item.category && (
                                <p className="text-[10px] sm:text-[11px] text-[#1a3c2e]/45 uppercase tracking-[0.12em] mt-1">
                                  {item.category}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => removeFromCart(item)}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#1a3c2e]/40 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* VARIANTS */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.colorName && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] text-[#1a3c2e]/65 bg-[#f4f1ea] px-2 py-1 rounded-md">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                                  style={{ backgroundColor: item.selectedColor }}
                                />
                                {item.colorName}
                              </span>
                            )}

                            {item.selectedSize && (
                              <span className="text-[10px] text-[#1a3c2e]/65 bg-[#f4f1ea] px-2 py-1 rounded-md">
                                Size: {item.selectedSize}
                              </span>
                            )}
                          </div>

                          {/* QUANTITY AND PRICE */}
                          <div className="flex items-end justify-between gap-2 mt-auto pt-3">
                            <div className="inline-flex items-center border border-[#1a3c2e]/15 rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() => updateQty(item, item.qty - 1)}
                                aria-label="Decrease quantity"
                                className="w-8 h-8 flex items-center justify-center text-[#1a3c2e]/65 hover:bg-[#a3d9b1]/20 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>

                              <span className="min-w-8 text-center text-xs font-semibold text-[#1a3c2e] tabular-nums">
                                {item.qty}
                              </span>

                              <button
                                onClick={() => updateQty(item, item.qty + 1)}
                                aria-label="Increase quantity"
                                className="w-8 h-8 flex items-center justify-center text-[#1a3c2e]/65 hover:bg-[#a3d9b1]/20 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-sm sm:text-base font-bold text-[#1a3c2e] tabular-nums">
                                {currency}{formatPrice(item.price * item.qty)}
                              </p>

                              {item.qty > 1 && (
                                <p className="text-[10px] text-[#1a3c2e]/40 mt-0.5">
                                  {currency}{formatPrice(item.price)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* CONTINUE SHOPPING */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#2d6a4f] hover:text-[#1a3c2e] mt-5 px-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Continue shopping
            </Link>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1 min-w-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] p-4 sm:p-5 md:p-6 shadow-[0_4px_20px_rgba(26,60,46,0.035)] lg:sticky lg:top-24"
            >
              {/* SUMMARY TITLE */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2d6a4f] mb-1">
                    Checkout details
                  </p>
                  <h2 className="text-xl font-semibold text-[#1a3c2e]">
                    Order summary
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#a3d9b1]/20 flex items-center justify-center">
                  <PackageCheck className="w-5 h-5 text-[#2d6a4f]" />
                </div>
              </div>

              {/* PRICE DETAILS */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#1a3c2e]/60">Subtotal</span>
                  <span className="font-semibold text-[#1a3c2e] tabular-nums">
                    {currency}{formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#1a3c2e]/60">Shipping</span>

                  <span className="font-semibold text-[#1a3c2e] tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-[#2d6a4f] text-xs font-bold">
                        FREE
                      </span>
                    ) : (
                      `${currency}${formatPrice(shipping)}`
                    )}
                  </span>
                </div>

                {shipping === 0 && (
                  <div className="flex items-center gap-2 bg-[#a3d9b1]/15 text-[#2d6a4f] px-3 py-2.5 rounded-lg text-[11px]">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Free shipping applied to your order!</span>
                  </div>
                )}

                <div className="border-t border-dashed border-[#1a3c2e]/15 pt-4 mt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-[#1a3c2e]">
                      Total amount
                    </span>

                    <span className="text-xl sm:text-2xl font-bold text-[#1a3c2e] tabular-nums">
                      {currency}{formatPrice(total)}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#1a3c2e]/40 mt-1">
                    Inclusive of applicable charges
                  </p>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={handleCheckout}
                className="w-full mt-5 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-[#1a3c2e]/15"
              >
                Proceed to checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* TRUST POINTS */}
              <div className="mt-5 pt-4 border-t border-[#1a3c2e]/10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#a3d9b1]/20 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a3c2e]">
                      Free delivery above ₹1,999
                    </p>
                    <p className="text-[10px] text-[#1a3c2e]/45">
                      Delivered to your doorstep
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#a3d9b1]/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a3c2e]">
                      Secure checkout
                    </p>
                    <p className="text-[10px] text-[#1a3c2e]/45">
                      Your information is protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#a3d9b1]/20 flex items-center justify-center shrink-0">
                    <LockKeyhole className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a3c2e]">
                      Safe shopping experience
                    </p>
                    <p className="text-[10px] text-[#1a3c2e]/45">
                      Shop with confidence
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-[#1a3c2e]/10"
          >
            <div className="flex items-end justify-between gap-3 mb-6 sm:mb-7 flex-wrap">
              <div>
                <div className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Picked for you
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a3c2e] tracking-tight">
                  You may also like
                </h2>

                <p className="text-xs text-[#1a3c2e]/50 mt-1">
                  Discover more plants and essentials for your space.
                </p>
              </div>

              <Link
                to="/"
                className="text-xs font-semibold text-[#2d6a4f] hover:text-[#1a3c2e] flex items-center gap-1 transition-colors"
              >
                Browse all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                >
                  <RelatedCard
                    product={product}
                    currency={currency}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

// RELATED PRODUCT CARD
const RelatedCard = ({ product, currency }) => (
  <Link
    to={`/product/${product.id}`}
    className="group block min-w-0"
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-[#e8e3d8]">
      <img
        src={product.img}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {product.tag && (
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[8px] sm:text-[9px] tracking-[0.12em] uppercase font-bold px-2 py-1 rounded-full bg-[#1a3c2e] text-white">
          {product.tag}
        </span>
      )}

      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 rounded-full bg-white text-[#1a3c2e] flex items-center justify-center shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <Plus className="w-4 h-4" />
      </div>
    </div>

    <div className="pt-2.5 sm:pt-3">
      <h3 className="text-xs sm:text-[13px] font-semibold text-[#1a3c2e] group-hover:text-[#2d6a4f] transition-colors line-clamp-2">
        {product.name}
      </h3>

      <p className="text-sm font-bold text-[#1a3c2e] mt-1.5 tabular-nums">
        {currency}{Number(product.price || 0).toLocaleString('en-IN')}
      </p>
    </div>
  </Link>
);

export default Cart;
