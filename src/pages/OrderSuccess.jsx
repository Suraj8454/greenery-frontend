import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Leaf, MapPin, CreditCard } from 'lucide-react';
import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderSuccess = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!user) return; api('/orders').then(rows => { const found = rows.find(o => String(o.id) === String(id)); if (found) setOrder({ ...found, address: { ...found, name: found.customer_name || user.name, paymentMethod: found.payment_method, address: found.address, city: found.city, pincode: found.pincode, phone: found.phone }, total: Number(found.total) }); }).catch(console.error).finally(() => setLoading(false)); }, [id, user]);
  if (loading) return <div className="min-h-[40vh] grid place-items-center">Loading order…</div>;

  if (!order) return <div className="min-h-screen flex items-center justify-center text-gray-500">Order not found</div>;

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
            <Leaf className="w-3.5 h-3.5" /> Success
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-8">Thank you for shopping with us. Your order has been placed successfully.</p>

          <div className="bg-[#fcfbf7] rounded-2xl p-6 text-left mb-6">
            <div className="flex items-center justify-between mb-4">
              <div><p className="text-xs text-gray-500">Order ID</p><p className="font-bold text-[#1a3c2e]">{order.id}</p></div>
              <Package className="w-6 h-6 text-[#2d6a4f]" />
            </div>
            <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
              <div className="flex justify-between"><span className="text-gray-500">Total Amount</span><span className="font-bold text-[#1a3c2e]">₹{order.total}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> Payment</span><span className="font-semibold uppercase text-xs">{order.address.paymentMethod}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-semibold text-green-600">{order.status}</span></div>
              <div className="flex justify-between gap-4"><span className="text-gray-500">Expected delivery</span><span className="text-right font-semibold text-[#1a3c2e]">{order.expected_delivery_date ? new Date(order.expected_delivery_date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : 'To be confirmed'}</span></div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Delivery Address</p>
              <p className="text-sm text-gray-700">{order.address.name}, {order.address.address}, {order.address.city} - {order.address.pincode}</p>
              <p className="text-sm text-gray-700 mt-1">📞 {order.address.phone}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/orders" className="bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg group">
              View My Orders <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/" className="border-2 border-[#1a3c2e] text-[#1a3c2e] hover:bg-[#1a3c2e] hover:text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;