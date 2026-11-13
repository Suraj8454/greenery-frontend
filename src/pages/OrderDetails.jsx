// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Package, MapPin, CreditCard, ArrowRight, Leaf } from 'lucide-react';
// import { api } from '../utils/api';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// const OrderDetails = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => { if (!user) return; api('/orders').then(rows => setOrders(rows.map(o => ({ ...o, address: { ...o, name: user.name, paymentMethod: o.payment_method, address: o.address, city: o.city, pincode: o.pincode, phone: o.phone }, createdAt: o.created_at, total: Number(o.total), items: (o.items || []).map((item) => ({ ...item, id: item.id, name: item.name || item.product_name, img: item.img || item.image, price: Number(item.price), qty: Number(item.qty) })) })))).catch(e => console.error(e)).finally(() => setLoading(false)); }, [user]);
//   if (loading) return <div className="min-h-[40vh] grid place-items-center">Loading your orders…</div>;

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#fcfbf7] flex flex-col items-center justify-center px-4 py-20">
//         <div className="w-24 h-24 rounded-full bg-[#eef2ed] flex items-center justify-center mx-auto mb-6">
//           <Package className="w-12 h-12 text-[#a3d9b1]" />
//         </div>
//         <h2 className="text-3xl font-serif font-bold text-[#1a3c2e] mb-3">No orders yet</h2>
//         <p className="text-gray-500 text-sm mb-8">Your orders will appear here once placed</p>
//         <Link to="/" className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-8 py-3 rounded-full font-semibold text-sm">Start Shopping</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
//             <Leaf className="w-3.5 h-3.5" /> Your Orders
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-8">Order History</h1>
//         </motion.div>

//         <div className="space-y-4">
//           {orders.map((order, idx) => (
//             <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
//               className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex flex-wrap justify-between items-start gap-3 mb-4 pb-4 border-b border-gray-100">
//                 <div><p className="text-xs text-gray-500">Order ID</p><p className="font-bold text-[#1a3c2e]">{order.id}</p></div>
//                 <div className="text-right"><p className="text-xs text-gray-500">Placed on</p><p className="text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p></div>
//                 <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">{order.status}</span>
//               </div>
//               <div className="space-y-3 mb-4">
//                 {order.items.map(item => (
//                   <div key={item.id} className="flex items-center gap-3">
//                     <img src={item.img} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
//                     <div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate">{item.name}</p><p className="text-xs text-gray-500">Qty: {item.qty}</p></div>
//                     <p className="font-semibold text-sm">₹{item.price * item.qty}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex flex-wrap justify-between items-center pt-3 border-t border-gray-100 gap-3">
//                 <div className="flex items-center gap-2 text-xs text-gray-600"><MapPin className="w-3.5 h-3.5 text-[#2d6a4f]" />{order.address.city} - {order.address.pincode}</div>
//                 <div className="flex items-center gap-2 text-xs text-gray-600"><CreditCard className="w-3.5 h-3.5 text-[#2d6a4f]" />{order.address.paymentMethod.toUpperCase()}</div>
//                 <p className="font-bold text-[#1a3c2e]">Total: ₹{order.total}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Package, MapPin, CreditCard, ArrowRight, Leaf,
  ChevronRight, Truck, CheckCircle2, Clock, XCircle, ShoppingBag,
} from 'lucide-react';
import { api, mediaUrl } from '../utils/api';
import { useAuth } from '../context/AuthContext';

/* ============================================================
   Typography — index.css:
   @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

   :root {
     --font-display: 'Instrument Serif', Georgia, serif;
     --font-body: 'Inter Tight', system-ui, sans-serif;
     --font-mono: 'JetBrains Mono', ui-monospace, monospace;
   }
   ============================================================ */

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=200&h=200';

/* Resolve product image from any backend field */
const resolveImage = (item) => {
  const raw =
    item?.img ||
    item?.image ||
    item?.product_image ||
    item?.thumbnail ||
    item?.photo ||
    item?.image_url ||
    '';

  if (!raw) return FALLBACK_IMG;

  // If backend sends relative path, prepend media host
  const resolved = mediaUrl(raw);
  return resolved || FALLBACK_IMG;
};

/* Normalize status → style + icon */
const STATUS_META = {
  pending:   { label: 'Pending',   icon: Clock,         cls: 'text-amber-700 bg-amber-50 border-amber-200' },
  confirmed: { label: 'Confirmed', icon: CheckCircle2,  cls: 'text-sky-700 bg-sky-50 border-sky-200' },
  shipped:   { label: 'Shipped',   icon: Truck,         cls: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  delivered: { label: 'Delivered', icon: CheckCircle2,  cls: 'text-[#2d6a4f] bg-[#2d6a4f]/10 border-[#2d6a4f]/20' },
  cancelled: { label: 'Cancelled', icon: XCircle,       cls: 'text-rose-700 bg-rose-50 border-rose-200' },
};

const getStatusMeta = (status) =>
  STATUS_META[String(status || '').toLowerCase()] || STATUS_META.pending;

const OrderDetails = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  /* ================= FETCH & NORMALIZE ================= */
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    api('/orders')
      .then((rows) => {
        if (cancelled) return;
        const safeRows = Array.isArray(rows) ? rows : [];

        const normalized = safeRows.map((o) => {
          const items = Array.isArray(o.items)
            ? o.items.map((item) => ({
                ...item,
                id: item.id ?? item.product_id,
                name: item.name || item.product_name || 'Product',
                img: resolveImage(item),          // ⬅️ image fix
                price: Number(item.price) || 0,
                qty: Number(item.qty ?? item.quantity) || 1,
              }))
            : [];

          return {
            id: o.id,
            status: o.status || 'pending',
            createdAt: o.created_at || o.createdAt,
            total: Number(o.total) || 0,
            paymentMethod: o.payment_method || o.paymentMethod || 'prepaid',
            expectedDeliveryDate: o.expected_delivery_date || null,
            timeline: Array.isArray(o.timeline) ? o.timeline : [],
            address: {
              name: o.customer_name || o.name || user?.name || '',
              line1: o.address || o.address_line1 || '',
              city: o.city || '',
              pincode: o.pincode || '',
              phone: o.phone || '',
            },
            items,
          };
        });

        // Sort newest first
        normalized.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(normalized);
      })
      .catch((e) => console.error('Failed to load orders:', e))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-[#f4f1ea]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        >
          <Leaf className="w-8 h-8 text-[#2d6a4f]" />
        </motion.div>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center px-5 py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-[#1a3c2e]/[0.06] flex items-center justify-center mx-auto mb-6">
            <Package className="w-9 h-9 text-[#2d6a4f]" />
          </div>
          <h2
            className="text-3xl md:text-4xl text-[#1a3c2e] mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            No orders yet.
          </h2>
          <p
            className="text-[#1a3c2e]/60 text-sm mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Your orders will show up here once you place one.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-7 py-3 rounded-full font-semibold text-sm transition-colors group"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Start shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ================= MAIN ================= */
  return (
    <div className="min-h-screen bg-[#f4f1ea] py-8 md:py-12">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
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
            Account
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-[#1a3c2e] leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Order history
              <span className="text-[#a3d9b1]">.</span>
            </h1>
            <p
              className="text-[#1a3c2e]/50 text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </p>
          </div>
        </motion.div>

        {/* Orders list */}
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <OrderCard
              key={order.id}
              order={order}
              delay={Math.min(idx * 0.06, 0.3)}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   OrderCard
   ============================================================ */
const OrderCard = ({ order, delay, reduceMotion }) => {
  const status = getStatusMeta(order.status);
  const StatusIcon = status.icon;
  const created = order.createdAt ? new Date(order.createdAt) : null;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] overflow-hidden"
    >
      {/* ===== Header row ===== */}
      <header className="px-4 md:px-5 py-3 border-b border-[#1a3c2e]/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Order
            </p>
            <p
              className="text-sm font-semibold text-[#1a3c2e] tabular-nums"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              #{order.id}
            </p>
          </div>

          {created && (
            <div>
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Placed
              </p>
              <p
                className="text-sm text-[#1a3c2e]/70"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {created.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Expected delivery</p>
            <p className="text-sm text-[#1a3c2e]/70" style={{ fontFamily: 'var(--font-body)' }}>
              {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : 'Date to be confirmed'}
            </p>
          </div>
          <div>
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Payment
            </p>
            <p
              className="text-sm text-[#1a3c2e]/70 capitalize flex items-center gap-1"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <CreditCard className="w-3 h-3 text-[#2d6a4f]" />
              {order.paymentMethod}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded-full border ${status.cls}`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </span>
      </header>

      {order.timeline.length > 0 && (
        <div className="px-4 md:px-5 py-4 border-b border-[#1a3c2e]/[0.06] bg-[#f8faf7]">
          <p className="mb-3 text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/45 font-bold">Order timeline</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {order.timeline.map((entry, index) => (
              <div key={`${entry.status}-${entry.created_at || index}`} className="flex min-w-[150px] items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
                <div><p className="text-xs font-semibold text-[#1a3c2e]">{entry.status}</p><p className="mt-0.5 text-[10px] text-[#1a3c2e]/50">{entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-IN') : ''}</p>{entry.note && <p className="mt-1 max-w-[220px] text-[11px] text-[#1a3c2e]/60">{entry.note}</p>}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Items ===== */}
      <div className="divide-y divide-[#1a3c2e]/[0.06]">
        {order.items.map((item, i) => (
          <div key={`${item.id}-${i}`} className="px-4 md:px-5 py-3 flex gap-3 items-center">
            <Link
              to={`/product/${item.id}`}
              className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-[#e8e3d8] shrink-0"
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                to={`/product/${item.id}`}
                className="block text-sm font-medium text-[#1a3c2e] hover:text-[#2d6a4f] transition-colors line-clamp-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item.name}
              </Link>
              <p
                className="text-[11px] text-[#1a3c2e]/45 tracking-wide mt-0.5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Qty {item.qty} · ₹{item.price.toLocaleString('en-IN')} each
              </p>
            </div>

            <p
              className="text-sm font-semibold text-[#1a3c2e] tabular-nums shrink-0"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ₹{(item.price * item.qty).toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </div>

      {/* ===== Footer ===== */}
      <footer className="px-4 md:px-5 py-3 bg-[#1a3c2e]/[0.02] border-t border-[#1a3c2e]/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-[#1a3c2e]/60 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
          <span className="truncate" style={{ fontFamily: 'var(--font-body)' }}>
            {[order.address.city, order.address.pincode].filter(Boolean).join(' · ') || 'Address not available'}
          </span>
        </div>

        <div className="flex items-baseline gap-2 ml-auto">
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a3c2e]/40 font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Total
          </span>
          <span
            className="text-lg font-semibold text-[#1a3c2e] tabular-nums"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ₹{order.total.toLocaleString('en-IN')}
          </span>
        </div>
      </footer>
    </motion.article>
  );
};

export default OrderDetails;