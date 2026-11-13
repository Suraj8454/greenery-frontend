import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Mail, Phone, User, ArrowRight, ShieldCheck, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [step, setStep] = useState('details');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault(); setError('');
    if (!/^\d{10}$/.test(form.phone)) return setError('Enter valid 10-digit phone');
    const res = await signup(form);
    if (res.success) { setStep('otp'); setSuccess(res.message || (res.otp ? `Account created. Test OTP: ${res.otp}` : 'Account created. Verify your phone to continue.'));  }
    else setError(res.error);
  };

  const handleVerify = async (e) => {
    e.preventDefault(); setError('');
    const res = await verifyOtp(form.phone, otp);
    if (res.success) navigate('/');
    else setError(res.error);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] flex items-stretch relative overflow-hidden">
      {/* LEFT — Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a3c2e]">
        <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200"
          alt="Plants" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2a1f]/90 via-[#1a3c2e]/70 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="text-[#a3d9b1] w-9 h-9" />
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Cityscape</h1>
              <h1 className="text-[11px] font-semibold text-[#a3d9b1] tracking-[0.2em] uppercase">Greenery</h1>
            </div>
          </Link>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-4xl xl:text-5xl font-serif font-bold text-white leading-tight mb-4">
              Join the green <br />
              <span className="italic font-light text-[#a3d9b1]">revolution.</span>
            </motion.h2>
            <p className="text-gray-300 text-sm max-w-md">Create your account and get access to exclusive plant collections, offers and expert care tips.</p>
          </div>
          <div className="flex items-center gap-2 text-[#a3d9b1] text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Free shipping for members
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-[#2d6a4f] text-xs font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
            <Leaf className="w-3.5 h-3.5" /> Get started
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">
            {step === 'details' ? 'Create your account' : 'Verify OTP'}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {step === 'details' ? 'Join our green community in seconds' : `OTP sent to ${form.phone}`}
          </p>

          {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-700 text-xs rounded-xl px-4 py-3 mb-4 flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />{success}</motion.div>}
          {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">{error}</motion.div>}

          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.form key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSignup} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
                    <input required value={form.name} onChange={update('name')} placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
                    <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Phone</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
                    <span className="absolute left-10 top-3 text-sm text-gray-500 font-medium">+91</span>
                    <input type="tel" required value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      placeholder="9876543210"
                      className="w-full border border-gray-200 rounded-xl py-3 pl-16 pr-4 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg mt-2">
                  Create Account <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            )}
            {step === 'otp' && (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Enter OTP</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f]" />
                    <input type="text" required value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="1234" maxLength={4}
                      className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm text-center tracking-[0.5em] font-bold focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5">Default OTP: <span className="font-bold text-[#2d6a4f]">1234</span></p>
                </div>
                <button type="submit" className="w-full bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg">
                  Verify & Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account? <Link to="/login" className="text-[#2d6a4f] font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;