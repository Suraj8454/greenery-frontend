// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, User, CreditCard, CheckCircle, Leaf, ShieldCheck, Truck } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { api } from '../utils/api';

// const Checkout = () => {
//   const { cart, total, subtotal, shipping, clearCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [placing, setPlacing] = useState(false);
//   const [error, setError] = useState('');
//   const [promo, setPromo] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState('');
//   const [appliedCode, setAppliedCode] = useState('');
//   const [form, setForm] = useState({
//     name: user?.name || '', phone: user?.phone || '', address: user?.address || '',
//     city: user?.city || '', pincode: user?.pincode || '', paymentMethod: 'cod',
//   });

//   const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   const applyPromo = async () => { setPromoMessage(''); try { const result = await api('/promo-codes/validate', { method: 'POST', body: JSON.stringify({ code: promo, subtotal }) }); setDiscount(result.discount); setAppliedCode(result.code); setPromoMessage(`Promo applied — ₹${result.discount} off`); } catch (e) { setDiscount(0); setAppliedCode(''); setPromoMessage(e.message); } };
//   const handleSubmit = async (e) => {
//     e.preventDefault(); setPlacing(true); setError('');
//     try { const result = await api('/orders', { method: 'POST', body: JSON.stringify({ items: cart, address: form, paymentMethod: form.paymentMethod, subtotal, shipping, total: Math.max(0, total - discount), promoCode: appliedCode }) });
//       clearCart(); navigate(`/order-success/${result.orderId}`);
//     } catch (err) { setError(err.message || 'Unable to place order. Please try again.'); } finally { setPlacing(false); }
//   };

//   if (cart.length === 0) { navigate('/cart'); return null; }

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
//             <Leaf className="w-3.5 h-3.5" /> Secure Checkout
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">Complete your order</h1>
//           <p className="text-gray-500 text-sm mb-8">Just a few more steps to get your greens home</p>
//         </motion.div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-4">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//               <h2 className="font-bold text-base mb-5 flex items-center gap-2 text-[#1a3c2e]"><MapPin className="w-4 h-4 text-[#2d6a4f]" /> Delivery Address</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="sm:col-span-2">
//                   <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Name</label>
//                   <div className="relative group"><User className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
//                     <input required value={form.name} onChange={update('name')} className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div>
//                 </div>
//                 <div><label className="text-xs font-semibold text-gray-700 mb-1.5 block">Phone</label>
//                   <div className="relative group"><Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
//                     <input required value={form.phone} onChange={update('phone')} className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div></div>
//                 <div><label className="text-xs font-semibold text-gray-700 mb-1.5 block">Pincode</label>
//                   <input required value={form.pincode} onChange={update('pincode')} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div>
//                 <div className="sm:col-span-2"><label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Address</label>
//                   <textarea required rows={3} value={form.address} onChange={update('address')} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 resize-none" /></div>
//                 <div className="sm:col-span-2"><label className="text-xs font-semibold text-gray-700 mb-1.5 block">City</label>
//                   <input required value={form.city} onChange={update('city')} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div>
//               </div>
//             </motion.div>

//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
//               <h2 className="font-bold text-base mb-5 flex items-center gap-2 text-[#1a3c2e]"><CreditCard className="w-4 h-4 text-[#2d6a4f]" /> Payment Method</h2>
//               <div className="space-y-2">
//                 {[{ id: 'cod', label: 'Cash on Delivery' }, { id: 'upi', label: 'UPI' }, { id: 'card', label: 'Credit / Debit Card' }].map(opt => (
//                   <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === opt.id ? 'border-[#2d6a4f] bg-[#eef2ed]' : 'border-gray-200 hover:border-gray-300'}`}>
//                     <input type="radio" name="payment" value={opt.id} checked={form.paymentMethod === opt.id} onChange={update('paymentMethod')} className="accent-[#2d6a4f]" />
//                     <span className="text-sm font-medium">{opt.label}</span>
//                     {form.paymentMethod === opt.id && <CheckCircle className="w-4 h-4 text-[#2d6a4f] ml-auto" />}
//                   </label>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
//               <h2 className="font-bold text-base mb-4 text-[#1a3c2e]">Order Summary</h2>
//               <div className="space-y-2 text-xs mb-4 max-h-48 overflow-y-auto">
//                 {cart.map(item => (
//                   <div key={`${item.id}-${item.selectedColor || 'default'}`} className="flex justify-between gap-3"><span className="text-gray-600 truncate">{item.name} × {item.qty}{item.colorName ? <span className="block text-[11px] text-gray-500">Colour: {item.colorName}</span> : null}</span><span className="shrink-0 font-semibold">₹{item.price * item.qty}</span></div>
//                 ))}
//               </div>
//               <div className="mt-4 border-t border-gray-100 pt-4"><label className="mb-2 block text-xs font-semibold">Promo code</label><div className="flex gap-2"><input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} placeholder="Enter code" className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs"/><button type="button" onClick={applyPromo} className="rounded-lg bg-[#eef2ed] px-3 py-2 text-xs font-bold text-[#1a3c2e]">Apply</button></div>{promoMessage && <p className="mt-2 text-xs text-[#2d6a4f]">{promoMessage}</p>}</div>
//               {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}
//               <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
//                 <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">₹{subtotal}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
//                 <div className="flex justify-between text-xs"><span className="text-gray-500">Discount</span><span className="font-semibold text-green-700">−₹{discount}</span></div><div className="flex justify-between text-base pt-2 border-t border-gray-100"><span className="font-bold">Total</span><span className="font-bold text-[#1a3c2e]">₹{Math.max(0, total - discount)}</span></div>
//               </div>
//               <button disabled={placing} type="submit" className="w-full mt-6 disabled:opacity-60 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm">{placing ? 'Placing order…' : 'Place Order'}</button>
//               <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
//                 <div className="flex items-center gap-2 text-xs text-gray-600"><Truck className="w-4 h-4 text-[#2d6a4f]" /> 3-7 day delivery</div>
//                 <div className="flex items-center gap-2 text-xs text-gray-600"><ShieldCheck className="w-4 h-4 text-[#2d6a4f]" /> 100% secure payment</div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



import React, { useState, useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, User, CreditCard, CheckCircle,
  Leaf, ShieldCheck, Truck, Tag, Package,
  ArrowRight, LockKeyhole, ShoppingBag, Ticket,
  Home, Wallet, Banknote, X, Sparkles
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Checkout = () => {
  const { cart, total, subtotal, shipping, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const orderPlacedRef = useRef(false);

  const [placing, setPlacing] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);

  const [error, setError] = useState('');
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [appliedCode, setAppliedCode] = useState('');

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || '',
    paymentMethod: 'cod',
  });

  // Redirect when cart is empty
  useEffect(() => {
  if (cart.length === 0 && !orderPlacedRef.current) {
    navigate('/cart', { replace: true });
  }
}, [cart.length, navigate]);


  const update = (key) => (e) => {
    setForm(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // Final payable amount
  const finalTotal = Math.max(
    0,
    Number(total || 0) - Number(discount || 0)
  );

  // Apply promo code
  const applyPromo = async () => {
    if (applyingPromo) return;

    if (!promo.trim()) {
      setPromoMessage('Please enter a promo code.');
      return;
    }

    setApplyingPromo(true);
    setPromoMessage('');

    try {
      const result = await api('/promo-codes/validate', {
        method: 'POST',
        body: JSON.stringify({
          code: promo.trim(),
          subtotal: Number(subtotal || 0),
        }),
      });

      const discountAmount = Number(result?.discount) || 0;

      if (discountAmount <= 0) {
        throw new Error('This promo code does not provide a valid discount.');
      }

      setDiscount(discountAmount);
      setAppliedCode(result?.code || promo.trim().toUpperCase());

      setPromoMessage(
        `Success! ₹${discountAmount.toLocaleString('en-IN')} discount applied.`
      );
    } catch (err) {
      setDiscount(0);
      setAppliedCode('');
      setPromoMessage(err.message || 'Invalid promo code.');
    } finally {
      setApplyingPromo(false);
    }
  };

  // Remove promo code
  const removePromo = () => {
    setPromo('');
    setDiscount(0);
    setAppliedCode('');
    setPromoMessage('');
  };

  // Place order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (placing) return;

    if (!cart.length) {
      navigate('/cart', { replace: true });
      return;
    }

    // Basic validation
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.pincode.trim()
    ) {
      setError('Please fill in all delivery details.');
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    setPlacing(true);
    setError('');

    try {
      const result = await api('/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: cart,
          address: form,
          paymentMethod: form.paymentMethod,
          subtotal: Number(subtotal || 0),
          shipping: Number(shipping || 0),
          total: finalTotal,
          promoCode: appliedCode,
        }),
      });

      // Debug: inspect backend response
      console.log('ORDER API RESPONSE:', result);

      // Read order ID from common response formats
      const orderId =
        result?.orderId ??
        result?.order_id ??
        result?.order?.id ??
        result?.order?.orderId ??
        result?.id;

     if (!orderId) {
  console.error('Order ID not found in response:', result);

  throw new Error(
    'Order was submitted, but the server did not return an order ID. Please check your orders before trying again.'
  );
}

// Prevent empty-cart effect from redirecting to /cart
orderPlacedRef.current = true;

// Clear cart only after successful order creation
clearCart();

// Navigate to success page
navigate(`/order-success/${encodeURIComponent(orderId)}`, {
  replace: true,
  state: {
    order: result?.order || result?.data?.order || result,
  },
});

    } catch (err) {
      console.error('PLACE ORDER ERROR:', err);

      setError(
        err.message || 'Unable to place order. Please try again.'
      );
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  const paymentOptions = [
    {
      id: 'cod',
      label: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: Banknote,
    },
    {
      id: 'upi',
      label: 'UPI Payment',
      description: 'Google Pay, PhonePe, Paytm',
      icon: Wallet,
    },
    {
      id: 'card',
      label: 'Credit / Debit Card',
      description: 'Visa, Mastercard and more',
      icon: CreditCard,
    },
  ];

  const inputClass =
    'w-full rounded-xl border border-[#e8ebe5] bg-[#fcfdfb] px-4 py-3 text-sm text-[#1a3c2e] placeholder:text-gray-400 outline-none transition-all focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10';

  const labelClass =
    'mb-2 block text-xs font-semibold tracking-wide text-[#344b3e]';

  return (
    <div className="min-h-screen bg-[#fcfbf7] pb-12 font-['DM_Sans',sans-serif]">

      {/* Header */}
      <div className="relative overflow-hidden bg-[#1a3c2e] px-4 pb-10 pt-9 sm:px-6 sm:pb-12 sm:pt-12">

        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-60 w-60 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#2d6a4f]/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a3d9b1] sm:text-xs">
            <Leaf size={15} />
            Cityscape Greenery
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
                <LockKeyhole size={12} />
                Secure Checkout
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Complete your order
              </h1>

              <p className="mt-2 max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
                Just a few more steps to bring a little greenery into your space.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/75">
              <ShoppingBag size={16} className="text-[#a3d9b1]" />
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
            </div>

          </div>

          {/* Checkout Progress */}
          <div className="mt-8 flex max-w-md items-center gap-3">

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a3d9b1] text-[#1a3c2e]">
                <CheckCircle size={15} />
              </span>
              <span className="text-[10px] font-semibold text-white sm:text-xs">
                Cart
              </span>
            </div>

            <div className="h-px flex-1 bg-white/25" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#a3d9b1] bg-[#2d6a4f] text-xs font-bold text-white">
                2
              </span>
              <span className="text-[10px] font-semibold text-white sm:text-xs">
                Checkout
              </span>
            </div>

            <div className="h-px flex-1 bg-white/25" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-xs text-white/70">
                3
              </span>
              <span className="text-[10px] font-semibold text-white/60 sm:text-xs">
                Complete
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto -mt-2 max-w-6xl px-3 pt-7 sm:px-6 sm:pt-9 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8"
        >

          {/* Left Column */}
          <div className="space-y-5 lg:col-span-2">

            {/* Delivery Address */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-2xl border border-[#e9ece6] bg-white shadow-[0_4px_25px_rgba(26,60,46,0.035)] sm:rounded-3xl"
            >

              <div className="flex items-center justify-between border-b border-[#eef0eb] px-4 py-4 sm:px-6 sm:py-5">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ee] text-[#2d6a4f]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-[#1a3c2e] sm:text-base">
                      Delivery Address
                    </h2>
                    <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
                      Where should we deliver your plants?
                    </p>
                  </div>
                </div>

                <span className="hidden rounded-full bg-[#eef4ee] px-3 py-1 text-[10px] font-semibold text-[#2d6a4f] sm:inline-block">
                  Required details
                </span>

              </div>

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">

                <div className="sm:col-span-2">
                  <label className={labelClass}>Full Name</label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />

                    <input
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Enter your full name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="Enter phone number"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Pincode</label>

                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={form.pincode}
                    onChange={update('pincode')}
                    placeholder="6-digit pincode"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Full Address</label>

                  <div className="relative">
                    <Home className="absolute left-3.5 top-3.5 text-gray-400" size={17} />

                    <textarea
                      required
                      rows={3}
                      value={form.address}
                      onChange={update('address')}
                      placeholder="House no., street, area, landmark..."
                      className={`${inputClass} min-h-[100px] resize-none pl-11`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>City</label>

                  <input
                    required
                    value={form.city}
                    onChange={update('city')}
                    placeholder="Enter your city"
                    className={inputClass}
                  />
                </div>

              </div>
            </motion.section>

            {/* Payment Method */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="overflow-hidden rounded-2xl border border-[#e9ece6] bg-white shadow-[0_4px_25px_rgba(26,60,46,0.035)] sm:rounded-3xl"
            >

              <div className="flex items-center gap-3 border-b border-[#eef0eb] px-4 py-4 sm:px-6 sm:py-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ee] text-[#2d6a4f]">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#1a3c2e] sm:text-base">
                    Payment Method
                  </h2>
                  <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
                    Choose how you want to pay
                  </p>
                </div>

              </div>

              <div className="space-y-3 p-4 sm:p-6">

                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = form.paymentMethod === option.id;

                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all sm:gap-4 sm:p-4 ${
                        selected
                          ? 'border-[#2d6a4f] bg-[#f1f6f0] shadow-sm'
                          : 'border-[#e9ece6] bg-white hover:border-[#b9cbbd]'
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value={option.id}
                        checked={selected}
                        onChange={update('paymentMethod')}
                        className="sr-only"
                      />

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          selected
                            ? 'bg-[#1a3c2e] text-white'
                            : 'bg-[#f3f5f1] text-[#66806c]'
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#1a3c2e] sm:text-sm">
                          {option.label}
                        </p>
                        <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                          {option.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? 'border-[#2d6a4f] bg-[#2d6a4f] text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {selected && <CheckCircle size={13} />}
                      </div>

                    </label>
                  );
                })}

              </div>
            </motion.section>

            {/* Trust Information */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">

              {[
                { icon: ShieldCheck, title: 'Secure', desc: 'Safe checkout' },
                { icon: Truck, title: 'Reliable', desc: '3-7 day delivery' },
                { icon: Leaf, title: 'Fresh', desc: 'Carefully packed' },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center justify-center rounded-2xl border border-[#e9ece6] bg-white px-2 py-4 text-center sm:flex-row sm:gap-2 sm:py-3"
                  >
                    <Icon size={18} className="mb-2 text-[#2d6a4f] sm:mb-0" />

                    <div>
                      <p className="text-[10px] font-bold text-[#1a3c2e] sm:text-xs">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Right: Order Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="lg:sticky lg:top-24"
          >

            <div className="overflow-hidden rounded-2xl border border-[#e9ece6] bg-white shadow-[0_6px_30px_rgba(26,60,46,0.055)] sm:rounded-3xl">

              {/* Summary Header */}
              <div className="flex items-center justify-between bg-[#1a3c2e] px-5 py-5 text-white sm:px-6">

                <div>
                  <h2 className="text-base font-bold sm:text-lg">
                    Order Summary
                  </h2>
                  <p className="mt-1 text-[10px] text-white/60 sm:text-xs">
                    Review your items
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <ShoppingBag size={19} className="text-[#a3d9b1]" />
                </div>

              </div>

              {/* Cart Items */}
              <div className="max-h-64 space-y-4 overflow-y-auto p-4 sm:p-5">

                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor || 'default'}`}
                    className="flex items-start justify-between gap-3"
                  >

                    <div className="flex min-w-0 items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ed] text-[#2d6a4f]">
                        <Package size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-[#1a3c2e]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          Qty: {item.qty}
                        </p>

                        {item.colorName && (
                          <p className="mt-1 text-[10px] text-gray-500">
                            Colour: {item.colorName}
                          </p>
                        )}
                      </div>

                    </div>

                    <p className="shrink-0 text-xs font-bold text-[#1a3c2e]">
                      ₹{(Number(item.price) * Number(item.qty)).toLocaleString('en-IN')}
                    </p>

                  </div>
                ))}

              </div>

              {/* Promo Code */}
              <div className="border-y border-dashed border-[#e5e9e1] bg-[#fafbf8] p-4 sm:p-5">

                <div className="mb-3 flex items-center gap-2">
                  <Ticket size={16} className="text-[#2d6a4f]" />
                  <span className="text-xs font-bold text-[#1a3c2e]">
                    Have a promo code?
                  </span>
                </div>

                {appliedCode ? (

                  <div className="flex items-center justify-between rounded-xl border border-[#cbdcca] bg-[#edf5ec] p-3">

                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#2d6a4f]" />

                      <div>
                        <p className="text-xs font-bold text-[#1a3c2e]">
                          {appliedCode}
                        </p>
                        <p className="text-[10px] text-[#2d6a4f]">
                          ₹{discount.toLocaleString('en-IN')} discount applied
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removePromo}
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-red-500"
                      aria-label="Remove promo code"
                    >
                      <X size={15} />
                    </button>

                  </div>

                ) : (

                  <div className="flex gap-2">

                    <div className="relative min-w-0 flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        value={promo}
                        onChange={(e) => {
                          setPromo(e.target.value.toUpperCase());
                          setPromoMessage('');
                        }}
                        placeholder="Enter code"
                        className="w-full rounded-xl border border-[#e5e9e1] bg-white py-3 pl-9 pr-3 text-xs uppercase outline-none transition focus:border-[#2d6a4f]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={applyPromo}
                      disabled={applyingPromo}
                      className="shrink-0 rounded-xl bg-[#eaf1e9] px-4 text-xs font-bold text-[#1a3c2e] transition hover:bg-[#dce9dc] disabled:opacity-50"
                    >
                      {applyingPromo ? 'Applying...' : 'Apply'}
                    </button>

                  </div>

                )}

                {promoMessage && (
                  <p
                    className={`mt-2 text-[10px] ${
                      appliedCode ? 'text-[#2d6a4f]' : 'text-red-500'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}

              </div>

              {/* Price Details */}
              <div className="space-y-3 p-4 sm:p-5">

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-[#1a3c2e]">
                    ₹{Number(subtotal || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Shipping</span>

                  <span className="font-semibold text-[#1a3c2e]">
                    {Number(shipping || 0) === 0
                      ? 'FREE'
                      : `₹${Number(shipping).toLocaleString('en-IN')}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Promo discount</span>

                    <span className="font-semibold text-[#2d6a4f]">
                      −₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="border-t border-dashed border-[#e5e9e1] pt-4">

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1a3c2e]">
                      Total Amount
                    </span>

                    <span className="text-xl font-bold tracking-tight text-[#1a3c2e]">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="mt-1 text-right text-[10px] text-gray-400">
                    Inclusive of applicable charges
                  </p>

                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs leading-relaxed text-red-600">
                    {error}
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  disabled={placing}
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a3c2e] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1a3c2e]/10 transition-all hover:bg-[#2d6a4f] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {placing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Placing your order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                </button>

                <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-gray-400">
                  <LockKeyhole size={12} />
                  Your information is safe and secure
                </div>

              </div>
            </div>

            {/* Small Note */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#e7ece4] bg-[#f2f6ef] p-4">
              <Sparkles size={17} className="mt-0.5 shrink-0 text-[#2d6a4f]" />

              <p className="text-[10px] leading-relaxed text-[#526b58] sm:text-xs">
                Your plants will be carefully packed and delivered with love. Thank you for choosing greener living!
              </p>
            </div>

          </motion.aside>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
