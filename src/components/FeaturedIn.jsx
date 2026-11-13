import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Leaf, ArrowUpRight } from 'lucide-react';
import useSection from '../hooks/useSection';

const defaultLogos = [
  { name: 'VOGUE', style: 'font-serif italic text-2xl sm:text-3xl' },
  { name: 'ELLE DECOR', style: 'font-serif tracking-[0.12em] text-lg sm:text-xl' },
  { name: 'AD', style: 'font-serif font-bold text-3xl sm:text-4xl' },
  { name: 'HOME & GARDEN', style: 'font-sans font-semibold tracking-tight text-xs sm:text-sm' },
  { name: 'THE HINDU', style: 'font-serif font-bold text-xl sm:text-2xl' },
  { name: 'TIMES LIVING', style: 'font-sans font-light tracking-[0.12em] text-sm sm:text-base' },
  { name: 'ARCHITECTURAL DIGEST', style: 'font-serif tracking-[0.08em] text-sm sm:text-base' },
];

const FeaturedIn = () => {
  const section = useSection('featured_in');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  // 🔧 Normalize items — support multiple possible backend field names
  const rawItems =
    Array.isArray(section.items) && section.items.length
      ? section.items
      : defaultLogos;

  const items = rawItems
    .map((item) => {
      if (typeof item === 'string') {
        return { name: item, style: 'font-serif text-xl sm:text-2xl' };
      }
      const name =
        item?.name ??
        item?.label ??
        item?.title ??
        item?.text ??
        item?.brand ??
        item?.value ??
        item?.company ??
        '';
      return {
        ...item,
        name: String(name || '').trim(),
        style: item?.style || 'font-serif text-xl sm:text-2xl',
      };
    })
    .filter((item) => item.name); // drop empty ones only

  // 🐞 Debug — remove after fixing
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[FeaturedIn] raw items:', rawItems);
    // eslint-disable-next-line no-console
    console.log('[FeaturedIn] normalized items:', items);
  }

  // Agar backend se aaye items empty ho gaye (field mismatch), fallback dikhao
  const finalItems = items.length ? items : defaultLogos;

  // Duplicate for seamless marquee
  const marqueeItems = [...finalItems, ...finalItems];

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-[#e8eee7] bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] py-12 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e8f1e8]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f0f5ec]/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Leaf className="h-4 w-4 text-[#2d6a4f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6a4f] sm:text-xs">
              {section.eyebrow || 'Featured In'}
            </span>
          </div>

          <h2
            style={section.color ? { color: section.color } : undefined}
            className="text-xl font-medium tracking-tight text-[#253b2e] sm:text-2xl lg:text-3xl"
          >
            {section.title || 'Recognised by voices that inspire.'}
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            {section.description ||
              'Trusted names celebrating thoughtful design and conscious living.'}
          </p>

          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fbfcf9] to-transparent sm:w-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fbfcf9] to-transparent sm:w-24"
          />

          <div className="group flex overflow-hidden py-2">
            <div
              className={`flex shrink-0 items-center gap-3 sm:gap-4 ${
                shouldReduceMotion
                  ? 'flex-wrap justify-center'
                  : 'animate-marquee group-hover:[animation-play-state:paused]'
              }`}
              style={
                !shouldReduceMotion
                  ? {
                      animation: `marquee ${Math.max(finalItems.length * 3, 18)}s linear infinite`,
                      width: 'max-content',
                    }
                  : undefined
              }
            >
              {marqueeItems.map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="group/logo flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-[#edf0e9] bg-white px-4 text-center shadow-[0_2px_8px_rgba(30,60,40,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9ddc9] hover:bg-[#f4f8f2] hover:shadow-[0_6px_20px_rgba(45,106,79,0.08)] sm:h-24 sm:w-48 sm:px-5"
                >
                  <span
                    style={logo.color ? { color: logo.color } : undefined}
                    className={`${
                      logo.style || 'font-serif text-xl'
                    } whitespace-nowrap text-[#a1aaa0] transition-colors duration-300 group-hover/logo:text-[#2d6a4f]`}
                  >
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="mt-8 flex items-center justify-center gap-2 text-center sm:mt-10"
        >
          <span className="text-xs text-gray-500 sm:text-sm">
            Inspired by nature. Designed for mindful living.
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#2d6a4f]" />
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedIn;