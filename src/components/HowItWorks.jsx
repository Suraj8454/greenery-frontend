import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, ShoppingBag, Package, Truck, Sprout, Search, PackageCheck } from 'lucide-react';
import useSection from '../hooks/useSection';

const steps = [
  { icon: ShoppingBag, title: 'Choose', desc: 'Browse our curated collection of plants and pots.' },
  { icon: Package, title: 'We Pack', desc: 'Eco-friendly, plant-safe packaging — guaranteed.' },
  { icon: Truck, title: 'We Ship', desc: 'Fast Pan India delivery, straight to your doorstep.' },
  { icon: Sprout, title: 'You Grow', desc: 'Follow our care card and watch your greens thrive.' },
];

const HowItWorks = () => {
  const section = useSection('how_it_works');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-20 md:py-14 bg-[#fcfbf7] relative overflow-hidden">

      {/* Decorative background — static, no animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2d6a4f] rounded-full blur-[150px] opacity-[0.04] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — same font, smooth fade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
            <Leaf className="w-3.5 h-3.5" />
            {section.eyebrow || 'How It Works'}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a3c2e] leading-tight">
            {section.title || 'From our green to yours'}
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            {section.description || 'A seamless journey from our nursery to your home in 4 simple steps.'}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Connecting line (desktop) — smooth draw */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-transparent via-[#2d6a4f]/40 to-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {(Array.isArray(section.items) && section.items.length ? section.items.map(x=>({icon:({'shopping-bag':ShoppingBag,'package':Package,'package-check':PackageCheck,'truck':Truck,'sprout':Sprout,'search':Search}[String(x.icon||'sprout').toLowerCase()]||Sprout),title:x.title,desc:x.description||x.desc,color:x.color})) : steps).map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Icon circle — smooth hover (no rotate, no bounce) */}
                  <div className="relative w-20 h-20 rounded-full bg-white border-2 border-[#eef2ed] group-hover:border-[#2d6a4f] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-[#2d6a4f]/15 transition-all duration-300">
                    <Icon style={step.color ? {color:step.color} : undefined} className="w-8 h-8 text-[#2d6a4f] relative z-10 transition-transform duration-300 group-hover:scale-110" />

                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#1a3c2e] text-white text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Text — same font/size */}
                  <h3 className="text-lg font-bold text-[#1a3c2e] mt-5 mb-2 group-hover:text-[#2d6a4f] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;