// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Leaf, Phone, ShieldCheck, ArrowRight, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [step, setStep] = useState('phone');
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const { sendOtp, verifyOtp } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || '/';

//   const handleSendOtp = async (e) => {
//     e.preventDefault(); setError(''); setSuccess('');
//     const res = await sendOtp(phone);
//     if (res.success) { setStep('otp'); setSuccess(res.message || (res.otp ? `Test OTP: ${res.otp}` : 'OTP request successful.'));  }
//     else setError(res.error);
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault(); setError('');
//     const res = await verifyOtp(phone, otp);
//     if (res.success) navigate(from, { replace: true });
//     else setError(res.error);
//   };

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] flex items-stretch relative overflow-hidden">
//       {/* LEFT — Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a3c2e]">
//         <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1200"
//           alt="Plants" className="absolute inset-0 w-full h-full object-cover opacity-40" />
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0f2a1f]/90 via-[#1a3c2e]/70 to-transparent"></div>
//         <div className="relative z-10 flex flex-col justify-between p-12 w-full">
//           <Link to="/" className="flex items-center gap-2">
//             <Leaf className="text-[#a3d9b1] w-9 h-9" />
//             <div>
//               <h1 className="text-xl font-bold text-white leading-tight">Cityscape</h1>
//               <h1 className="text-[11px] font-semibold text-[#a3d9b1] tracking-[0.2em] uppercase">Greenery</h1>
//             </div>
//           </Link>
//           <div>
//             <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
//               className="text-4xl xl:text-5xl font-serif font-bold text-white leading-tight mb-4">
//               Welcome back to your <br />
//               <span className="italic font-light text-[#a3d9b1]">green sanctuary.</span>
//             </motion.h2>
//             <p className="text-gray-300 text-sm max-w-md">Continue your journey with premium plants, stylish pots and expert gardening tips.</p>
//           </div>
//           <div className="flex items-center gap-2 text-[#a3d9b1] text-xs tracking-widest uppercase">
//             <Sparkles className="w-3.5 h-3.5" /> Trusted by 1000+ plant parents
//           </div>
//         </div>
//       </div>

//       {/* RIGHT — Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-16">
//         <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
//           <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-[#2d6a4f] text-xs font-semibold mb-6 hover:gap-3 transition-all">
//             <ArrowLeft className="w-4 h-4" /> Back to Home
//           </Link>

//           <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
//             <Leaf className="w-3.5 h-3.5" /> Welcome back
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">
//             {step === 'phone' ? 'Login with OTP' : 'Verify OTP'}
//           </h1>
//           <p className="text-gray-500 text-sm mb-8">
//             {step === 'phone' ? 'Enter your registered phone number' : `Enter the 4-digit OTP sent to ${phone}`}
//           </p>

//           {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-700 text-xs rounded-xl px-4 py-3 mb-4 flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />{success}</motion.div>}
//           {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">{error}</motion.div>}

//           <AnimatePresence mode="wait">
//             {step === 'phone' && (
//               <motion.form key="phone" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSendOtp} className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Phone Number</label>
//                   <div className="relative group">
//                     <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f] transition-colors" />
//                     <span className="absolute left-10 top-3 text-sm text-gray-500 font-medium">+91</span>
//                     <input type="tel" required value={phone}
//                       onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                       placeholder="9876543210"
//                       className="w-full border border-gray-200 rounded-xl py-3 pl-16 pr-4 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
//                   </div>
//                   <p className="text-[10px] text-gray-400 mt-1.5">Try: 9876543210, 9876543211, 9876543212</p>
//                 </div>
//                 <button type="submit" className="w-full bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg group">
//                   Send OTP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </motion.form>
//             )}
//             {step === 'otp' && (
//               <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleVerify} className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Enter OTP</label>
//                   <div className="relative group">
//                     <ShieldCheck className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#2d6a4f] transition-colors" />
//                     <input type="text" required value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
//                       placeholder="1234" maxLength={4}
//                       className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm text-center tracking-[0.5em] font-bold focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
//                   </div>
//                   <p className="text-[10px] text-gray-400 mt-1.5">Default OTP: <span className="font-bold text-[#2d6a4f]">1234</span></p>
//                 </div>
//                 <button type="submit" className="w-full bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg">
//                   Verify & Login <ArrowRight className="w-4 h-4" />
//                 </button>
//                 <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); }} className="w-full text-xs text-gray-500 hover:text-[#2d6a4f]">Change phone number</button>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           <p className="text-center text-sm text-gray-500 mt-8">
//             New here? <Link to="/signup" className="text-[#2d6a4f] font-semibold hover:underline">Create account</Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Phone,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  LockKeyhole,
  Flower2,
  Sprout,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);

      const res = await sendOtp(phone);

      if (res.success) {
        setStep('otp');
        setSuccess(
          res.message ||
          (res.otp ? `Test OTP: ${res.otp}` : 'OTP request successful.')
        );
      } else {
        setError(res.error || 'Unable to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 4) {
      setError('Please enter the complete 4-digit OTP.');
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp(phone, otp);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const changePhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center p-0 sm:p-4 lg:p-6 font-['DM_Sans',sans-serif] overflow-hidden">

      <div className="w-full max-w-[1200px] min-h-screen sm:min-h-[720px] lg:min-h-[760px] bg-white sm:rounded-[28px] overflow-hidden shadow-none sm:shadow-[0_20px_80px_rgba(26,60,46,0.12)] grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE - DESKTOP HERO */}
        <div className="hidden lg:block relative min-h-full bg-[#1a3c2e] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=85&w=1400"
            alt="Beautiful indoor plants"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[#10271d]/95 via-[#1a3c2e]/75 to-[#1a3c2e]/30" />

          {/* Decorative circles */}
          <div className="absolute -top-32 -left-32 w-96 h-96 border border-white/10 rounded-full" />
          <div className="absolute -top-20 -left-20 w-72 h-72 border border-white/10 rounded-full" />
          <div className="absolute bottom-[-130px] right-[-100px] w-[400px] h-[400px] border border-white/10 rounded-full" />

          <div className="relative z-10 h-full min-h-[760px] flex flex-col justify-between p-10 xl:p-14">

            {/* BRAND */}
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <div className="w-12 h-12 bg-[#a3d9b1]/15 border border-[#a3d9b1]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#a3d9b1]/25 transition-colors">
                <Leaf className="w-7 h-7 text-[#a3d9b1]" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Cityscape
                </h1>
                <p className="text-[10px] font-semibold text-[#a3d9b1] tracking-[0.3em] uppercase">
                  Greenery
                </p>
              </div>
            </Link>

            {/* HERO CONTENT */}
            <div className="max-w-lg py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-7"
              >
                <Sparkles className="w-4 h-4 text-[#a3d9b1]" />
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/90 font-semibold">
                  Bring nature closer
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl xl:text-[58px] font-semibold text-white leading-[1.12] tracking-tight mb-6"
              >
                Make room for
                <span className="block text-[#a3d9b1]">
                  something green.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/65 text-sm leading-7 max-w-md"
              >
                Discover beautiful plants, thoughtfully designed planters
                and everything you need to create your own green sanctuary.
              </motion.p>

              {/* FEATURE POINTS */}
              <div className="mt-10 space-y-4">
                {[
                  'Carefully selected premium plants',
                  'Beautiful additions for every space',
                  'A greener lifestyle, made simple',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.12 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#a3d9b1]/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#a3d9b1]" />
                    </div>
                    <span className="text-white/80 text-xs">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* BOTTOM */}
            <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#a3d9b1]" />
                Secure & easy login
              </div>

              <div className="flex items-center gap-2 text-[#a3d9b1] text-xs">
                <Sprout className="w-4 h-4" />
                Grow with nature
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN */}
        <div className="relative flex flex-col min-h-screen lg:min-h-full bg-[#fcfbf7] overflow-hidden">

          {/* MOBILE HERO */}
          <div className="lg:hidden relative bg-[#1a3c2e] overflow-hidden px-5 pt-7 pb-14 sm:pt-9 sm:pb-16">

            <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -top-12 -right-4 w-40 h-40 rounded-full border border-white/10" />
            <div className="absolute bottom-[-75px] left-[-45px] w-44 h-44 rounded-full bg-[#a3d9b1]/10 blur-2xl" />

            <div className="relative z-10 flex items-center justify-between">

              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#a3d9b1]/15 border border-white/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[#a3d9b1]" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-white leading-tight">
                    Cityscape
                  </h2>
                  <p className="text-[9px] text-[#a3d9b1] tracking-[0.25em] uppercase font-semibold">
                    Greenery
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#a3d9b1]" />
                <span className="text-[9px] uppercase tracking-wider text-white/80 font-semibold">
                  Go Green
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-9 sm:mt-11">
              <div className="flex items-center gap-2 text-[#a3d9b1] text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">
                <span className="w-5 h-px bg-[#a3d9b1]" />
                Welcome to nature
              </div>

              <h2 className="text-[29px] sm:text-4xl text-white font-semibold leading-tight tracking-tight">
                Your little green
                <span className="text-[#a3d9b1]"> world awaits.</span>
              </h2>

              <p className="text-white/60 text-xs sm:text-sm mt-3 max-w-[310px] leading-6">
                Sign in and bring a little more nature into your everyday life.
              </p>
            </div>

            {/* Decorative plant icons */}
            <div className="absolute right-5 bottom-6 opacity-20">
              <Flower2 className="w-20 h-20 text-[#a3d9b1] stroke-[0.8]" />
            </div>
          </div>

          {/* FORM AREA */}
          <div className="relative flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">

            {/* Mobile decorative background */}
            <div className="absolute top-10 right-[-65px] w-40 h-40 rounded-full bg-[#a3d9b1]/10 blur-3xl pointer-events-none lg:hidden" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative z-10 w-full max-w-[410px] -mt-14 sm:-mt-16 lg:mt-0"
            >

              {/* MOBILE CARD / DESKTOP FORM */}
              <div className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 lg:p-0 shadow-[0_12px_40px_rgba(26,60,46,0.07)] lg:shadow-none border border-[#1a3c2e]/[0.06] lg:border-0">

                {/* FORM TOP */}
                <div className="mb-6 sm:mb-7">

                  <div className="flex items-center gap-2 text-[#2d6a4f] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                    <Leaf className="w-3.5 h-3.5" />
                    {step === 'phone' ? 'Welcome back' : 'Almost there'}
                  </div>

                  <h1 className="text-[26px] sm:text-3xl lg:text-[34px] font-bold text-[#1a3c2e] tracking-tight leading-tight">
                    {step === 'phone'
                      ? 'Login to your account'
                      : 'Verify your number'}
                  </h1>

                  <p className="text-[#1a3c2e]/55 text-xs sm:text-sm mt-2 leading-relaxed">
                    {step === 'phone'
                      ? 'Enter your mobile number to continue your green journey.'
                      : `We are verifying your mobile number +91 ${phone}. Enter your 4-digit OTP below.`}
                  </p>
                </div>

                {/* STEP INDICATOR */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1 flex-1 rounded-full ${step === 'phone' ? 'bg-[#2d6a4f]' : 'bg-[#a3d9b1]'}`} />
                  <div className={`h-1 flex-1 rounded-full ${step === 'otp' ? 'bg-[#2d6a4f]' : 'bg-[#e8ece7]'}`} />
                </div>

                {/* SUCCESS MESSAGE */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-[#a3d9b1]/20 border border-[#2d6a4f]/10 text-[#1a3c2e] text-xs rounded-xl px-3.5 py-3 mb-4 flex items-start gap-2"
                    >
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#2d6a4f]" />
                      <span className="leading-relaxed">{success}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ERROR MESSAGE */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-3.5 py-3 mb-4"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* FORMS */}
                <AnimatePresence mode="wait">

                  {/* PHONE FORM */}
                  {step === 'phone' && (
                    <motion.form
                      key="phone"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleSendOtp}
                      className="space-y-5"
                    >
                      <div>
                        <label className="text-xs font-semibold text-[#1a3c2e] mb-2 block">
                          Mobile number
                        </label>

                        <div className="relative group">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2d6a4f]">
                            <Phone className="w-[17px] h-[17px]" />
                          </div>

                          <div className="absolute left-10 top-1/2 -translate-y-1/2 h-5 w-px bg-[#1a3c2e]/15" />

                          <span className="absolute left-[51px] top-1/2 -translate-y-1/2 text-sm font-semibold text-[#1a3c2e]">
                            +91
                          </span>

                          <input
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            required
                            value={phone}
                            onChange={(e) =>
                              setPhone(
                                e.target.value.replace(/\D/g, '').slice(0, 10)
                              )
                            }
                            placeholder="Enter mobile number"
                            className="w-full bg-[#fcfbf7] border border-[#1a3c2e]/15 rounded-xl py-3.5 pl-[88px] pr-4 text-sm text-[#1a3c2e] placeholder:text-[#1a3c2e]/30 outline-none transition-all focus:bg-white focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                          />
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-[10px] text-[#1a3c2e]/40">
                            Enter your 10-digit mobile number.
                          </p>

                          <span className="text-[10px] font-semibold text-[#2d6a4f] tabular-nums">
                            {phone.length}/10
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || phone.length !== 10}
                        className="w-full bg-[#1a3c2e] hover:bg-[#2d6a4f] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_8px_18px_rgba(26,60,46,0.15)] hover:shadow-[0_10px_24px_rgba(26,60,46,0.2)]"
                      >
                        {loading ? 'Sending OTP...' : 'Continue with OTP'}
                        {!loading && (
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[10px] text-[#1a3c2e]/45">
                        <LockKeyhole className="w-3.5 h-3.5" />
                        Your login is safe and secure
                      </div>
                    </motion.form>
                  )}

                  {/* OTP FORM */}
                  {step === 'otp' && (
                    <motion.form
                      key="otp"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleVerify}
                      className="space-y-5"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-[#1a3c2e]">
                            One-time password
                          </label>

                          <button
                            type="button"
                            onClick={changePhone}
                            className="text-[10px] font-semibold text-[#2d6a4f] hover:underline"
                          >
                            Change number
                          </button>
                        </div>

                        <div className="relative">
                          <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#2d6a4f]" />

                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            required
                            value={otp}
                            onChange={(e) =>
                              setOtp(
                                e.target.value.replace(/\D/g, '').slice(0, 4)
                              )
                            }
                            placeholder="Enter 4-digit OTP"
                            maxLength={4}
                            className="w-full bg-[#fcfbf7] border border-[#1a3c2e]/15 rounded-xl py-4 pl-11 pr-4 text-center text-lg tracking-[0.6em] font-bold text-[#1a3c2e] placeholder:text-xs placeholder:tracking-normal placeholder:font-normal placeholder:text-[#1a3c2e]/30 outline-none transition-all focus:bg-white focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                          />
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <p className="text-[10px] text-[#1a3c2e]/45">
                            OTP sent to +91 {phone}
                          </p>
                          <span className="text-[10px] text-[#2d6a4f] font-semibold">
                            {otp.length}/4
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || otp.length !== 4}
                        className="w-full bg-[#1a3c2e] hover:bg-[#2d6a4f] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_18px_rgba(26,60,46,0.15)]"
                      >
                        {loading ? 'Verifying...' : 'Verify & Login'}
                        {!loading && <ArrowRight className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={changePhone}
                        className="w-full text-xs font-medium text-[#1a3c2e]/55 hover:text-[#2d6a4f] transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Use a different mobile number
                      </button>

                      <div className="flex items-center justify-center gap-2 bg-[#a3d9b1]/15 border border-[#2d6a4f]/10 rounded-xl py-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                        <span className="text-[10px] text-[#1a3c2e]/65">
                          Secure OTP verification
                        </span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* SIGNUP */}
                <div className="mt-7 pt-5 border-t border-[#1a3c2e]/10">
                  <p className="text-center text-xs text-[#1a3c2e]/55">
                    New to Cityscape Greenery?{' '}
                    <Link
                      to="/signup"
                      className="text-[#2d6a4f] font-bold hover:underline"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </div>

              {/* BOTTOM TEXT */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-[#1a3c2e]/40">
                  <Leaf className="w-3.5 h-3.5" />
                  <span className="text-[10px] tracking-wide">
                    Growing happiness, one plant at a time.
                  </span>
                </div>

                <Link
                  to="/"
                  className="lg:hidden inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2d6a4f] mt-4 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
