// import React, { useRef } from 'react';
// import { useSiteSettings } from '../hooks/useSiteSettings';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Phone, Leaf, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

// const BulkOrder = () => {
//   const settings = useSiteSettings();
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start end', 'end start'],
//   });

//   // Parallax
//   const sectionY = useTransform(scrollYProgress, [0, 1], [80, -80]);
//   const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
//   const statCardY = useTransform(scrollYProgress, [0, 1], [60, -60]);

//   const highlights = [
//     'Best wholesale prices',
//     'Pan India delivery',
//     'Custom bulk packaging',
//   ];

//   // ============ ANIMATION VARIANTS ============
//   const cardVariants = {
//     hidden: { opacity: 0, y: 100, scale: 0.95 },
//     visible: {
//       opacity: 1, y: 0, scale: 1,
//       transition: { duration: 1, ease: [0.6, 0.05, -0.01, 0.9] },
//     },
//   };

//   const contentVariants = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
//     visible: {
//       opacity: 1, y: 0, filter: 'blur(0px)',
//       transition: { duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] },
//     },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1, y: 0,
//       transition: { duration: 0.7, delay: 1.0, ease: 'easeOut' },
//     },
//   };

//   const statCardVariants = {
//     hidden: { opacity: 0, x: 60, scale: 0.9 },
//     visible: {
//       opacity: 1, x: 0, scale: 1,
//       transition: { duration: 0.9, delay: 1.2, ease: [0.6, 0.05, -0.01, 0.9] },
//     },
//   };

//   return (
//     <section className="bg-white px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10">
      
//       <motion.div
//         ref={containerRef}
//         variants={cardVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.15 }}  // ✅ once: true
//         style={{ y: sectionY }}
//         className="relative max-w-7xl mx-auto rounded-[32px] md:rounded-[48px] lg:rounded-[64px] overflow-hidden shadow-2xl"
//       >
        
//         {/* BACKGROUND IMAGE (Hero-style dark) */}
//         <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 scale-110">
//           <img
//             src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1920"
//             alt="Bulk Pots Background"
//             className="w-full h-full object-cover object-center"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c2e]/95 via-[#1a3c2e]/85 to-[#1a3c2e]/60"></div>
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c2e]/70 via-transparent to-[#1a3c2e]/40"></div>
//         </motion.div>

//         {/* Decorative leaf */}
//         <motion.div
//           animate={{ y: [0, -20, 0], rotate: [15, 30, 15] }}
//           transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
//           className="absolute top-8 right-8 opacity-[0.06] pointer-events-none hidden lg:block z-10"
//         >
//           <Leaf className="w-40 h-40 text-[#a3d9b1]" strokeWidth={0.5} />
//         </motion.div>

//         {/* Grid pattern */}
//         <div 
//           className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
//           style={{
//             backgroundImage: 'linear-gradient(rgba(163,217,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,217,177,1) 1px, transparent 1px)',
//             backgroundSize: '60px 60px',
//           }}
//         />

//         {/* Content */}
//         <div className="relative z-20 px-6 sm:px-10 md:px-14 py-10 md:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
//           <motion.div 
//             variants={contentVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}  // ✅ once: true
//             className="max-w-2xl w-full"
//           >
            
//             <motion.div 
//               variants={itemVariants}
//               className="flex items-center gap-2 text-[#a3d9b1] text-[11px] font-bold tracking-[0.25em] uppercase mb-3"
//             >
//               <motion.div
//                 animate={{ rotate: [0, 15, 0] }}
//                 transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
//               >
//                 <Leaf className="w-3.5 h-3.5" />
//               </motion.div>
//               Wholesale & Bulk Orders
//             </motion.div>

//             <motion.h2 
//               variants={itemVariants}
//               className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4"
//             >
//               Need Pots in{' '}
//               <span className="relative italic font-light text-[#a3d9b1] inline-block">
//                 Bulk?
//                 <motion.span
//                   initial={{ width: 0 }}
//                   whileInView={{ width: '100%' }}
//                   viewport={{ once: true }}  // ✅ once: true
//                   transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
//                   className="absolute bottom-1 left-0 h-1 bg-[#a3d9b1]/50 rounded-full"
//                 />
//               </span>
//             </motion.h2>

//             <motion.p 
//               variants={itemVariants}
//               className="text-gray-300 text-sm md:text-base max-w-lg leading-relaxed mb-6"
//             >
//               We supply to nurseries, landscapers, builders, offices and retailers at the best prices. Get a custom quote today.
//             </motion.p>

//             <motion.div 
//               variants={itemVariants}
//               className="flex flex-wrap gap-x-5 gap-y-2 mb-8"
//             >
//               {highlights.map((item, idx) => (
//                 <motion.div 
//                   key={idx} 
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}  // ✅ once: true
//                   transition={{ duration: 0.5, delay: 0.8 + idx * 0.15 }}
//                   className="flex items-center gap-2 text-white/90 text-xs sm:text-sm"
//                 >
//                   <CheckCircle className="w-4 h-4 text-[#a3d9b1] shrink-0" />
//                   {item}
//                 </motion.div>
//               ))}
//             </motion.div>

//             <motion.div 
//               variants={buttonVariants}
//               className="flex flex-wrap gap-3"
//             >
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative bg-white text-[#1a3c2e] hover:bg-[#a3d9b1] px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl overflow-hidden"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
//                 <span className="relative z-10">{section.button_text || 'Enquire Now'}</span>
//                 <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
//               </motion.button>

//               <motion.a href={settings.whatsapp_number ? `https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}` : '#'} target="_blank" rel="noreferrer"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:border-white"
//               >
//                 <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
//                 Chat on WhatsApp
//               </motion.a>
//             </motion.div>
//           </motion.div>

//           <motion.div 
//             variants={statCardVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}  // ✅ once: true
//             style={{ y: statCardY }}
//             className="hidden lg:block shrink-0 relative"
//           >
//             <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white shadow-2xl min-w-[220px]">
              
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <Sparkles className="w-4 h-4 text-[#a3d9b1]" />
//                   <p className="text-4xl font-bold text-[#a3d9b1]">500+</p>
//                 </div>
//                 <p className="text-xs text-white/80 mb-4">Businesses trust us</p>
//               </div>
              
//               <div className="h-px bg-white/20 mb-4"></div>
              
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <Phone className="w-4 h-4 text-[#a3d9b1]" />
//                   <p className="text-4xl font-bold text-[#a3d9b1]">24h</p>
//                 </div>
//                 <p className="text-xs text-white/80">Quote Response</p>
//               </div>
//             </div>

//             <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#a3d9b1]/40 rounded-tr-2xl pointer-events-none"></div>
//             <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#a3d9b1]/40 rounded-bl-2xl pointer-events-none"></div>
//           </motion.div>

//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default BulkOrder;


import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';
import useSection from '../hooks/useSection';
import { mediaUrl } from '../utils/api';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone,
  Leaf,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const BulkOrder = () => {
  const section = useSection('bulk_order');
  const settings = useSiteSettings();
  const shouldReduceMotion = useReducedMotion();

  const highlights = (Array.isArray(section.items) && section.items.length ? section.items.map(x => x.title || x.description).filter(Boolean) : ['Best wholesale prices','Pan India delivery','Custom bulk packaging']);

  // Lightweight animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: 'easeOut',
      },
    },
  };

  const contentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: 'easeOut',
      },
    },
  };

  const statCardVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: 'easeOut',
      },
    },
  };

  const whatsappNumber = String(
    settings?.whatsapp_number || ''
  ).replace(/\D/g, '');

  return (
    <section className="bg-white px-3 py-6 sm:px-4 md:px-6 md:py-10 lg:px-8">
      <motion.div
        variants={cardVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] shadow-xl md:rounded-[48px] lg:rounded-[64px]"
        style={{
          contain: 'layout paint',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={section.image ? mediaUrl(section.image) : "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=75&w=1600"}
            alt="Plants and pots for bulk orders"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c2e]/90 via-[#1a3c2e]/85 to-[#1a3c2e]/60" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c2e]/30 via-transparent to-[#1a3c2e]/30" />
        </div>

        {/* Decorative leaf - no infinite animation */}
        <div className="pointer-events-none absolute right-8 top-8 z-10 hidden opacity-[0.06] lg:block">
          <Leaf
            className="h-40 w-40 text-[#a3d9b1]"
            strokeWidth={0.5}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(163,217,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,217,177,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-start justify-between gap-8 px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:flex-row lg:items-center">
          {/* Left content */}
          <motion.div
            variants={contentVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="w-full max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#a3d9b1]"
            >
              <Leaf className="h-3.5 w-3.5 shrink-0" />
              {section.eyebrow || 'Wholesale & Bulk Orders'}
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {section.title || 'Need Pots in Bulk?'}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mb-6 max-w-lg text-sm leading-relaxed text-gray-300 md:text-base"
            >
              {section.description || 'We supply to nurseries, landscapers, builders, offices and retailers at the best prices. Get a custom quote today.'}
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-wrap gap-x-5 gap-y-3"
            >
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-white/90 sm:text-sm"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#a3d9b1]" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {/* Enquire button */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1a3c2e] shadow-lg transition-colors duration-200 hover:bg-[#a3d9b1] hover:shadow-xl"
                >
                  <span className="relative z-10">{section.button_text || 'Enquire Now'}</span>

                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* WhatsApp button */}
              <motion.a
                href={
                  whatsappNumber
                    ? `https://wa.me/${whatsappNumber}`
                    : 'https://wa.me/'
                }
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4 transition-transform duration-200 group-hover:rotate-6" />
                Chat on WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Statistics card */}
          <motion.div
            variants={statCardVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="relative hidden shrink-0 lg:block"
          >
            <div className="relative min-w-[220px] rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
              {/* Businesses */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#a3d9b1]" />

                  <p className="text-4xl font-bold text-[#a3d9b1]">
                    500+
                  </p>
                </div>

                <p className="mb-4 text-xs text-white/80">
                  Businesses trust us
                </p>
              </div>

              <div className="mb-4 h-px bg-white/20" />

              {/* Response time */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#a3d9b1]" />

                  <p className="text-4xl font-bold text-[#a3d9b1]">
                    24h
                  </p>
                </div>

                <p className="text-xs text-white/80">
                  Quote Response
                </p>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 rounded-tr-2xl border-r-2 border-t-2 border-[#a3d9b1]/40" />

            <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 rounded-bl-2xl border-b-2 border-l-2 border-[#a3d9b1]/40" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default BulkOrder;
