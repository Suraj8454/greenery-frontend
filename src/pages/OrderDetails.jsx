

// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, useReducedMotion } from 'framer-motion';
// import {
//   Package, MapPin, CreditCard, ArrowRight, Leaf,
//   ChevronRight, Truck, CheckCircle2, Clock, XCircle, ShoppingBag,
// } from 'lucide-react';
// import { api, mediaUrl } from '../utils/api';
// import { useAuth } from '../context/AuthContext';


// const FALLBACK_IMG =
//   'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=200&h=200';

// /* Resolve product image from any backend field */
// const resolveImage = (item) => {
//   const raw =
//     item?.img ||
//     item?.image ||
//     item?.product_image ||
//     item?.thumbnail ||
//     item?.photo ||
//     item?.image_url ||
//     '';

//   if (!raw) return FALLBACK_IMG;

//   // If backend sends relative path, prepend media host
//   const resolved = mediaUrl(raw);
//   return resolved || FALLBACK_IMG;
// };

// /* Normalize status → style + icon */
// const STATUS_META = {
//   pending:   { label: 'Pending',   icon: Clock,         cls: 'text-amber-700 bg-amber-50 border-amber-200' },
//   confirmed: { label: 'Confirmed', icon: CheckCircle2,  cls: 'text-sky-700 bg-sky-50 border-sky-200' },
//   shipped:   { label: 'Shipped',   icon: Truck,         cls: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
//   delivered: { label: 'Delivered', icon: CheckCircle2,  cls: 'text-[#2d6a4f] bg-[#2d6a4f]/10 border-[#2d6a4f]/20' },
//   cancelled: { label: 'Cancelled', icon: XCircle,       cls: 'text-rose-700 bg-rose-50 border-rose-200' },
// };

// const getStatusMeta = (status) =>
//   STATUS_META[String(status || '').toLowerCase()] || STATUS_META.pending;

// const OrderDetails = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const reduceMotion = useReducedMotion();

//   /* ================= FETCH & NORMALIZE ================= */
//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     let cancelled = false;

//     api('/orders')
//       .then((rows) => {
//         if (cancelled) return;
//         const safeRows = Array.isArray(rows) ? rows : [];

//         const normalized = safeRows.map((o) => {
//           const items = Array.isArray(o.items)
//             ? o.items.map((item) => ({
//                 ...item,
//                 id: item.id ?? item.product_id,
//                 name: item.name || item.product_name || 'Product',
//                 img: resolveImage(item),          // ⬅️ image fix
//                 price: Number(item.price) || 0,
//                 qty: Number(item.qty ?? item.quantity) || 1,
//               }))
//             : [];

//           return {
//             id: o.id,
//             status: o.status || 'pending',
//             createdAt: o.created_at || o.createdAt,
//             total: Number(o.total) || 0,
//             paymentMethod: o.payment_method || o.paymentMethod || 'prepaid',
//             expectedDeliveryDate: o.expected_delivery_date || null,
//             timeline: Array.isArray(o.timeline) ? o.timeline : [],
//             address: {
//               name: o.customer_name || o.name || user?.name || '',
//               line1: o.address || o.address_line1 || '',
//               city: o.city || '',
//               pincode: o.pincode || '',
//               phone: o.phone || '',
//             },
//             items,
//           };
//         });

//         // Sort newest first
//         normalized.sort(
//           (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );

//         setOrders(normalized);
//       })
//       .catch((e) => console.error('Failed to load orders:', e))
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });

//     return () => {
//       cancelled = true;
//     };
//   }, [user]);

//   /* ================= LOADING ================= */
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

//   /* ================= EMPTY ================= */
//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center px-5 py-20">
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           className="text-center max-w-sm"
//         >
//           <div className="w-20 h-20 rounded-full bg-[#1a3c2e]/[0.06] flex items-center justify-center mx-auto mb-6">
//             <Package className="w-9 h-9 text-[#2d6a4f]" />
//           </div>
//           <h2
//             className="text-3xl md:text-4xl text-[#1a3c2e] mb-3 tracking-tight"
//             style={{ fontFamily: 'var(--font-display)' }}
//           >
//             No orders yet.
//           </h2>
//           <p
//             className="text-[#1a3c2e]/60 text-sm mb-8 leading-relaxed"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Your orders will show up here once you place one.
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-7 py-3 rounded-full font-semibold text-sm transition-colors group"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Start shopping
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   /* ================= MAIN ================= */
//   return (
//     <div className="min-h-screen bg-[#f4f1ea] py-8 md:py-12">
//       <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
//         {/* Header */}
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
//             Account
//           </div>
//           <div className="flex items-end justify-between flex-wrap gap-3">
//             <h1
//               className="text-3xl md:text-4xl lg:text-5xl text-[#1a3c2e] leading-[1.05] tracking-tight"
//               style={{ fontFamily: 'var(--font-display)' }}
//             >
//               Order history
//               <span className="text-[#a3d9b1]">.</span>
//             </h1>
//             <p
//               className="text-[#1a3c2e]/50 text-sm"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               {orders.length} {orders.length === 1 ? 'order' : 'orders'}
//             </p>
//           </div>
//         </motion.div>

//         {/* Orders list */}
//         <div className="space-y-4">
//           {orders.map((order, idx) => (
//             <OrderCard
//               key={order.id}
//               order={order}
//               delay={Math.min(idx * 0.06, 0.3)}
//               reduceMotion={reduceMotion}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ============================================================
//    OrderCard
//    ============================================================ */
// const OrderCard = ({ order, delay, reduceMotion }) => {
//   const status = getStatusMeta(order.status);
//   const StatusIcon = status.icon;
//   const created = order.createdAt ? new Date(order.createdAt) : null;

//   return (
//     <motion.article
//       initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
//       className="bg-white rounded-2xl border border-[#1a3c2e]/[0.08] overflow-hidden"
//     >
//       {/* ===== Header row ===== */}
//       <header className="px-4 md:px-5 py-3 border-b border-[#1a3c2e]/[0.06] flex flex-wrap items-center justify-between gap-3">
//         <div className="flex items-center gap-4 flex-wrap">
//           <div>
//             <p
//               className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Order
//             </p>
//             <p
//               className="text-sm font-semibold text-[#1a3c2e] tabular-nums"
//               style={{ fontFamily: 'var(--font-mono)' }}
//             >
//               #{order.id}
//             </p>
//           </div>

//           {created && (
//             <div>
//               <p
//                 className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Placed
//               </p>
//               <p
//                 className="text-sm text-[#1a3c2e]/70"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 {created.toLocaleDateString('en-IN', {
//                   day: '2-digit',
//                   month: 'short',
//                   year: 'numeric',
//                 })}
//               </p>
//             </div>
//           )}

//           <div>
//             <p className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Expected delivery</p>
//             <p className="text-sm text-[#1a3c2e]/70" style={{ fontFamily: 'var(--font-body)' }}>
//               {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : 'Date to be confirmed'}
//             </p>
//           </div>
//           <div>
//             <p
//               className="text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/40 font-semibold"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Payment
//             </p>
//             <p
//               className="text-sm text-[#1a3c2e]/70 capitalize flex items-center gap-1"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               <CreditCard className="w-3 h-3 text-[#2d6a4f]" />
//               {order.paymentMethod}
//             </p>
//           </div>
//         </div>

//         <span
//           className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded-full border ${status.cls}`}
//           style={{ fontFamily: 'var(--font-body)' }}
//         >
//           <StatusIcon className="w-3 h-3" />
//           {status.label}
//         </span>
//       </header>

//       {order.timeline.length > 0 && (
//         <div className="px-4 md:px-5 py-4 border-b border-[#1a3c2e]/[0.06] bg-[#f8faf7]">
//           <p className="mb-3 text-[9px] tracking-[0.25em] uppercase text-[#1a3c2e]/45 font-bold">Order timeline</p>
//           <div className="flex flex-wrap gap-x-5 gap-y-3">
//             {order.timeline.map((entry, index) => (
//               <div key={`${entry.status}-${entry.created_at || index}`} className="flex min-w-[150px] items-start gap-2">
//                 <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
//                 <div><p className="text-xs font-semibold text-[#1a3c2e]">{entry.status}</p><p className="mt-0.5 text-[10px] text-[#1a3c2e]/50">{entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-IN') : ''}</p>{entry.note && <p className="mt-1 max-w-[220px] text-[11px] text-[#1a3c2e]/60">{entry.note}</p>}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ===== Items ===== */}
//       <div className="divide-y divide-[#1a3c2e]/[0.06]">
//         {order.items.map((item, i) => (
//           <div key={`${item.id}-${i}`} className="px-4 md:px-5 py-3 flex gap-3 items-center">
//             <Link
//               to={`/product/${item.id}`}
//               className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-[#e8e3d8] shrink-0"
//             >
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 loading="lazy"
//                 decoding="async"
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 onError={(e) => {
//                   e.currentTarget.onerror = null;
//                   e.currentTarget.src = FALLBACK_IMG;
//                 }}
//               />
//             </Link>

//             <div className="flex-1 min-w-0">
//               <Link
//                 to={`/product/${item.id}`}
//                 className="block text-sm font-medium text-[#1a3c2e] hover:text-[#2d6a4f] transition-colors line-clamp-1"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 {item.name}
//               </Link>
//               <p
//                 className="text-[11px] text-[#1a3c2e]/45 tracking-wide mt-0.5"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Qty {item.qty} · ₹{item.price.toLocaleString('en-IN')} each
//               </p>
//             </div>

//             <p
//               className="text-sm font-semibold text-[#1a3c2e] tabular-nums shrink-0"
//               style={{ fontFamily: 'var(--font-mono)' }}
//             >
//               ₹{(item.price * item.qty).toLocaleString('en-IN')}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* ===== Footer ===== */}
//       <footer className="px-4 md:px-5 py-3 bg-[#1a3c2e]/[0.02] border-t border-[#1a3c2e]/[0.06] flex flex-wrap items-center justify-between gap-3">
//         <div className="flex items-center gap-2 text-[11px] text-[#1a3c2e]/60 min-w-0">
//           <MapPin className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
//           <span className="truncate" style={{ fontFamily: 'var(--font-body)' }}>
//             {[order.address.city, order.address.pincode].filter(Boolean).join(' · ') || 'Address not available'}
//           </span>
//         </div>

//         <div className="flex items-baseline gap-2 ml-auto">
//           <span
//             className="text-[10px] tracking-[0.2em] uppercase text-[#1a3c2e]/40 font-semibold"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Total
//           </span>
//           <span
//             className="text-lg font-semibold text-[#1a3c2e] tabular-nums"
//             style={{ fontFamily: 'var(--font-mono)' }}
//           >
//             ₹{order.total.toLocaleString('en-IN')}
//           </span>
//         </div>
//       </footer>
//     </motion.article>
//   );
// };

// export default OrderDetails;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Package, MapPin, CreditCard, ArrowRight, Leaf,
  Truck, CheckCircle2, Clock, XCircle, ShoppingBag,
  CalendarDays, ShieldCheck, ChevronRight, Sparkles,
  RefreshCw
} from 'lucide-react';
import { api, mediaUrl } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=200&h=200';

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

  return mediaUrl(raw) || FALLBACK_IMG;
};

const STATUS_META = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    dot: 'bg-amber-500',
  },
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle2,
    color: 'text-sky-700 bg-sky-50 border-sky-200',
    dot: 'bg-sky-500',
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    dot: 'bg-indigo-500',
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle2,
    color: 'text-[#2d6a4f] bg-[#2d6a4f]/10 border-[#2d6a4f]/20',
    dot: 'bg-[#2d6a4f]',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-rose-700 bg-rose-50 border-rose-200',
    dot: 'bg-rose-500',
  },
};

const getStatusMeta = (status) =>
  STATUS_META[String(status || '').toLowerCase()] || STATUS_META.pending;

const formatPrice = (value) =>
  Number(value || 0).toLocaleString('en-IN');

const formatDate = (date) => {
  if (!date) return 'Date to be confirmed';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return 'Date to be confirmed';

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const OrderDetails = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setFetchError(false);

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
                img: resolveImage(item),
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

        normalized.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setOrders(normalized);
      })
      .catch((e) => {
        console.error('Failed to load orders:', e);
        if (!cancelled) setFetchError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  /* Loading */
  if (loading) {
    return (
      <div className="grid min-h-[65vh] place-items-center bg-[#fcfbf7] font-['DM_Sans',sans-serif]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ec]">
            <Leaf className="h-6 w-6 animate-pulse text-[#2d6a4f]" />
          </div>
          <p className="text-sm font-semibold text-[#1a3c2e]">
            Loading your orders...
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Just a moment
          </p>
        </div>
      </div>
    );
  }

  /* Error */
  if (fetchError) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#fcfbf7] px-4 font-['DM_Sans',sans-serif]">
        <div className="w-full max-w-sm rounded-3xl border border-[#e9ece6] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <RefreshCw size={23} />
          </div>
          <h2 className="text-lg font-bold text-[#1a3c2e]">
            Unable to load orders
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            Something went wrong while fetching your orders. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1a3c2e] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#2d6a4f]"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* Empty */
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfbf7] font-['DM_Sans',sans-serif]">

        <div className="relative overflow-hidden bg-[#1a3c2e] px-4 py-12 text-center sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative mx-auto max-w-xl">
            <Leaf className="mx-auto mb-4 h-7 w-7 text-[#a3d9b1]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3d9b1]">
              Your Account
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-3 text-xs text-white/60 sm:text-sm">
              Your complete shopping journey, all in one place.
            </p>
          </div>
        </div>

        <div className="mx-auto flex min-h-[45vh] max-w-md items-center justify-center px-4 py-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center"
          >
            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#edf4ec]">
              <Package size={38} className="text-[#2d6a4f]" />
              <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#fcfbf7] bg-[#a3d9b1] text-[#1a3c2e]">
                <Leaf size={14} />
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#1a3c2e] sm:text-3xl">
              No orders yet
            </h2>

            <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-gray-500 sm:text-sm">
              Looks like your shopping journey hasn't started yet. Explore our collection and find something green.
            </p>

            <Link
              to="/"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1a3c2e] px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#1a3c2e]/10 transition hover:bg-[#2d6a4f]"
            >
              Start Shopping
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  /* Main */
  return (
    <div className="min-h-screen bg-[#fcfbf7] pb-12 font-['DM_Sans',sans-serif]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#1a3c2e] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-16 h-60 w-60 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#2d6a4f]/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.23em] text-[#a3d9b1] sm:text-xs">
            <Leaf size={15} />
            Your Account
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                My Orders<span className="text-[#a3d9b1]">.</span>
              </h1>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/60 sm:text-sm">
                Keep track of your purchases, delivery updates and everything you've ordered.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 sm:self-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#a3d9b1]">
                <ShoppingBag size={19} />
              </div>
              <div>
                <p className="text-xl font-bold leading-none text-white">
                  {orders.length}
                </p>
                <p className="mt-1 text-[10px] text-white/55">
                  {orders.length === 1 ? 'Total Order' : 'Total Orders'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-[10px] text-white/65 sm:gap-6 sm:text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#a3d9b1]" />
              Secure Orders
            </div>
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-[#a3d9b1]" />
              Delivery Updates
            </div>
            <div className="flex items-center gap-2">
              <Package size={15} className="text-[#a3d9b1]" />
              Order History
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="mx-auto -mt-2 max-w-6xl px-3 pt-7 sm:px-6 sm:pt-9 lg:px-8">

        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[#1a3c2e] sm:text-base">
              Recent Orders
            </h2>
            <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
              Your latest purchases and updates
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#2d6a4f] transition hover:text-[#1a3c2e] sm:text-xs"
          >
            Continue Shopping
            <ChevronRight size={15} />
          </Link>
        </div>

        <div className="space-y-4 sm:space-y-5">
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
   Order Card
============================================================ */

const OrderCard = ({ order, delay, reduceMotion }) => {
  const status = getStatusMeta(order.status);
  const StatusIcon = status.icon;
  const created = order.createdAt ? new Date(order.createdAt) : null;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="overflow-hidden rounded-2xl border border-[#e5eae2] bg-white shadow-[0_4px_22px_rgba(26,60,46,0.035)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(26,60,46,0.07)] sm:rounded-3xl"
    >

      {/* Card Header */}
      <div className="border-b border-[#eef0eb] px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ee] text-[#2d6a4f]">
              <Package size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-gray-400">
                Order ID
              </p>
              <p className="mt-1 truncate text-sm font-bold text-[#1a3c2e]">
                #{order.id}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${status.color}`}
          >
            <StatusIcon size={12} />
            {status.label}
          </span>
        </div>

        {/* Order metadata */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <div className="flex items-start gap-2">
            <CalendarDays size={15} className="mt-0.5 shrink-0 text-[#2d6a4f]" />
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                Order Date
              </p>
              <p className="mt-1 text-[11px] font-semibold text-[#1a3c2e] sm:text-xs">
                {created && !Number.isNaN(created.getTime())
                  ? created.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Not available'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Truck size={15} className="mt-0.5 shrink-0 text-[#2d6a4f]" />
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                Expected Delivery
              </p>
              <p className="mt-1 text-[11px] font-semibold text-[#1a3c2e] sm:text-xs">
                {formatDate(order.expectedDeliveryDate)}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex items-start gap-2 sm:col-span-1">
            <CreditCard size={15} className="mt-0.5 shrink-0 text-[#2d6a4f]" />
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                Payment Method
              </p>
              <p className="mt-1 truncate text-[11px] font-semibold capitalize text-[#1a3c2e] sm:text-xs">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {order.timeline.length > 0 && (
        <div className="border-b border-[#eef0eb] bg-[#f8faf7] px-4 py-4 sm:px-5">
          <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a3c2e]/50">
            Order Timeline
          </p>

          <div className="flex gap-4 overflow-x-auto pb-1">
            {order.timeline.map((entry, index) => (
              <div
                key={`${entry.status}-${entry.created_at || index}`}
                className="flex min-w-[145px] flex-1 items-start gap-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e7f2e5] text-[#2d6a4f]">
                  <CheckCircle2 size={15} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold capitalize text-[#1a3c2e]">
                    {entry.status}
                  </p>
                  <p className="mt-1 text-[9px] text-gray-400">
                    {formatDate(entry.created_at)}
                  </p>
                  {entry.note && (
                    <p className="mt-1 text-[10px] leading-relaxed text-gray-500">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="px-4 py-2 sm:px-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Order Items
          </p>
          <span className="text-[10px] text-gray-400">
            {order.items.length} {order.items.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        <div className="divide-y divide-[#eef0eb]">
          {order.items.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="flex items-center gap-3 py-3"
            >
              <Link
                to={`/product/${item.id}`}
                className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f1f3ed] sm:h-16 sm:w-16"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="line-clamp-1 text-xs font-bold text-[#1a3c2e] transition hover:text-[#2d6a4f] sm:text-sm"
                >
                  {item.name}
                </Link>

                <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                  Qty: {item.qty} <span className="mx-1">·</span>
                  ₹{formatPrice(item.price)} each
                </p>
              </div>

              <p className="shrink-0 text-xs font-bold text-[#1a3c2e] sm:text-sm">
                ₹{formatPrice(item.price * item.qty)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#eef0eb] bg-[#fafbf8] px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
            <MapPin size={15} className="shrink-0 text-[#2d6a4f]" />
            <span className="truncate">
              {[order.address.city, order.address.pincode]
                .filter(Boolean)
                .join(' · ') || 'Address not available'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[#e8ece5] pt-3 sm:justify-end sm:border-0 sm:pt-0">
            <div className="text-right">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Total Amount
              </p>
              <p className="mt-0.5 text-lg font-bold text-[#1a3c2e]">
                ₹{formatPrice(order.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default OrderDetails;
