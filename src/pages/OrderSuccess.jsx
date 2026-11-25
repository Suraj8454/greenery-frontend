// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle, Package, ArrowRight, Leaf, MapPin, CreditCard } from 'lucide-react';
// import { api } from '../utils/api';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// const OrderSuccess = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => { if (!user) return; api('/orders').then(rows => { const found = rows.find(o => String(o.id) === String(id)); if (found) setOrder({ ...found, address: { ...found, name: found.customer_name || user.name, paymentMethod: found.payment_method, address: found.address, city: found.city, pincode: found.pincode, phone: found.phone }, total: Number(found.total) }); }).catch(console.error).finally(() => setLoading(false)); }, [id, user]);
//   if (loading) return <div className="min-h-[40vh] grid place-items-center">Loading order…</div>;

//   if (!order) return <div className="min-h-screen flex items-center justify-center text-gray-500">Order not found</div>;

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] py-16 px-4">
//       <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
//         className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
//           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
//             className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </motion.div>
//           <div className="flex items-center justify-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
//             <Leaf className="w-3.5 h-3.5" /> Success
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-3">Order Confirmed!</h1>
//           <p className="text-gray-500 text-sm mb-8">Thank you for shopping with us. Your order has been placed successfully.</p>

//           <div className="bg-[#fcfbf7] rounded-2xl p-6 text-left mb-6">
//             <div className="flex items-center justify-between mb-4">
//               <div><p className="text-xs text-gray-500">Order ID</p><p className="font-bold text-[#1a3c2e]">{order.id}</p></div>
//               <Package className="w-6 h-6 text-[#2d6a4f]" />
//             </div>
//             <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
//               <div className="flex justify-between"><span className="text-gray-500">Total Amount</span><span className="font-bold text-[#1a3c2e]">₹{order.total}</span></div>
//               <div className="flex justify-between items-center"><span className="text-gray-500 flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> Payment</span><span className="font-semibold uppercase text-xs">{order.address.paymentMethod}</span></div>
//               <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-semibold text-green-600">{order.status}</span></div>
//               <div className="flex justify-between gap-4"><span className="text-gray-500">Expected delivery</span><span className="text-right font-semibold text-[#1a3c2e]">{order.expected_delivery_date ? new Date(order.expected_delivery_date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : 'To be confirmed'}</span></div>
//             </div>
//             <div className="border-t border-gray-200 pt-4 mt-4">
//               <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Delivery Address</p>
//               <p className="text-sm text-gray-700">{order.address.name}, {order.address.address}, {order.address.city} - {order.address.pincode}</p>
//               <p className="text-sm text-gray-700 mt-1">📞 {order.address.phone}</p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3 justify-center">
//             <Link to="/orders" className="bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg group">
//               View My Orders <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link to="/" className="border-2 border-[#1a3c2e] text-[#1a3c2e] hover:bg-[#1a3c2e] hover:text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors">
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default OrderSuccess;




import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  ArrowRight,
  Leaf,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  ShoppingBag,
  CalendarDays,
  Phone,
  Home,
  Sparkles,
  Copy,
  AlertCircle,
  Clock,
  Box,
  Check,
} from 'lucide-react';

import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

// ---------------------------------------------
// HELPERS
// ---------------------------------------------

const getOrderId = (order) =>
  order?.id ??
  order?.order_id ??
  order?.orderId ??
  order?.order_number ??
  null;

const parseAddress = (address) => {
  if (typeof address === 'string') {
    try {
      return JSON.parse(address);
    } catch {
      return { address };
    }
  }

  return address && typeof address === 'object' ? address : {};
};

const normalizeOrder = (found, user) => {
  if (!found || typeof found !== 'object') return null;

  const rawAddress = parseAddress(
    found.address ||
    found.shipping_address ||
    found.delivery_address
  );

  const payment =
    found.payment_method ||
    found.paymentMethod ||
    found.payment_mode ||
    found.payment_type ||
    rawAddress.paymentMethod ||
    rawAddress.payment_method ||
    'N/A';

  const orderItems =
    found.items ||
    found.order_items ||
    found.products ||
    [];

  return {
    ...found,

    id: getOrderId(found),

    total: Number(
      found.total ??
      found.grand_total ??
      found.total_amount ??
      found.final_total ??
      0
    ),

    subtotal: Number(
      found.subtotal ??
      found.sub_total ??
      0
    ),

    shipping: Number(
      found.shipping ??
      found.shipping_charge ??
      found.delivery_charge ??
      0
    ),

    status:
      found.status ||
      found.order_status ||
      'Confirmed',

    payment_method: payment,

    expected_delivery_date:
      found.expected_delivery_date ||
      found.expectedDeliveryDate ||
      found.delivery_date ||
      null,

    items: Array.isArray(orderItems) ? orderItems : [],

    address: {
      name:
        found.customer_name ||
        found.customerName ||
        found.name ||
        rawAddress.name ||
        user?.name ||
        '',

      address:
        found.delivery_address ||
        rawAddress.address ||
        rawAddress.full_address ||
        rawAddress.street ||
        '',

      city:
        found.city ||
        rawAddress.city ||
        '',

      state:
        found.state ||
        rawAddress.state ||
        '',

      pincode:
        found.pincode ||
        found.zip_code ||
        rawAddress.pincode ||
        rawAddress.zip_code ||
        '',

      phone:
        found.phone ||
        found.mobile ||
        found.phone_number ||
        rawAddress.phone ||
        rawAddress.mobile ||
        user?.phone ||
        '',

      paymentMethod: payment,
    },
  };
};

const formatPrice = (price) =>
  Number(price || 0).toLocaleString('en-IN');

const formatDate = (date) => {
  if (!date) return 'To be confirmed';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return 'To be confirmed';
  }

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getStatus = (status) =>
  String(status || 'Confirmed').toLowerCase();

const getProductName = (item) =>
  item.product_name ||
  item.productName ||
  item.name ||
  item.title ||
  'Plant Product';

const getProductPrice = (item) =>
  Number(
    item.price ??
    item.product_price ??
    item.sale_price ??
    0
  );

const getProductQuantity = (item) =>
  Number(item.quantity ?? item.qty ?? 1);

// ---------------------------------------------
// REUSABLE COMPONENTS
// ---------------------------------------------

const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ed] text-[#2d6a4f]">
      <Icon size={20} />
    </div>

    <div>
      <h2 className="text-base font-bold text-[#1a3c2e]">
        {title}
      </h2>
      <p className="mt-0.5 text-xs text-gray-400">
        {subtitle}
      </p>
    </div>
  </div>
);

const InfoCard = ({ icon: Icon, label, children }) => (
  <div className="rounded-2xl border border-[#edf0e9] bg-[#f8faf6] p-4 transition duration-300 hover:border-[#cbdcca] hover:bg-[#f2f7f0]">
    <div className="mb-3 flex items-center gap-2 text-gray-400">
      <Icon size={15} />
      <span className="text-[11px] font-medium">
        {label}
      </span>
    </div>

    {children}
  </div>
);

// ---------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------

const OrderSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Always start this page from the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [id]);

  // Load order
  useEffect(() => {
    let active = true;

    const loadOrder = async () => {
      setLoading(true);
      setError('');

      try {
        // 1. First check Checkout navigation state
        const passedOrder = location.state?.order;

        if (passedOrder) {
          const candidate =
            passedOrder.order ||
            passedOrder.data?.order ||
            passedOrder.data ||
            passedOrder;

          const candidateId = getOrderId(candidate);

          if (
            candidateId != null &&
            String(candidateId) === String(id)
          ) {
            if (active) {
              setOrder(normalizeOrder(candidate, user));
              setLoading(false);
            }
            return;
          }
        }

        // 2. Fetch from backend
        const response = await api('/orders');

        console.log('ORDERS API RESPONSE:', response);

        // Handle common response structures
        const rows = Array.isArray(response)
          ? response
          : Array.isArray(response?.orders)
          ? response.orders
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.orders)
          ? response.data.orders
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        const found = rows.find((item) => {
          const orderId = getOrderId(item);

          return (
            orderId != null &&
            String(orderId) === String(id)
          );
        });

        if (!active) return;

        if (found) {
          setOrder(normalizeOrder(found, user));
        } else {
          setError(
            'We could not find this order in your order history.'
          );
        }
      } catch (err) {
        console.error('LOAD ORDER ERROR:', err);

        if (active) {
          setError(
            err.message ||
            'Unable to load your order. Please try again.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      active = false;
    };
  }, [id, user, location.state]);

  // Copy order ID
  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(String(order.id));
      setCopied(true);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const paymentMethod = order?.payment_method || 'N/A';

  // ---------------------------------------------
  // LOADING
  // ---------------------------------------------

  if (loading) {
    return (
      <div className="grid min-h-[75vh] place-items-center bg-[#fcfbf7] px-4">
        <div className="text-center">
          <div className="relative mx-auto mb-5 h-14 w-14">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#dcebdc]" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a3c2e] text-white">
              <Leaf size={25} />
            </div>
          </div>

          <h2 className="text-lg font-bold text-[#1a3c2e]">
            Preparing your order details
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Just a moment, we're getting everything ready.
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------
  // ORDER NOT FOUND
  // ---------------------------------------------

  if (!order) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-[#fcfbf7] px-4 py-12">
        <div className="w-full max-w-md rounded-[28px] border border-[#e9ece6] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1ed] text-[#c45b42]">
            <AlertCircle size={30} />
          </div>

          <h2 className="text-xl font-bold text-[#1a3c2e]">
            Order details unavailable
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {error || "We couldn't find your order details."}
          </p>

          <p className="mt-3 text-xs text-gray-400">
            Order reference: #{id}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/orders"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1a3c2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d6a4f]"
            >
              My Orders <ArrowRight size={16} />
            </Link>

            <Link
              to="/"
              className="flex flex-1 items-center justify-center rounded-xl border border-[#dce5da] px-5 py-3 text-sm font-semibold text-[#1a3c2e] hover:bg-[#f2f6ef]"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------
  // MAIN UI
  // ---------------------------------------------

  const status = getStatus(order.status);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfbf7] pb-14">

      {/* =====================================
          SUCCESS HERO
      ====================================== */}

      <section className="relative overflow-hidden bg-[#173b2d] px-4 pb-24 pt-12 sm:px-6 sm:pb-28 sm:pt-16">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#3d7959]/20 blur-[80px]" />
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#a3d9b1]/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">

          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 13,
            }}
            className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#b6e2bd] shadow-[0_0_0_10px_rgba(182,226,189,0.10),0_0_60px_rgba(182,226,189,0.20)] sm:h-28 sm:w-28"
          >
            <CheckCircle
              size={48}
              strokeWidth={1.8}
              className="text-[#173b2d]"
            />

            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full border-2 border-[#b6e2bd]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b6e2bd]/20 bg-white/[0.08] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b6e2bd] sm:text-xs">
              <Leaf size={14} />
              Order Successfully Placed
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Thank you for your order!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Your order has been confirmed. We're getting your plants ready
              and can't wait for them to reach your home.
            </p>

            {/* Order ID */}
            <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 text-left shadow-xl backdrop-blur-md">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#b6e2bd]">
                <Package size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium text-white/50">
                  YOUR ORDER ID
                </p>
                <p className="mt-1 truncate text-base font-bold text-white">
                  #{order.id}
                </p>
              </div>

              <button
                type="button"
                onClick={copyOrderId}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p className="mt-5 text-[11px] text-white/40">
              Keep your order ID handy for future reference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5"
        >

          {/* LEFT COLUMN */}
          <div className="space-y-6 lg:col-span-3">

            {/* Order summary */}
            <section className="rounded-[26px] border border-[#e8ede5] bg-white p-5 shadow-[0_10px_40px_rgba(26,60,46,0.055)] sm:p-7">

              <SectionHeading
                icon={ShoppingBag}
                title="Order Details"
                subtitle="Your purchase information"
              />

              <div className="grid grid-cols-2 gap-3 sm:gap-4">

                <InfoCard icon={CreditCard} label="Total Amount">
                  <p className="text-xl font-extrabold text-[#1a3c2e] sm:text-2xl">
                    ₹{formatPrice(order.total)}
                  </p>
                </InfoCard>

                <InfoCard icon={Package} label="Order Status">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f4e8] px-3 py-2 text-xs font-bold capitalize text-[#287348]">
                    <span className="h-2 w-2 rounded-full bg-[#2d9a58]" />
                    {order.status}
                  </span>
                </InfoCard>

                <InfoCard icon={CreditCard} label="Payment Method">
                  <p className="break-words text-sm font-bold uppercase text-[#1a3c2e]">
                    {paymentMethod}
                  </p>
                </InfoCard>

                <InfoCard icon={CalendarDays} label="Expected Delivery">
                  <p className="text-sm font-bold text-[#1a3c2e]">
                    {formatDate(order.expected_delivery_date)}
                  </p>
                </InfoCard>

              </div>

              {(order.subtotal > 0 || order.shipping > 0) && (
                <div className="mt-5 space-y-3 border-t border-dashed border-[#e5eae1] pt-5 text-sm">
                  {order.subtotal > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{formatPrice(order.subtotal)}</span>
                    </div>
                  )}

                  {order.shipping > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <span>Delivery</span>
                      <span>₹{formatPrice(order.shipping)}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-[#edf0e9] pt-3 font-bold text-[#1a3c2e]">
                    <span>Grand Total</span>
                    <span>₹{formatPrice(order.total)}</span>
                  </div>
                </div>
              )}
            </section>

            {/* Ordered items */}
            {order.items.length > 0 && (
              <section className="rounded-[26px] border border-[#e8ede5] bg-white p-5 shadow-[0_10px_40px_rgba(26,60,46,0.04)] sm:p-7">

                <SectionHeading
                  icon={Box}
                  title="Your Items"
                  subtitle={`${order.items.length} product(s) in this order`}
                />

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={item.id || item.product_id || index}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#f8faf6] p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f2e8] text-[#2d6a4f]">
                          <Leaf size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#1a3c2e]">
                            {getProductName(item)}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Qty: {getProductQuantity(item)}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-[#1a3c2e]">
                        ₹{formatPrice(
                          getProductPrice(item) *
                          getProductQuantity(item)
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Delivery address */}
            <section className="rounded-[26px] border border-[#e8ede5] bg-white p-5 shadow-[0_10px_40px_rgba(26,60,46,0.04)] sm:p-7">

              <SectionHeading
                icon={MapPin}
                title="Delivery Address"
                subtitle="Your order will be delivered here"
              />

              <div className="rounded-2xl border border-[#e8ede5] bg-[#f9fbf7] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2d6a4f] shadow-sm">
                    <Home size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#1a3c2e]">
                      {order.address.name || 'Customer'}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {order.address.address || 'Address not available'}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {[
                        order.address.city,
                        order.address.state,
                        order.address.pincode,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                </div>

                {order.address.phone && (
                  <div className="mt-5 flex items-center gap-3 border-t border-[#e7ebe3] pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2d6a4f]">
                      <Phone size={16} />
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-400">
                        Contact Number
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-[#1a3c2e]">
                        {order.address.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 lg:col-span-2">

            {/* Next steps */}
            <section className="overflow-hidden rounded-[26px] border border-[#e8ede5] bg-white shadow-[0_10px_40px_rgba(26,60,46,0.05)]">

              <div className="relative overflow-hidden bg-[#173b2d] p-6 text-white">
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/10" />

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#b6e2bd]">
                    <Truck size={24} />
                  </div>

                  <h2 className="text-xl font-bold">
                    What's next?
                  </h2>

                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    Here's what happens after placing your order.
                  </p>
                </div>
              </div>

              <div className="p-6">

                <div className="relative space-y-7">

                  {/* Timeline line */}
                  <div className="absolute bottom-5 left-[17px] top-5 w-px bg-[#e2eae0]" />

                  {[
                    {
                      icon: CheckCircle,
                      title: 'Order Confirmed',
                      desc: 'Your order has been successfully placed.',
                      done: true,
                    },
                    {
                      icon: Package,
                      title: 'Careful Packaging',
                      desc: "We'll carefully prepare your plants for delivery.",
                      done: ['processing', 'packed', 'shipped', 'delivered'].includes(status),
                    },
                    {
                      icon: Truck,
                      title: 'On Its Way',
                      desc: 'Your order will be delivered to your doorstep.',
                      done: ['shipped', 'delivered'].includes(status),
                    },
                  ].map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.title}
                        className="relative flex gap-3"
                      >
                        <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          step.done
                            ? 'bg-[#e6f3e6] text-[#2d6a4f]'
                            : 'bg-[#f1f4ef] text-[#91a091]'
                        }`}>
                          <Icon size={17} />
                        </div>

                        <div className="pt-0.5">
                          <p className="text-sm font-bold text-[#1a3c2e]">
                            {step.title}
                          </p>

                          <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Trust card */}
            <div className="relative overflow-hidden rounded-[26px] border border-[#e2ebdf] bg-[#eef5eb] p-5">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/40 blur-2xl" />

              <div className="relative flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2d6a4f] shadow-sm">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#1a3c2e]">
                    Shopping with confidence
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#647767]">
                    Thank you for supporting greener living. We're happy to be a part of your journey.
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery note */}
            <div className="flex items-start gap-3 rounded-2xl border border-[#eee8d8] bg-[#fffcf3] p-4">
              <Clock size={18} className="mt-0.5 shrink-0 text-[#b58a36]" />

              <p className="text-xs leading-relaxed text-[#85744f]">
                Delivery dates are estimates and may vary depending on your location.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =====================================
            BOTTOM CTA
        ====================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-7 overflow-hidden rounded-[28px] border border-[#e8ede5] bg-white p-6 text-center shadow-[0_10px_35px_rgba(26,60,46,0.04)] sm:p-9"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5eb] text-[#2d6a4f]">
            <Sparkles size={22} />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
            A greener tomorrow starts today
          </p>

          <h2 className="mt-3 text-2xl font-bold text-[#1a3c2e] sm:text-3xl">
            Happy planting!
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400">
            Your plants are on their way. Explore more and make your space a little greener.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/orders"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a3c2e] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1a3c2e]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#2d6a4f]"
            >
              View My Orders
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dce5da] bg-white px-7 py-3.5 text-sm font-bold text-[#1a3c2e] transition duration-300 hover:-translate-y-0.5 hover:border-[#2d6a4f] hover:bg-[#f2f6ef]"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>
        </motion.section>

      </div>
    </main>
  );
};

export default OrderSuccess;
