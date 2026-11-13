// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, useInView } from 'framer-motion';
// import { Leaf, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaPinterestP } from 'react-icons/fa';
// import { useSiteSettings } from '../hooks/useSiteSettings';
// import { api, mediaUrl } from '../utils/api';
// import { useState } from 'react';

// const Footer = () => {
//   const settings = useSiteSettings();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.15 });
//   const currentYear = new Date().getFullYear();
//   const [newsletterEmail, setNewsletterEmail] = useState('');
//   const [newsletterMessage, setNewsletterMessage] = useState('');
//   const [newsletterBusy, setNewsletterBusy] = useState(false);
//   const subscribe = async (e) => { e.preventDefault(); setNewsletterBusy(true); setNewsletterMessage(''); try { const result = await api('/contact/newsletter', { method: 'POST', body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterMessage(result.message || 'Subscribed successfully.'); setNewsletterEmail(''); } catch (error) { setNewsletterMessage(error.message || 'Could not subscribe.'); } finally { setNewsletterBusy(false); } };

//   const quickLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact Us', path: '/contact' },
//     { name: 'Bulk Order', path: '/bulk' },
//     { name: 'My Orders', path: '/orders' },
//   ];

//   const helpLinks = [
//     { name: 'Privacy Policy', path: '/privacy' },
//     { name: 'Terms & Conditions', path: '/terms' },
//     { name: 'Favorites', path: '/favorites' },
//     { name: 'Cart', path: '/cart' },
//   ];

//   const socialLinks = [
//     { icon: <FaFacebookF />, href: settings.facebook_url || '#', name: 'Facebook' },
//     { icon: <FaInstagram />, href: settings.instagram_url || '#', name: 'Instagram' },
//     { icon: <FaTwitter />, href: settings.twitter_url || '#', name: 'Twitter' },
//     { icon: <FaYoutube />, href: settings.youtube_url || '#', name: 'YouTube' },
//     { icon: <FaWhatsapp />, href: settings.whatsapp_number ? `https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}` : '#', name: 'WhatsApp' },
//     { icon: <FaPinterestP />, href: settings.pinterest_url || '#', name: 'Pinterest' },
//   ];

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] } },
//   };

//   return (
//     <footer ref={ref} className="bg-[#0f2a1f] text-white relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2d6a4f]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#a3d9b1]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a3d9b1]/30 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-10 md:pt-12 pb-5">
//         {/* Brand Statement */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
//           className="pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
//         >
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-tight max-w-lg">
//             Growing a greener{' '}
//             <span className="italic font-light text-[#a3d9b1]">tomorrow.</span>
//           </h2>
//           <Link to="/contact" className="group inline-flex items-center gap-2 text-[#a3d9b1] font-medium text-xs tracking-widest uppercase hover:text-white transition-colors shrink-0">
//             <span className="w-8 h-px bg-[#a3d9b1] group-hover:w-14 group-hover:bg-white transition-all duration-500"></span>
//             Get in Touch
//             <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
//           </Link>
//         </motion.div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 py-8 border-b border-white/10">
//           {/* Brand */}
//           <motion.div variants={itemVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="lg:col-span-4 space-y-4">
//             <Link to="/" className="flex items-center gap-2 group">
//               <Leaf className="text-[#a3d9b1] w-7 h-7 group-hover:rotate-12 transition-transform" />
//               <div>
//                 <h1 className="text-base font-bold text-white leading-tight">{settings.brand_name || 'Cityscape Greenery'}</h1>
//                 <h1 className="text-[10px] font-semibold text-[#a3d9b1] leading-tight tracking-[0.15em] uppercase">Greenery</h1>
//               </div>
//             </Link>
//             <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
//               Bringing nature closer to you with premium plants, stylish pots, and eco-friendly gardening solutions.
//             </p>
//             <div className="flex flex-wrap gap-1.5 pt-1">
//               {socialLinks.map((s) => (
//                 <a key={s.name} href={s.href} aria-label={s.name}
//                   className="w-7 h-7 rounded-full border border-white/15 bg-white/5 text-gray-300 text-[10px] hover:text-[#0f2a1f] hover:bg-[#a3d9b1] hover:border-[#a3d9b1] flex items-center justify-center transition-all duration-300 hover:scale-110">
//                   {s.icon}
//                 </a>
//               ))}
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div variants={itemVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="lg:col-span-2">
//             <h3 className="font-bold mb-3 text-white text-[10px] uppercase tracking-[0.2em]">Quick Links</h3>
//             <ul className="space-y-2 text-xs text-gray-400">
//               {quickLinks.map((l) => (
//                 <li key={l.name}>
//                   <Link to={l.path} className="hover:text-[#a3d9b1] transition-colors inline-flex items-center gap-1.5 group">
//                     <span className="w-0 group-hover:w-2 h-px bg-[#a3d9b1] transition-all duration-300"></span>
//                     {l.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Help */}
//           <motion.div variants={itemVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="lg:col-span-2">
//             <h3 className="font-bold mb-3 text-white text-[10px] uppercase tracking-[0.2em]">Help</h3>
//             <ul className="space-y-2 text-xs text-gray-400">
//               {helpLinks.map((l) => (
//                 <li key={l.name}>
//                   <Link to={l.path} className="hover:text-[#a3d9b1] transition-colors inline-flex items-center gap-1.5 group">
//                     <span className="w-0 group-hover:w-2 h-px bg-[#a3d9b1] transition-all duration-300"></span>
//                     {l.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Contact */}
//           <motion.div variants={itemVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="lg:col-span-4">
//             <h3 className="font-bold mb-3 text-white text-[10px] uppercase tracking-[0.2em]">Get in Touch</h3>
//             <ul className="space-y-2 text-xs text-gray-400 mb-4">
//               <li className="flex items-start gap-2 group"><MapPin className="w-3.5 h-3.5 text-[#a3d9b1] mt-0.5 shrink-0" /><span>{settings.address || 'Contact address will be updated soon'}</span></li>
//               <li className="flex items-center gap-2 group"><Phone className="w-3.5 h-3.5 text-[#a3d9b1] shrink-0" /><span>{settings.mobile_number || 'Contact number will be updated soon'}</span></li>
//               <li className="flex items-center gap-2 group"><Mail className="w-3.5 h-3.5 text-[#a3d9b1] shrink-0" /><span>{settings.contact_email || 'Contact email will be updated soon'}</span></li>
//             </ul>
//             <div>
//               <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">Newsletter</p>
//               <form onSubmit={subscribe} className="flex items-center gap-2 border-b border-white/20 focus-within:border-[#a3d9b1] transition-colors pb-1.5">
//                 <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Your email" className="bg-transparent text-xs flex-1 focus:outline-none text-white placeholder-gray-500 py-0.5" />
//                 <button disabled={newsletterBusy} type="submit" aria-label="Subscribe to newsletter" className="text-[#a3d9b1] hover:text-white transition-colors group disabled:opacity-50"><ArrowUpRight className="w-4 h-4 group-hover:rotate-45 group-hover:scale-110 transition-all" /></button>
//               </form>
//               {newsletterMessage && <p role="status" className="mt-2 text-[11px] text-emerald-200">{newsletterMessage}</p>}
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom */}
//         <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-gray-500">
//           <p>© {currentYear} {settings.brand_name || 'Cityscape Greenery'}. All rights reserved.</p>
//           <div className="flex items-center gap-5">
//             <Link to="/terms" className="hover:text-[#a3d9b1] transition-colors">Terms</Link>
//             <Link to="/privacy" className="hover:text-[#a3d9b1] transition-colors">Privacy</Link>
//             <Link to="/about" className="hover:text-[#a3d9b1] transition-colors">About</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Leaf, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaPinterestP } from 'react-icons/fa';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { api, mediaUrl } from '../utils/api';

// 👇 Apni image ka path yaha daalo (src/assets/... ya public/...)
import footerBg from '../assets/footer.jpeg';

const Footer = () => {
  const settings = useSiteSettings();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterBusy, setNewsletterBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setNewsletterBusy(true);
    setNewsletterMessage('');
    try {
      const result = await api('/contact/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setNewsletterMessage(result.message || 'Subscribed successfully.');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterMessage(error.message || 'Could not subscribe.');
    } finally {
      setNewsletterBusy(false);
    }
  };

  const fallbackQuickLinks = [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Contact Us', path: '/contact' }, { name: 'Bulk Order', path: '/bulk' }, { name: 'My Orders', path: '/orders' }];
  const fallbackHelpLinks = [{ name: 'Privacy Policy', path: '/privacy' }, { name: 'Terms & Conditions', path: '/terms' }, { name: 'Favorites', path: '/favorites' }, { name: 'Cart', path: '/cart' }];
  const parseLinks = (raw, fallback) => { try { const value = JSON.parse(raw || '[]'); return Array.isArray(value) && value.length ? value.filter(x => x.name && x.path) : fallback; } catch { return fallback; } };
  const quickLinks = parseLinks(settings.footer_quick_links_json, fallbackQuickLinks);
  const helpLinks = parseLinks(settings.footer_help_links_json, fallbackHelpLinks);

  const socialLinks = [
    { icon: <FaFacebookF />, href: settings.facebook_url || '#', name: 'Facebook' },
    { icon: <FaInstagram />, href: settings.instagram_url || '#', name: 'Instagram' },
    { icon: <FaTwitter />, href: settings.twitter_url || '#', name: 'Twitter' },
    { icon: <FaYoutube />, href: settings.youtube_url || '#', name: 'YouTube' },
    {
      icon: <FaWhatsapp />,
      href: settings.whatsapp_number
        ? `https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}`
        : '#',
      name: 'WhatsApp',
    },
    { icon: <FaPinterestP />, href: settings.pinterest_url || '#', name: 'Pinterest' },
  ];

  // ✅ Animation variants – smooth, no pause
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: `url(${settings.footer_image_url ? mediaUrl(settings.footer_image_url) : footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // ✅ smooth parallax feel on desktop
      }}
    >
      {/* ✅ Dark green overlay for readability */}
      <div className="absolute inset-0 bg-[#0f2a1f]/35 pointer-events-none" />
      

      {/* Decorative glows */}
      {/* <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2d6a4f]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#a3d9b1]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a3d9b1]/40 to-transparent" /> */}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-10 md:pt-14 pb-5">
        {/* Brand Statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pb-8 border-b border-white/15 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-tight max-w-lg">
            Growing a greener{' '}
            <span className="italic font-light text-[#a3d9b1]">tomorrow.</span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-[#a3d9b1] font-medium text-xs tracking-widest uppercase hover:text-white transition-colors shrink-0"
          >
            <span className="w-8 h-px bg-[#a3d9b1] group-hover:w-14 group-hover:bg-white transition-all duration-500" />
            Get in Touch
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid – staggers children smoothly */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 py-8 border-b border-white/15"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Leaf className="text-[#a3d9b1] w-7 h-7 group-hover:rotate-12 transition-transform" />
              <div>
                <h1 className="text-base font-bold text-white leading-tight">
                  {settings.brand_name || 'Cityscape Greenery'}
                </h1>
                <h1 className="text-[10px] font-semibold text-[#a3d9b1] leading-tight tracking-[0.15em] uppercase">
                  Greenery
                </h1>
              </div>
            </Link>
            <p className="text-gray-300 text-xs leading-relaxed max-w-xs">
              Bringing nature closer to you with premium plants, stylish pots, and eco-friendly gardening solutions.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-7 h-7 rounded-full border border-white/20 bg-white/5 text-gray-300 text-[10px] hover:text-[#0f2a1f] hover:bg-[#a3d9b1] hover:border-[#a3d9b1] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-bold mb-3 text-white text-[10px] uppercase tracking-[0.2em]">Quick Links</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.path}
                    className="hover:text-[#a3d9b1] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#a3d9b1] transition-all duration-300" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-bold mb-3 text-white text-[10px] uppercase tracking-[0.2em]">Help</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {helpLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.path}
                    className="hover:text-[#a3d9b1] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#a3d9b1] transition-all duration-300" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h3 className="font-bold mb-3 text-white text-[10px] uppercase tracking-[0.2em]">Get in Touch</h3>
            <ul className="space-y-2 text-xs text-gray-300 mb-4">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#a3d9b1] mt-0.5 shrink-0" />
                <span>{settings.address || 'Contact address will be updated soon'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#a3d9b1] shrink-0" />
                <span>{settings.mobile_number || 'Contact number will be updated soon'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#a3d9b1] shrink-0" />
                <span>{settings.contact_email || 'Contact email will be updated soon'}</span>
              </li>
            </ul>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">Newsletter</p>
              <form
                onSubmit={subscribe}
                className="flex items-center gap-2 border-b border-white/25 focus-within:border-[#a3d9b1] transition-colors pb-1.5"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-transparent text-xs flex-1 focus:outline-none text-white placeholder-gray-400 py-0.5"
                />
                <button
                  disabled={newsletterBusy}
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="text-[#a3d9b1] hover:text-white transition-colors group disabled:opacity-50"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 group-hover:scale-110 transition-all" />
                </button>
              </form>
              {newsletterMessage && (
                <p role="status" className="mt-2 text-[11px] text-emerald-200">
                  {newsletterMessage}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-gray-400">
          <p>
            © {currentYear} {settings.brand_name || 'Cityscape Greenery'}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-[#a3d9b1] transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-[#a3d9b1] transition-colors">
              Privacy
            </Link>
            <Link to="/about" className="hover:text-[#a3d9b1] transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;