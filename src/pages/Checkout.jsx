import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, User, CreditCard, CheckCircle, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Checkout = () => {
  const { cart, total, subtotal, shipping, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '', phone: user?.phone || '', address: user?.address || '',
    city: user?.city || '', pincode: user?.pincode || '', paymentMethod: 'cod',
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const applyPromo = async () => { setPromoMessage(''); try { const result = await api('/promo-codes/validate', { method: 'POST', body: JSON.stringify({ code: promo, subtotal }) }); setDiscount(result.discount); setAppliedCode(result.code); setPromoMessage(`Promo applied — ₹${result.discount} off`); } catch (e) { setDiscount(0); setAppliedCode(''); setPromoMessage(e.message); } };
  const handleSubmit = async (e) => {
    e.preventDefault(); setPlacing(true); setError('');
    try { const result = await api('/orders', { method: 'POST', body: JSON.stringify({ items: cart, address: form, paymentMethod: form.paymentMethod, subtotal, shipping, total: Math.max(0, total - discount), promoCode: appliedCode }) });
      clearCart(); navigate(`/order-success/${result.orderId}`);
    } catch (err) { setError(err.message || 'Unable to place order. Please try again.'); } finally { setPlacing(false); }
  };

  if (cart.length === 0) { navigate('/cart'); return null; }

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
            <Leaf className="w-3.5 h-3.5" /> Secure Checkout
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">Complete your order</h1>
          <p className="text-gray-500 text-sm mb-8">Just a few more steps to get your greens home</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-base mb-5 flex items-center gap-2 text-[#1a3c2e]"><MapPin className="w-4 h-4 text-[#2d6a4f]" /> Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                  <div className="relative group"><User className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
                    <input required value={form.name} onChange={update('name')} className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div>
                </div>
                <div><label className="text-xs font-semibold text-gray-700 mb-1.5 block">Phone</label>
                  <div className="relative group"><Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
                    <input required value={form.phone} onChange={update('phone')} className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div></div>
                <div><label className="text-xs font-semibold text-gray-700 mb-1.5 block">Pincode</label>
                  <input required value={form.pincode} onChange={update('pincode')} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Address</label>
                  <textarea required rows={3} value={form.address} onChange={update('address')} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 resize-none" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-gray-700 mb-1.5 block">City</label>
                  <input required value={form.city} onChange={update('city')} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" /></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-base mb-5 flex items-center gap-2 text-[#1a3c2e]"><CreditCard className="w-4 h-4 text-[#2d6a4f]" /> Payment Method</h2>
              <div className="space-y-2">
                {[{ id: 'cod', label: 'Cash on Delivery' }, { id: 'upi', label: 'UPI' }, { id: 'card', label: 'Credit / Debit Card' }].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === opt.id ? 'border-[#2d6a4f] bg-[#eef2ed]' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={opt.id} checked={form.paymentMethod === opt.id} onChange={update('paymentMethod')} className="accent-[#2d6a4f]" />
                    <span className="text-sm font-medium">{opt.label}</span>
                    {form.paymentMethod === opt.id && <CheckCircle className="w-4 h-4 text-[#2d6a4f] ml-auto" />}
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-base mb-4 text-[#1a3c2e]">Order Summary</h2>
              <div className="space-y-2 text-xs mb-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedColor || 'default'}`} className="flex justify-between gap-3"><span className="text-gray-600 truncate">{item.name} × {item.qty}{item.colorName ? <span className="block text-[11px] text-gray-500">Colour: {item.colorName}</span> : null}</span><span className="shrink-0 font-semibold">₹{item.price * item.qty}</span></div>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-100 pt-4"><label className="mb-2 block text-xs font-semibold">Promo code</label><div className="flex gap-2"><input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} placeholder="Enter code" className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs"/><button type="button" onClick={applyPromo} className="rounded-lg bg-[#eef2ed] px-3 py-2 text-xs font-bold text-[#1a3c2e]">Apply</button></div>{promoMessage && <p className="mt-2 text-xs text-[#2d6a4f]">{promoMessage}</p>}</div>
              {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}
              <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">₹{subtotal}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">Discount</span><span className="font-semibold text-green-700">−₹{discount}</span></div><div className="flex justify-between text-base pt-2 border-t border-gray-100"><span className="font-bold">Total</span><span className="font-bold text-[#1a3c2e]">₹{Math.max(0, total - discount)}</span></div>
              </div>
              <button disabled={placing} type="submit" className="w-full mt-6 disabled:opacity-60 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm">{placing ? 'Placing order…' : 'Place Order'}</button>
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600"><Truck className="w-4 h-4 text-[#2d6a4f]" /> 3-7 day delivery</div>
                <div className="flex items-center gap-2 text-xs text-gray-600"><ShieldCheck className="w-4 h-4 text-[#2d6a4f]" /> 100% secure payment</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;