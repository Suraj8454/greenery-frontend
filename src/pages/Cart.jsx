// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Leaf } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';

// const Cart = () => {
//   const { cart, removeFromCart, updateQty, subtotal, shipping, total } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     if (!user) navigate('/login', { state: { from: '/checkout' } });
//     else navigate('/checkout');
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#fcfbf7] flex flex-col items-center justify-center px-4 py-20">
//         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
//           <div className="w-24 h-24 rounded-full bg-[#eef2ed] flex items-center justify-center mx-auto mb-6">
//             <ShoppingBag className="w-12 h-12 text-[#a3d9b1]" />
//           </div>
//           <h2 className="text-3xl font-serif font-bold text-[#1a3c2e] mb-3">Your cart is empty</h2>
//           <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Add some greens to your life and they'll show up right here.</p>
//           <Link to="/" className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl group">
//             Continue Shopping <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
//             <Leaf className="w-3.5 h-3.5" /> Your Bag
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">Shopping Cart</h1>
//           <p className="text-gray-500 text-sm mb-8">{cart.length} item{cart.length > 1 ? 's' : ''} in your cart</p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-4">
//             <AnimatePresence>
//               {cart.map(item => (
//                 <motion.div key={`${item.id}-${item.selectedColor || 'default'}`} layout exit={{ opacity: 0, x: -30 }}
//                   className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
//                   <Link to={`/product/${item.id}`} className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50 shrink-0">
//                     <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
//                   </Link>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between gap-2">
//                       <div>
//                         <h3 className="font-semibold text-[#1a3c2e] text-sm md:text-base truncate">{item.name}</h3>
//                         <p className="text-xs text-gray-500">{item.category}</p>{item.colorName && <p className="mt-1 flex items-center gap-2 text-xs text-gray-600"><span className="inline-block h-3 w-3 rounded-full border border-gray-300" style={{ backgroundColor: item.selectedColor }} />Colour: {item.colorName}</p>}
//                       </div>
//                       <button onClick={() => removeFromCart(item)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all shrink-0">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                     <p className="font-bold text-[#1a3c2e] mt-2">₹{item.price}</p>
//                     <div className="flex items-center gap-3 mt-3">
//                       <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
//                         <button onClick={() => updateQty(item, item.qty - 1)} className="p-2 hover:bg-[#eef2ed] hover:text-[#2d6a4f] transition-colors"><Minus className="w-3.5 h-3.5" /></button>
//                         <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">{item.qty}</span>
//                         <button onClick={() => updateQty(item, item.qty + 1)} className="p-2 hover:bg-[#eef2ed] hover:text-[#2d6a4f] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
//                       </div>
//                       <span className="text-xs text-gray-500 ml-auto">Total: <span className="font-bold text-[#1a3c2e]">₹{item.price * item.qty}</span></span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           <div className="lg:col-span-1">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
//               <h2 className="font-bold text-lg mb-5 text-[#1a3c2e]">Order Summary</h2>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">₹{subtotal}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold">{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping}`}</span></div>
//                 <div className="border-t border-gray-100 pt-3 flex justify-between text-base"><span className="font-bold">Total</span><span className="font-bold text-[#1a3c2e]">₹{total}</span></div>
//               </div>
//               <button onClick={handleCheckout} className="w-full mt-6 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group">
//                 Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
//                 <div className="flex items-center gap-2 text-xs text-gray-600"><Truck className="w-4 h-4 text-[#2d6a4f]" /> Free delivery above ₹1999</div>
//                 <div className="flex items-center gap-2 text-xs text-gray-600"><ShieldCheck className="w-4 h-4 text-[#2d6a4f]" /> 100% secure checkout</div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck,
  Truck, Leaf, Sparkles, ChevronRight, Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

const Cart = () => {
  const { cart, removeFromCart, updateQty, subtotal, shipping, total } = useCart();
  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const handleCheckout = () => {
    if (!user) navigate('/login', { state: { from: '/checkout' } });
    else navigate('/checkout');
  };

  /* ===== RELATED PRODUCTS — smart category match ===== */
  const relatedProducts = useMemo(() => {
    if (!Array.isArray(products) || !cart.length) return [];

    // Cart item IDs + categories
    const cartIds = new Set(cart.map((c) => c.id));
    const cartCategories = new Set(
      cart.map((c) => String(c.category || '').toLowerCase()).filter(Boolean)
    );

    // Score: same category = +2, other = +0. Take top 4
    return products
      .filter((p) => !cartIds.has(p.id))
      .map((p) => ({
        product: p,
        score:
          (cartCategories.has(String(p.category || '').toLowerCase()) ? 2 : 0) +
          (p.rating || 0) * 0.1,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.product);
  }, [products, cart]);

  const currency = '₹';

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center px-5 py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-[#1a3c2e]/[0.06] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-9 h-9 text-[#2d6a4f]" />
          </div>
          <h2
            className="text-3xl md:text-4xl text-[#1a3c2e] mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your bag is empty.
          </h2>
          <p
            className="text-[#1a3c2e]/60 text-sm mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Add some greens to your life — they'll show up right here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-7 py-3 rounded-full font-semibold text-sm transition-colors group"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Continue shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-8 md:py-12">
      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <div
            className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="h-px w-6 bg-[#2d6a4f]" />
            Your bag
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-[#1a3c2e] leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Shopping cart
              <span className="text-[#a3d9b1]">.</span>
            </h1>
            <p
              className="text-[#1a3c2e]/50 text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ================= ITEMS LIST ================= */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => {
                const key = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
                return (
                  <motion.div
                    key={key}
                    layout
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] p-3 md:p-4 flex gap-3 md:gap-4"
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#e8e3d8] shrink-0"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-500"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between gap-2 items-start">
                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/product/${item.id}`}
                            className="block text-[#1a3c2e] text-sm md:text-[15px] font-semibold hover:text-[#2d6a4f] transition-colors line-clamp-1"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {item.name}
                          </Link>
                          <p
                            className="text-[11px] text-[#1a3c2e]/45 tracking-[0.1em] uppercase mt-0.5"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {item.category}
                          </p>

                          {/* Variant chips */}
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            {item.colorName && (
                              <span
                                className="inline-flex items-center gap-1.5 text-[10px] text-[#1a3c2e]/70 bg-[#1a3c2e]/[0.04] px-2 py-1 rounded-md"
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                <span
                                  className="inline-block h-2.5 w-2.5 rounded-full border border-[#1a3c2e]/10"
                                  style={{ backgroundColor: item.selectedColor }}
                                />
                                {item.colorName}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span
                                className="text-[10px] text-[#1a3c2e]/70 bg-[#1a3c2e]/[0.04] px-2 py-1 rounded-md"
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item)}
                          aria-label="Remove item"
                          className="text-[#1a3c2e]/35 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between gap-2 mt-auto pt-2">
                        {/* Qty */}
                        <div className="flex items-center border border-[#1a3c2e]/15 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQty(item, item.qty - 1)}
                            className="p-1.5 md:p-2 hover:bg-[#1a3c2e]/5 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className="px-2.5 text-xs font-semibold text-[#1a3c2e] min-w-[1.75rem] text-center tabular-nums"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item, item.qty + 1)}
                            className="p-1.5 md:p-2 hover:bg-[#1a3c2e]/5 text-[#1a3c2e]/60 hover:text-[#1a3c2e] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p
                            className="text-sm md:text-base font-semibold text-[#1a3c2e] tabular-nums"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {currency}
                            {(item.price * item.qty).toLocaleString('en-IN')}
                          </p>
                          {item.qty > 1 && (
                            <p
                              className="text-[10px] text-[#1a3c2e]/40 tabular-nums mt-0.5"
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              {currency}
                              {item.price.toLocaleString('en-IN')} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Continue shopping — mobile only, below items */}
            <Link
              to="/"
              className="lg:hidden inline-flex items-center gap-2 text-[#1a3c2e]/60 hover:text-[#1a3c2e] text-xs font-medium pt-2 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <ChevronRight className="w-3 h-3 rotate-180" />
              Continue shopping
            </Link>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="lg:col-span-1">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] p-5 md:p-6 lg:sticky lg:top-24"
            >
              <h2
                className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a3c2e]/60 mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Order summary
              </h2>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#1a3c2e]/60" style={{ fontFamily: 'var(--font-body)' }}>
                    Subtotal
                  </span>
                  <span
                    className="font-semibold text-[#1a3c2e] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {currency}
                    {subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#1a3c2e]/60" style={{ fontFamily: 'var(--font-body)' }}>
                    Shipping
                  </span>
                  <span
                    className="font-semibold tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {shipping === 0 ? (
                      <span className="text-[#2d6a4f]">FREE</span>
                    ) : (
                      `${currency}${shipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>

                <div className="border-t border-dashed border-[#1a3c2e]/15 pt-3 mt-3 flex justify-between items-baseline">
                  <span
                    className="text-[#1a3c2e] font-semibold text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Total
                  </span>
                  <span
                    className="font-semibold text-[#1a3c2e] text-xl tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {currency}
                    {total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-5 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 group"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Proceed to checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Trust */}
              <div className="mt-5 pt-4 border-t border-[#1a3c2e]/10 space-y-2.5">
                <div
                  className="flex items-center gap-2 text-[11px] text-[#1a3c2e]/60"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Truck className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                  Free delivery above ₹1,999
                </div>
                <div
                  className="flex items-center gap-2 text-[11px] text-[#1a3c2e]/60"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                  100% secure checkout
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-20 pt-10 border-t border-[#1a3c2e]/10"
          >
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <div
                  className="flex items-center gap-2 text-[#2d6a4f] text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Sparkles className="w-3 h-3" />
                  Complete the look
                </div>
                <h2
                  className="text-2xl md:text-3xl text-[#1a3c2e] tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  You may also like
                </h2>
              </div>
              <Link
                to="/"
                className="text-[#1a3c2e] text-sm font-medium hover:text-[#2d6a4f] flex items-center gap-1 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Browse all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <RelatedCard product={p} currency={currency} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   RelatedCard — compact, modern
   ============================================================ */
const RelatedCard = ({ product, currency }) => (
  <Link to={`/product/${product.id}`} className="group block">
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e8e3d8]">
      <img
        src={product.img}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {product.tag && (
        <span
          className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 rounded-full bg-[#1a3c2e] text-white"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {product.tag}
        </span>
      )}

      {/* Quick add icon on hover */}
      <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-[#1a3c2e] flex items-center justify-center shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <Plus className="w-3.5 h-3.5" />
      </div>
    </div>

    <div className="pt-3">
      <h3
        className="text-[13px] font-medium text-[#1a3c2e] group-hover:text-[#2d6a4f] transition-colors line-clamp-1"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {product.name}
      </h3>
      <p
        className="text-sm font-semibold text-[#1a3c2e] mt-1 tabular-nums"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {currency}
        {Number(product.price).toLocaleString('en-IN')}
      </p>
    </div>
  </Link>
);

export default Cart;