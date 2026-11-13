// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin, Send, CheckCircle, Leaf } from 'lucide-react';
// import { api } from '../utils/api';
// import { useState as useReactState, useEffect } from 'react';

// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const [sent, setSent] = useState(false);
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState('');
//   const [settings, setSettings] = useReactState({});
//   useEffect(() => { api('/settings').then(setSettings).catch(() => {}); }, []);
//   const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault(); setSending(true); setError(''); setSent(false);
//     try { await api('/contact', { method: 'POST', body: JSON.stringify(form) }); setSent(true); setForm({ name: '', email: '', phone: '', message: '' }); }
//     catch (err) { setError(err.message || 'Could not send your message. Please try again.'); }
//     finally { setSending(false); }
//   };

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] py-16 px-4">
//       <div className="max-w-5xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
//             <Leaf className="w-3.5 h-3.5" /> Contact Us
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-3">
//             Let's talk about <span className="italic text-[#2d6a4f]">green</span>
//           </h1>
//           <p className="text-gray-500 text-sm max-w-lg mx-auto">Have a question about plants, orders, or bulk? We're here to help.</p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
//               <h2 className="font-bold text-lg text-[#1a3c2e] mb-5">Get in touch</h2>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-[#eef2ed] flex items-center justify-center shrink-0">
//                     <MapPin className="w-5 h-5 text-[#2d6a4f]" />
//                   </div>
//                   <div><p className="text-xs text-gray-500 mb-1">Visit us</p><p className="text-sm text-gray-700">{settings.address || 'Contact address will be updated soon'}</p></div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-[#eef2ed] flex items-center justify-center shrink-0">
//                     <Phone className="w-5 h-5 text-[#2d6a4f]" />
//                   </div>
//                   <div><p className="text-xs text-gray-500 mb-1">Call us</p><p className="text-sm text-gray-700">{settings.mobile_number || 'Contact number will be updated soon'}</p></div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-[#eef2ed] flex items-center justify-center shrink-0">
//                     <Mail className="w-5 h-5 text-[#2d6a4f]" />
//                   </div>
//                   <div><p className="text-xs text-gray-500 mb-1">Email us</p><p className="text-sm text-gray-700">{settings.contact_email || 'Contact email will be updated soon'}</p></div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
//             {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">{error}</div>}
//             {sent && <div className="bg-green-50 text-green-700 text-xs rounded-xl px-4 py-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Message sent! We'll get back soon.</div>}
//             <div>
//               <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Name</label>
//               <input required value={form.name} onChange={update('name')} placeholder="Your name"
//                 className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email</label>
//               <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com"
//                 className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Mobile number (optional)</label>
//               <input type="tel" value={form.phone} onChange={update('phone')} placeholder="Your mobile number" className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Message</label>
//               <textarea required rows={4} value={form.message} onChange={update('message')} placeholder="Tell us more..."
//                 className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 resize-none" />
//             </div>
//             <button disabled={sending} type="submit" className="w-full disabled:opacity-60 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all">
//               <Send className="w-4 h-4" /> {sending ? 'Sending…' : 'Send Message'}
//             </button>
//           </motion.form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Leaf,
  Sparkles,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { api } from '../utils/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({});
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api('/settings').then(setSettings).catch(() => {});
  }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSent(false);
    try {
      await api('/contact', { method: 'POST', body: JSON.stringify(form) });
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Could not send your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      label: 'Visit us',
      value: settings.address || 'Contact address will be updated soon',
    },
    {
      icon: Phone,
      label: 'Call us',
      value: settings.mobile_number || 'Contact number will be updated soon',
    },
    {
      icon: Mail,
      label: 'Email us',
      value: settings.contact_email || 'Contact email will be updated soon',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e8f1e8]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f0f5ec]/70 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ===== Heading ===== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm mb-5">
            <Leaf className="w-3.5 h-3.5 text-[#2d6a4f]" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#2d6a4f] sm:text-xs">
              Contact Us
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1a3c2e] mb-4 tracking-tight leading-[1.15]">
            Let's talk about{' '}
            <span className="italic text-[#2d6a4f]">green</span>
          </h1>

          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Have a question about plants, orders, or bulk? We're here to help.
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />
        </motion.div>

        {/* ===== Main grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8">

          {/* ============ LEFT: Contact info ============ */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#edf0e9] shadow-[0_2px_12px_rgba(30,60,40,0.04)] h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
                <h2 className="font-semibold text-base text-[#1a3c2e] tracking-tight">
                  Get in touch
                </h2>
              </div>

              <div className="space-y-4">
                {contactItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex items-start gap-3 p-3 -m-3 rounded-xl hover:bg-[#f8faf6] transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eef2ed] to-[#e2ece1] flex items-center justify-center shrink-0 group-hover:from-[#2d6a4f] group-hover:to-[#3d8a68] transition-all duration-300">
                        <Icon className="w-4 h-4 text-[#2d6a4f] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2d6a4f]/70 mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#1a3c2e]/80 leading-relaxed break-words">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Availability pill */}
              <div className="mt-6 pt-5 border-t border-[#edf0e9]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f8f2] border border-[#dce9dc] px-3.5 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2d6a4f] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2d6a4f]" />
                  </span>
                  <span className="text-[11px] font-semibold text-[#2d6a4f]">
                    We typically reply within 24 hours
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============ RIGHT: Form ============ */}
          <motion.form
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white rounded-2xl shadow-[0_2px_12px_rgba(30,60,40,0.04)] border border-[#edf0e9] p-6 sm:p-7 space-y-4"
          >
            {/* Alert states */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            )}
            {sent && (
              <div className="rounded-xl bg-green-50 border border-green-100 text-green-700 text-xs px-4 py-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                Message sent! We'll get back soon.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
                Mobile number{' '}
                <span className="text-gray-400 normal-case tracking-normal font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="Your mobile number"
                className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell us more..."
                className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 resize-none transition-all"
              />
            </div>

            <button
              disabled={sending}
              type="submit"
              className="group w-full disabled:opacity-60 disabled:cursor-not-allowed bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#2d6a4f]/20"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              {sending ? 'Sending…' : 'Send Message'}
            </button>

            <p className="text-center text-[11px] text-gray-400 pt-1">
              By sending, you agree to our friendly support responding via email.
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;