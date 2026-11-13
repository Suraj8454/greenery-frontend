import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Heart, Sparkles, Package, Award, ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';
import { mediaUrl } from '../utils/api';
import useSection from '../hooks/useSection';



const WhyChooseUs = () => {
  const section = useSection('why_choose_us');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const points = (Array.isArray(section.items) && section.items.length ? section.items.map(x => ({ icon: ({leaf:Leaf,package:Package,heart:Heart,award:Award,sparkles:Sparkles}[String(x.icon||'leaf').toLowerCase()]||Leaf), title:x.title, desc:x.description||x.desc, color:x.color })) : [ {icon:Leaf,title:'Handpicked Selection',desc:'Every plant and pot is chosen with care.'},{icon:Package,title:'Safe Packaging',desc:'Careful packaging protects your order.'},{icon:Heart,title:'Made with Love',desc:'We treat every order like our own.'},{icon:Award,title:'Trusted by Thousands',desc:'Friendly service for every plant parent.'} ]);

  // ============ SMOOTH ANIMATION VARIANTS ============
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-10 overflow-hidden" style={{backgroundColor: section.color || '#1a3c2e'}}
    >
      {/* Soft static glows (no animation) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a3d9b1]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#a3d9b1]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(163,217,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,217,177,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ============ LEFT: IMAGE ============ */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[300px] md:max-w-[340px]">
              {/* Main Image — modern frame */}
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <img
                  src={section.image ? mediaUrl(section.image) : "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800&h=1000"}
                  alt="Premium Pot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c2e]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge — clean glass */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-5 left-0 md:-left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl max-w-[170px]"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#a3d9b1]" />
                  <span className="text-[11px] font-bold text-[#a3d9b1] uppercase tracking-widest">
                    1000+
                  </span>
                </div>
                <p className="text-[10px] text-white/80 leading-snug">
                  Happy plant parents across India
                </p>
              </motion.div>

              {/* Classic corner accents */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-[#a3d9b1]/40 rounded-tl-[28px] pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-[#a3d9b1]/40 rounded-br-[28px] pointer-events-none" />
            </div>
          </motion.div>

          {/* ============ RIGHT: CONTENT ============ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Heading Block */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 text-[#a3d9b1] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                <Leaf className="w-3 h-3" />
                {section.eyebrow || 'Why Choose Us'}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-white leading-[1.15] mb-5">
                {section.title || 'We grow more than just plants.'}
              </h2>

              <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
                {section.description || 'Cityscape Greenery is built on a simple promise — bring nature closer to you with quality, care, and love.'}
              </p>
            </motion.div>

            {/* Points */}
            <div className="space-y-3">
              {points.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="flex items-start gap-3.5 p-3 -mx-3 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="relative w-10 h-10 rounded-xl bg-[#a3d9b1]/12 border border-[#a3d9b1]/20 group-hover:bg-[#a3d9b1] flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Icon style={point.color ? {color:point.color} : undefined} className="w-[18px] h-[18px] text-[#a3d9b1] group-hover:text-[#1a3c2e] transition-colors duration-300" />
                    </div>

                    <div className="pt-0.5 min-w-0">
                      <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-[#a3d9b1] transition-colors duration-300 flex items-center gap-1.5">
                        {point.title}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
           <motion.div variants={fadeUp} className="mt-9">
  <motion.div
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className="inline-flex"
  >
    <Link
      to={section.button_url || '/about'}
      className="group inline-flex items-center gap-2 bg-[#a3d9b1] hover:bg-white text-[#1a3c2e] px-6 py-3 rounded-full font-bold text-xs tracking-wide transition-colors duration-300 shadow-md hover:shadow-lg"
    >
      {section.button_text || 'Learn More'}
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
</motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;