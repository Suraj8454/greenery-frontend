// import React, { useRef } from 'react';
// import { motion, useInView, useReducedMotion } from 'framer-motion';
// import { Leaf, ArrowUpRight } from 'lucide-react';
// import useSection from '../hooks/useSection';

// const defaultLogos = [
//   { name: 'VOGUE', style: 'font-serif italic text-2xl sm:text-3xl' },
//   { name: 'ELLE DECOR', style: 'font-serif tracking-[0.12em] text-lg sm:text-xl' },
//   { name: 'AD', style: 'font-serif font-bold text-3xl sm:text-4xl' },
//   { name: 'HOME & GARDEN', style: 'font-sans font-semibold tracking-tight text-xs sm:text-sm' },
//   { name: 'THE HINDU', style: 'font-serif font-bold text-xl sm:text-2xl' },
//   { name: 'TIMES LIVING', style: 'font-sans font-light tracking-[0.12em] text-sm sm:text-base' },
//   { name: 'ARCHITECTURAL DIGEST', style: 'font-serif tracking-[0.08em] text-sm sm:text-base' },
// ];

// const FeaturedIn = () => {
//   const section = useSection('featured_in');
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.15 });
//   const shouldReduceMotion = useReducedMotion();

//   // 🔧 Normalize items — support multiple possible backend field names
//   const rawItems =
//     Array.isArray(section.items) && section.items.length
//       ? section.items
//       : defaultLogos;

//   const items = rawItems
//     .map((item) => {
//       if (typeof item === 'string') {
//         return { name: item, style: 'font-serif text-xl sm:text-2xl' };
//       }
//       const name =
//         item?.name ??
//         item?.label ??
//         item?.title ??
//         item?.text ??
//         item?.brand ??
//         item?.value ??
//         item?.company ??
//         '';
//       return {
//         ...item,
//         name: String(name || '').trim(),
//         style: item?.style || 'font-serif text-xl sm:text-2xl',
//       };
//     })
//     .filter((item) => item.name); // drop empty ones only

//   // 🐞 Debug — remove after fixing
//   if (process.env.NODE_ENV !== 'production') {
//     // eslint-disable-next-line no-console
//     console.log('[FeaturedIn] raw items:', rawItems);
//     // eslint-disable-next-line no-console
//     console.log('[FeaturedIn] normalized items:', items);
//   }

//   // Agar backend se aaye items empty ho gaye (field mismatch), fallback dikhao
//   const finalItems = items.length ? items : defaultLogos;

//   // Duplicate for seamless marquee
//   const marqueeItems = [...finalItems, ...finalItems];

//   const reveal = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' },
//     },
//   };

//   return (
//     <section
//       ref={ref}
//       className="relative overflow-hidden border-y border-[#e8eee7] bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] py-12 sm:py-16 lg:py-20"
//     >
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e8f1e8]/60 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f0f5ec]/70 blur-3xl"
//       />

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Heading */}
//         <motion.div
//           variants={reveal}
//           initial="hidden"
//           animate={isInView ? 'visible' : 'hidden'}
//           className="mb-10 text-center sm:mb-12"
//         >
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
//             <Leaf className="h-4 w-4 text-[#2d6a4f]" />
//             <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6a4f] sm:text-xs">
//               {section.eyebrow || 'Featured In'}
//             </span>
//           </div>

//           <h2
//             style={section.color ? { color: section.color } : undefined}
//             className="text-xl font-medium tracking-tight text-[#253b2e] sm:text-2xl lg:text-3xl"
//           >
//             {section.title || 'Recognised by voices that inspire.'}
//           </h2>

//           <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
//             {section.description ||
//               'Trusted names celebrating thoughtful design and conscious living.'}
//           </p>

//           <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />
//         </motion.div>

//         {/* Marquee */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//           transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
//           className="relative"
//         >
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fbfcf9] to-transparent sm:w-24"
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fbfcf9] to-transparent sm:w-24"
//           />

//           <div className="group flex overflow-hidden py-2">
//             <div
//               className={`flex shrink-0 items-center gap-3 sm:gap-4 ${
//                 shouldReduceMotion
//                   ? 'flex-wrap justify-center'
//                   : 'animate-marquee group-hover:[animation-play-state:paused]'
//               }`}
//               style={
//                 !shouldReduceMotion
//                   ? {
//                       animation: `marquee ${Math.max(finalItems.length * 3, 18)}s linear infinite`,
//                       width: 'max-content',
//                     }
//                   : undefined
//               }
//             >
//               {marqueeItems.map((logo, idx) => (
//                 <div
//                   key={`${logo.name}-${idx}`}
//                   className="group/logo flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-[#edf0e9] bg-white px-4 text-center shadow-[0_2px_8px_rgba(30,60,40,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9ddc9] hover:bg-[#f4f8f2] hover:shadow-[0_6px_20px_rgba(45,106,79,0.08)] sm:h-24 sm:w-48 sm:px-5"
//                 >
//                   <span
//                     style={logo.color ? { color: logo.color } : undefined}
//                     className={`${
//                       logo.style || 'font-serif text-xl'
//                     } whitespace-nowrap text-[#a1aaa0] transition-colors duration-300 group-hover/logo:text-[#2d6a4f]`}
//                   >
//                     {logo.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Bottom note */}
//         <motion.div
//           variants={reveal}
//           initial="hidden"
//           animate={isInView ? 'visible' : 'hidden'}
//           transition={{ delay: 0.15 }}
//           className="mt-8 flex items-center justify-center gap-2 text-center sm:mt-10"
//         >
//           <span className="text-xs text-gray-500 sm:text-sm">
//             Inspired by nature. Designed for mindful living.
//           </span>
//           <ArrowUpRight className="h-4 w-4 shrink-0 text-[#2d6a4f]" />
//         </motion.div>
//       </div>

//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .animate-marquee { animation: none !important; }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeaturedIn;


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

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
  });

  const shouldReduceMotion = useReducedMotion();

  // Backend items with fallback
  const rawItems =
    Array.isArray(section.items) && section.items.length
      ? section.items
      : defaultLogos;

  // Normalize backend data
  const items = rawItems
    .map((item) => {
      if (typeof item === 'string') {
        return {
          name: item,
          style: 'font-serif text-xl sm:text-2xl',
        };
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
    .filter((item) => item.name);

  const finalItems = items.length ? items : defaultLogos;

  // Duplicate for seamless marquee
  const marqueeItems = [...finalItems, ...finalItems];

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="
        relative w-full overflow-hidden
        border-y border-[#e9eee9]
        bg-white
        py-10 sm:py-14 lg:py-16
      "
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-28 -top-28
          h-72 w-72 rounded-full
          bg-[#193b2b]/[0.035] blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-28 -left-28
          h-72 w-72 rounded-full
          bg-[#193b2b]/[0.035] blur-3xl
        "
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-11"
        >
          {/* Eyebrow */}
          <div
            className="
              mb-4 inline-flex max-w-full
              items-center justify-center gap-2
              rounded-full
              border border-[#193b2b]/10
              bg-[#193b2b]/[0.035]
              px-3.5 py-2
              text-[#193b2b]
            "
          >
            <Leaf className="h-3.5 w-3.5 shrink-0" />

            <span className="
              break-words text-[9px]
              font-semibold uppercase
              tracking-[0.2em]
              sm:text-[10px]
            ">
              {section.eyebrow || 'Featured In'}
            </span>
          </div>

          {/* Title */}
          <h2
            style={section.color ? { color: section.color } : undefined}
            className="
              mx-auto max-w-2xl
              break-words
              font-serif font-medium
              text-[26px] leading-[1.15]
              tracking-tight
              text-[#193b2b]
              sm:text-3xl
              lg:text-[40px]
            "
          >
            {section.title || 'Recognised by voices that inspire.'}
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto mt-3
              max-w-xl
              break-words
              text-[12px] leading-[1.7]
              text-gray-500
              sm:mt-4 sm:text-sm sm:leading-6
              lg:text-base
            "
          >
            {section.description ||
              'Trusted names celebrating thoughtful design and conscious living.'}
          </p>

          {/* Divider */}
          <div
            className="
              mx-auto mt-5 h-px w-12
              bg-[#193b2b]/30
              sm:mt-6 sm:w-16
            "
          />
        </motion.div>

        {/* Logo Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            delay: 0.15,
          }}
          className="relative w-full"
        >
          {/* Left Fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              inset-y-0 left-0 z-10
              w-8 sm:w-16 lg:w-24
              bg-gradient-to-r
              from-white to-transparent
            "
          />

          {/* Right Fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              inset-y-0 right-0 z-10
              w-8 sm:w-16 lg:w-24
              bg-gradient-to-l
              from-white to-transparent
            "
          />

          {/* Marquee Container */}
          <div className="group w-full overflow-hidden py-2">
            <div
              className={`
                flex w-max items-center
                gap-3 sm:gap-4 lg:gap-5
                ${
                  shouldReduceMotion
                    ? 'flex-wrap justify-center !w-full'
                    : 'group-hover:[animation-play-state:paused]'
                }
              `}
              style={
                !shouldReduceMotion
                  ? {
                      animation: `featuredMarquee ${Math.max(
                        finalItems.length * 3,
                        18
                      )}s linear infinite`,
                    }
                  : undefined
              }
            >
              {marqueeItems.map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="
                    group/logo
                    flex shrink-0
                    h-[76px] w-[132px]
                    items-center justify-center
                    rounded-xl
                    border border-[#193b2b]/[0.09]
                    bg-[#fafbf9]
                    px-3 py-3
                    text-center
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#193b2b]/25
                    hover:bg-[#193b2b]/[0.035]
                    hover:shadow-[0_8px_24px_rgba(25,59,43,0.07)]
                    sm:h-24 sm:w-44 sm:px-5
                    lg:h-28 lg:w-48
                  "
                >
                  <span
                    style={
                      logo.color
                        ? { color: logo.color }
                        : undefined
                    }
                    className={`
                      block w-full
                      whitespace-normal
                      break-words
                      text-center
                      leading-tight
                      text-[#8b978d]
                      transition-colors duration-300
                      group-hover/logo:text-[#193b2b]
                      ${logo.style || 'font-serif text-xl'}
                    `}
                  >
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="
            mt-7 sm:mt-9
            flex flex-wrap
            items-center justify-center
            gap-2 px-2
            text-center
          "
        >
          <span className="
            max-w-full break-words
            text-[10px] leading-5
            text-gray-500
            sm:text-xs
            lg:text-sm
          ">
            Inspired by nature. Designed for mindful living.
          </span>

          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 text-[#193b2b]"
          />
        </motion.div>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes featuredMarquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .group > div {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedIn;
