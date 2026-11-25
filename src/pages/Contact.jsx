
// import React, { useState, useEffect } from 'react';
// import { motion, useReducedMotion } from 'framer-motion';
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Send,
//   CheckCircle,
//   Leaf,
//   Sparkles,
//   Clock,
//   ArrowUpRight,
// } from 'lucide-react';
// import { api } from '../utils/api';

// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const [sent, setSent] = useState(false);
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState('');
//   const [settings, setSettings] = useState({});
//   const reduceMotion = useReducedMotion();

//   useEffect(() => {
//     api('/settings').then(setSettings).catch(() => {});
//   }, []);

//   const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSending(true);
//     setError('');
//     setSent(false);
//     try {
//       await api('/contact', { method: 'POST', body: JSON.stringify(form) });
//       setSent(true);
//       setForm({ name: '', email: '', phone: '', message: '' });
//     } catch (err) {
//       setError(err.message || 'Could not send your message. Please try again.');
//     } finally {
//       setSending(false);
//     }
//   };

//   const contactItems = [
//     {
//       icon: MapPin,
//       label: 'Visit us',
//       value: settings.address || 'Contact address will be updated soon',
//     },
//     {
//       icon: Phone,
//       label: 'Call us',
//       value: settings.mobile_number || 'Contact number will be updated soon',
//     },
//     {
//       icon: Mail,
//       label: 'Email us',
//       value: settings.contact_email || 'Contact email will be updated soon',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
//       {/* Decorative blobs */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e8f1e8]/60 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f0f5ec]/70 blur-3xl"
//       />

//       <div className="relative max-w-6xl mx-auto">

//         {/* ===== Heading ===== */}
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: 'easeOut' }}
//           className="text-center mb-12 sm:mb-14"
//         >
//           <div className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm mb-5">
//             <Leaf className="w-3.5 h-3.5 text-[#2d6a4f]" />
//             <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#2d6a4f] sm:text-xs">
//               Contact Us
//             </span>
//           </div>

//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1a3c2e] mb-4 tracking-tight leading-[1.15]">
//             Let's talk about{' '}
//             <span className="italic text-[#2d6a4f]">green</span>
//           </h1>

//           <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
//             Have a question about plants, orders, or bulk? We're here to help.
//           </p>

//           <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />
//         </motion.div>

//         {/* ===== Main grid ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8">

//           {/* ============ LEFT: Contact info ============ */}
//           <motion.div
//             initial={reduceMotion ? false : { opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
//             className="md:col-span-2"
//           >
//             <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#edf0e9] shadow-[0_2px_12px_rgba(30,60,40,0.04)] h-full">
//               <div className="flex items-center gap-2 mb-6">
//                 <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
//                 <h2 className="font-semibold text-base text-[#1a3c2e] tracking-tight">
//                   Get in touch
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 {contactItems.map((item, idx) => {
//                   const Icon = item.icon;
//                   return (
//                     <div
//                       key={idx}
//                       className="group flex items-start gap-3 p-3 -m-3 rounded-xl hover:bg-[#f8faf6] transition-colors duration-200"
//                     >
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eef2ed] to-[#e2ece1] flex items-center justify-center shrink-0 group-hover:from-[#2d6a4f] group-hover:to-[#3d8a68] transition-all duration-300">
//                         <Icon className="w-4 h-4 text-[#2d6a4f] group-hover:text-white transition-colors duration-300" />
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2d6a4f]/70 mb-1">
//                           {item.label}
//                         </p>
//                         <p className="text-sm text-[#1a3c2e]/80 leading-relaxed break-words">
//                           {item.value}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Availability pill */}
//               <div className="mt-6 pt-5 border-t border-[#edf0e9]">
//                 <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f8f2] border border-[#dce9dc] px-3.5 py-2">
//                   <span className="relative flex h-2 w-2">
//                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2d6a4f] opacity-60" />
//                     <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2d6a4f]" />
//                   </span>
//                   <span className="text-[11px] font-semibold text-[#2d6a4f]">
//                     We typically reply within 24 hours
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* ============ RIGHT: Form ============ */}
//           <motion.form
//             initial={reduceMotion ? false : { opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
//             onSubmit={handleSubmit}
//             className="md:col-span-3 bg-white rounded-2xl shadow-[0_2px_12px_rgba(30,60,40,0.04)] border border-[#edf0e9] p-6 sm:p-7 space-y-4"
//           >
//             {/* Alert states */}
//             {error && (
//               <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs text-red-700">
//                 {error}
//               </div>
//             )}
//             {sent && (
//               <div className="rounded-xl bg-green-50 border border-green-100 text-green-700 text-xs px-4 py-3 flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 shrink-0" />
//                 Message sent! We'll get back soon.
//               </div>
//             )}

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
//                   Name
//                 </label>
//                 <input
//                   required
//                   value={form.name}
//                   onChange={update('name')}
//                   placeholder="Your name"
//                   className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={form.email}
//                   onChange={update('email')}
//                   placeholder="you@example.com"
//                   className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 transition-all"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
//                 Mobile number{' '}
//                 <span className="text-gray-400 normal-case tracking-normal font-normal">
//                   (optional)
//                 </span>
//               </label>
//               <input
//                 type="tel"
//                 value={form.phone}
//                 onChange={update('phone')}
//                 placeholder="Your mobile number"
//                 className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 transition-all"
//               />
//             </div>

//             <div>
//               <label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1a3c2e]/60 mb-2 block">
//                 Message
//               </label>
//               <textarea
//                 required
//                 rows={5}
//                 value={form.message}
//                 onChange={update('message')}
//                 placeholder="Tell us more..."
//                 className="w-full border border-[#e5ebe0] bg-white rounded-xl py-2.5 px-3.5 text-sm text-[#1a3c2e] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10 resize-none transition-all"
//               />
//             </div>

//             <button
//               disabled={sending}
//               type="submit"
//               className="group w-full disabled:opacity-60 disabled:cursor-not-allowed bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#2d6a4f]/20"
//             >
//               <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
//               {sending ? 'Sending…' : 'Send Message'}
//             </button>

//             <p className="text-center text-[11px] text-gray-400 pt-1">
//               By sending, you agree to our friendly support responding via email.
//             </p>
//           </motion.form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  MessageCircle,
  Headphones,
  ShieldCheck,
  Flower2,
  Camera,
  Loader2,
  User,
  MessageSquare,
} from 'lucide-react';
import { api } from '../utils/api';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({});

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    api('/settings')
      .then((data) => {
        if (active) setSettings(data || {});
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const update = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

    if (error) setError('');
    if (sent) setSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    setError('');
    setSent(false);

    try {
      await api('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setSent(true);

      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      setError(
        err.message || 'Could not send your message. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      label: 'Visit our store',
      value: settings.address || 'Contact address will be updated soon',
      description: 'Come and explore our greenery',
    },
    {
      icon: Phone,
      label: 'Give us a call',
      value: settings.mobile_number || 'Contact number will be updated soon',
      description: 'We are happy to help',
    },
    {
      icon: Mail,
      label: 'Drop us an email',
      value: settings.contact_email || 'Contact email will be updated soon',
      description: 'Send us your questions anytime',
    },
  ];

  const inputClass =
    'w-full rounded-xl border border-[#e7ece5] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#1a3c2e] placeholder:text-[#9ba69b] outline-none transition-all duration-300 focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10';

  const labelClass =
    'mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#405747]';

  const fadeUp = {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55, ease: 'easeOut' },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fcfbf7] font-['DM_Sans',sans-serif]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#1a3c2e] px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-[#2d6a4f]/30 blur-3xl" />
        <div className="pointer-events-none absolute right-[15%] top-1/2 h-40 w-40 rounded-full bg-[#a3d9b1]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
              <Leaf size={14} className="text-[#a3d9b1]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c6dfc9] sm:text-xs">
                Contact Cityscape Greenery
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[56px]">
              Let's grow something
              <span className="mt-1 block font-serif font-normal italic text-[#a3d9b1]">
                beautiful together.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-xs leading-7 text-white/65 sm:text-sm md:text-base">
              Whether you need plant advice, help with an order, or want to
              explore something special, we'd love to hear from you.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[10px] text-white/80 sm:text-xs">
                <MessageCircle size={14} className="text-[#a3d9b1]" />
                Friendly support
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[10px] text-white/80 sm:text-xs">
                <Leaf size={14} className="text-[#a3d9b1]" />
                Plant experts
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[10px] text-white/80 sm:text-xs">
                <ShieldCheck size={14} className="text-[#a3d9b1]" />
                Customer care
              </div>
            </div>

          </motion.div>

          {/* Decorative bottom line */}
          <div className="absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border border-white/[0.08] sm:-bottom-24" />

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">

        <div className="mx-auto -mt-7 max-w-6xl sm:-mt-10">

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-7">

            {/* ================= LEFT CONTACT INFO ================= */}
            <motion.div
              {...fadeUp}
              className="flex flex-col gap-5 lg:col-span-2"
            >

              {/* Contact Information Card */}
              <div className="overflow-hidden rounded-2xl border border-[#e8ede5] bg-white shadow-[0_12px_40px_rgba(26,60,46,0.055)] sm:rounded-3xl">

                <div className="relative overflow-hidden bg-[#f0f5ee] p-5 sm:p-7">

                  <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-[#2d6a4f]/10" />
                  <div className="pointer-events-none absolute -right-2 -top-6 h-28 w-28 rounded-full border border-[#2d6a4f]/10" />

                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a3c2e] text-[#a3d9b1] shadow-lg shadow-[#1a3c2e]/10">
                      <Headphones size={21} />
                    </div>

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
                      We're here for you
                    </p>

                    <h2 className="text-xl font-bold tracking-tight text-[#1a3c2e] sm:text-2xl">
                      Get in touch
                    </h2>

                    <p className="mt-2 max-w-xs text-xs leading-6 text-[#687c6b] sm:text-sm">
                      Have something on your mind? Reach out through any of
                      the channels below.
                    </p>
                  </div>
                </div>

                <div className="space-y-1 p-5 sm:p-7">

                  {contactItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-all duration-300 hover:bg-[#f5f8f3] sm:gap-4 sm:p-4"
                      >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf4ec] text-[#2d6a4f] transition-all duration-300 group-hover:bg-[#1a3c2e] group-hover:text-white">
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1 pt-0.5">

                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#829384]">
                            {item.label}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold leading-relaxed text-[#1a3c2e]">
                            {item.value}
                          </p>

                          <p className="mt-1 text-[10px] text-[#929d92] sm:text-xs">
                            {item.description}
                          </p>

                        </div>

                        <ArrowUpRight
                          size={15}
                          className="mt-1 shrink-0 text-[#a5b3a5] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2d6a4f]"
                        />

                      </motion.div>
                    );
                  })}

                </div>

                {/* Response time */}
                <div className="mx-5 mb-5 rounded-2xl border border-[#dce9dc] bg-[#f4f8f2] p-4 sm:mx-7 sm:mb-7">

                  <div className="flex items-center gap-3">

                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e3eee1]">
                      <Clock size={17} className="text-[#2d6a4f]" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#1a3c2e]">
                        We're just a message away
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-[#718373] sm:text-xs">
                        We typically reply within 24 hours.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom mini card */}
              <div className="relative overflow-hidden rounded-2xl bg-[#1a3c2e] p-5 text-white sm:rounded-3xl sm:p-6">

                <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border border-white/10" />

                <div className="relative flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#a3d9b1]">
                    <Flower2 size={24} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Love plants as much as we do?
                    </p>
                    <p className="mt-1 text-[10px] leading-relaxed text-white/60 sm:text-xs">
                      Let's make your space a little greener.
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>

            {/* ================= RIGHT CONTACT FORM ================= */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="lg:col-span-3"
            >

              <div className="h-full rounded-2xl border border-[#e8ede5] bg-white p-5 shadow-[0_12px_40px_rgba(26,60,46,0.055)] sm:rounded-3xl sm:p-7 md:p-9">

                {/* Form Heading */}
                <div className="mb-7 flex items-start justify-between gap-4 sm:mb-8">

                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#edf4ec] px-3 py-1.5">
                      <Sparkles size={12} className="text-[#2d6a4f]" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#2d6a4f]">
                        Say Hello
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight text-[#1a3c2e] sm:text-2xl md:text-3xl">
                      Send us a message
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-[#89958a] sm:text-sm">
                      Fill out the form and our team will get back to you.
                    </p>
                  </div>

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5ee] text-[#2d6a4f] sm:flex">
                    <Send size={21} />
                  </div>

                </div>

                {/* Alerts */}
                <AnimatePresence mode="wait">

                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-700"
                    >
                      <span className="mt-0.5">!</span>
                      <p>{error}</p>
                    </motion.div>
                  )}

                  {sent && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-5 flex items-start gap-3 rounded-xl border border-[#d5e8d3] bg-[#f0f7ef] px-4 py-3 text-xs text-[#2d6a4f]"
                    >
                      <CheckCircle size={17} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">Message sent successfully!</p>
                        <p className="mt-1 text-[#64806a]">
                          Thank you for reaching out. We'll get back to you soon.
                        </p>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div>
                      <label className={labelClass}>
                        Your Name <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91a094]"
                        />

                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={update('name')}
                          placeholder="Enter your name"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email Address <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91a094]"
                        />

                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={update('email')}
                          placeholder="you@example.com"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>
                      Mobile Number
                      <span className="ml-1 font-normal normal-case tracking-normal text-[#a0aaa0]">
                        (Optional)
                      </span>
                    </label>

                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91a094]"
                      />

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="Enter your mobile number"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>
                      Your Message <span className="text-red-400">*</span>
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={16}
                        className="absolute left-3.5 top-4 text-[#91a094]"
                      />

                      <textarea
                        required
                        rows={6}
                        minLength={5}
                        value={form.message}
                        onChange={update('message')}
                        placeholder="Tell us how we can help you..."
                        className={`${inputClass} min-h-[150px] resize-y pl-10 leading-6`}
                      />
                    </div>

                    <p className="mt-2 text-right text-[10px] text-[#a1aaa0]">
                      {form.message.length} characters
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    disabled={sending}
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#1a3c2e] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#1a3c2e]/10 transition-all duration-300 hover:bg-[#2d6a4f] hover:shadow-xl hover:shadow-[#2d6a4f]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {sending ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}

                  </button>

                  {/* Privacy note */}
                  <div className="flex items-center justify-center gap-2 pt-1 text-center text-[10px] text-[#9aa49a]">
                    <ShieldCheck size={13} className="shrink-0 text-[#6d9273]" />
                    Your information is safe with us.
                  </div>

                </form>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= BOTTOM BANNER ================= */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-16">

        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#edf4eb] px-5 py-7 sm:rounded-3xl sm:px-9 sm:py-9"
        >

          <div className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full border border-[#2d6a4f]/10" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-32 w-32 rounded-full border border-[#2d6a4f]/10" />

          <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a3c2e] text-[#a3d9b1]">
                <Leaf size={23} />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1a3c2e] sm:text-lg">
                  Let's make the world a little greener.
                </h3>
                <p className="mt-1 text-xs text-[#738574] sm:text-sm">
                  Every conversation is the beginning of something beautiful.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#2d6a4f]">
              <Sparkles size={16} />
              Grow with us
            </div>

          </div>
        </motion.div>

      </section>

    </div>
  );
};

export default Contact;
