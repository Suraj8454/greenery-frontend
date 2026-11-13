import useSection from '../hooks/useSection';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence, useInView } from 'framer-motion';
// import { Leaf, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
// import ProductCard from './ProductCard';
// import { useProducts } from '../context/ProductsContext';

// const BestSellers = () => {
//   const { products, loading } = useProducts();
//   const sectionProducts = products.filter(p => p.collection === 'most-loved').slice(0, 8);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const [isPaused, setIsPaused] = useState(false);

//   const sectionRef = useRef(null);
//   const scrollRef = useRef(null);
//   const autoScrollRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     scrollRef.current.scrollBy({
//       left: direction === 'left' ? -240 : 240,
//       behavior: 'smooth',
//     });
//   };

//   const checkScroll = () => {
//     if (!scrollRef.current) return;
//     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//     setCanScrollLeft(scrollLeft > 10);
//     setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
//   };

//   useEffect(() => {
//     checkScroll();
//     const el = scrollRef.current;
//     if (el) {
//       el.addEventListener('scroll', checkScroll);
//       window.addEventListener('resize', checkScroll);
//       return () => {
//         el.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', checkScroll);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (!isInView || isPaused) return;
//     autoScrollRef.current = setInterval(() => {
//       if (!scrollRef.current) return;
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       if (scrollLeft >= scrollWidth - clientWidth - 10) {
//         scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
//       }
//     }, 3500);
//     return () => clearInterval(autoScrollRef.current);
//   }, [isInView, isPaused]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-16 md:py-20 bg-gradient-to-b from-white via-[#faf9f6] to-white overflow-hidden"
//     >
//       <motion.div
//         animate={{ y: [0, -20, 0], rotate: [15, 25, 15] }}
//         transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
//         className="absolute top-32 right-16 opacity-[0.04] pointer-events-none hidden lg:block"
//       >
//         <Leaf className="w-64 h-64 text-[#1a3c2e]" strokeWidth={0.5} />
//       </motion.div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4"
//         >
//           <div className="max-w-lg">
//             <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
//               <motion.div
//                 animate={{ rotate: [0, 15, 0] }}
//                 transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
//               >
//                 <Sparkles className="w-3.5 h-3.5" />
//               </motion.div>
//               Our Bestsellers
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a3c2e] leading-tight">
//               Most Loved{' '}
//               <span className="relative inline-block italic font-light text-[#2d6a4f]">
//                 Pots
//                 <motion.span
//                   initial={{ width: 0 }}
//                   animate={isInView ? { width: '100%' } : {}}
//                   transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
//                   className="absolute bottom-1 left-0 h-1 bg-[#a3d9b1]/60 rounded-full"
//                 />
//               </span>
//             </h2>
//             <p className="text-gray-500 text-sm mt-3">Premium handcrafted pots loved by plant parents across India.</p>
//           </div>

//           <div className="flex gap-2 shrink-0">
//             <button
//               onClick={() => scroll('left')}
//               disabled={!canScrollLeft}
//               className={`w-11 h-11 rounded-full bg-white shadow-lg border border-[#eef2ed] flex items-center justify-center text-[#1a3c2e] transition-all duration-300 hover:bg-[#1a3c2e] hover:text-white ${canScrollLeft ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => scroll('right')}
//               disabled={!canScrollRight}
//               className={`w-11 h-11 rounded-full bg-white shadow-lg border border-[#eef2ed] flex items-center justify-center text-[#1a3c2e] transition-all duration-300 hover:bg-[#1a3c2e] hover:text-white ${canScrollRight ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
//             >
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         </motion.div>

//         {/* Carousel */}
//         <div
//           className="relative"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key="bestsellers"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//               ref={scrollRef}
//               className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-2"
//               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//             >
//               {sectionProducts.map((product, idx) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: idx * 0.06 }}
//                   className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[215px] snap-start relative group"
//                 >
//                   <motion.div
//                     animate={{ opacity: [0.2, 0.35, 0.2] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                     className="absolute -bottom-4 left-6 right-6 h-8 bg-[#2d6a4f]/35 rounded-full blur-2xl -z-10"
//                   />
//                   <div className="absolute inset-0 bg-[#2d6a4f] rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 translate-y-4 scale-95" />
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>

//           <style>{`
//             .scrollbar-hide::-webkit-scrollbar { display: none; }
//             .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//           `}</style>

//           <div className={`absolute top-0 bottom-8 left-0 w-12 bg-gradient-to-r from-[#faf9f6] to-transparent pointer-events-none z-10 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
//           <div className={`absolute top-0 bottom-8 right-0 w-12 bg-gradient-to-l from-[#faf9f6] to-transparent pointer-events-none z-10 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSellers;



import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  ShoppingBag,
} from 'lucide-react';

import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductsContext';

const BestSellers = () => {
  const section = useSection('best_sellers');
  const { products = [], loading } = useProducts();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const reduceMotion = useReducedMotion();

  // Only backend products. No demo/static products.
  const bestSellerProducts = products
    .filter(
      (product) =>
        product.is_active !== 0 &&
        product.collection === 'most-loved'
    )
    .slice(0, 8);

  const updateScrollButtons = () => {
    const element = scrollRef.current;
    if (!element) return;

    setCanScrollLeft(element.scrollLeft > 5);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth <
        element.scrollWidth - 5
    );
  };

  const scrollProducts = (direction) => {
    const element = scrollRef.current;
    if (!element) return;

    const distance = Math.max(element.clientWidth * 0.8, 250);

    element.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      className="relative overflow-hidden bg-[#fafbf8] py-10 sm:py-20 lg:py-10"
      aria-labelledby="bestsellers-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section heading */}
        <div className="mb-9 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce7dc] bg-white px-4 py-2">
              <Leaf className="h-4 w-4 text-[#397653]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#397653]">
                Shop the collection
              </span>
            </div>

            <h2
              id="bestsellers-heading"
              style={section.color ? {color:section.color} : undefined} className="font-['Manrope',sans-serif] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#193b2c] sm:text-4xl lg:text-5xl"
            >
{section.title || 'Our Bestsellers'}
            </h2>

            <p className="mt-4 max-w-lg font-['Manrope',sans-serif] text-sm leading-7 text-[#737d73] sm:text-base">
              {section.description || 'Explore our product collection and find the right fit for you.'}
            </p>
          </motion.div>

          {/* Carousel controls */}
          <div className="flex items-center gap-3">
            <span className="mr-2 hidden text-xs font-medium text-[#7a857b] sm:inline">
              Explore products
            </span>

            <button
              type="button"
              onClick={() => scrollProducts('left')}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe6dc] bg-white text-[#244b36] transition-colors hover:border-[#244b36] hover:bg-[#244b36] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollProducts('right')}
              disabled={!canScrollRight}
              aria-label="Next products"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#244b36] text-white transition-colors hover:bg-[#356b4b] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && bestSellerProducts.length === 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-[#e8ece5] bg-white"
              >
                <div className="aspect-square bg-[#edf0e9]" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-1/3 rounded bg-[#edf0e9]" />
                  <div className="h-4 w-4/5 rounded bg-[#edf0e9]" />
                  <div className="h-4 w-1/2 rounded bg-[#edf0e9]" />
                  <div className="h-10 rounded-xl bg-[#edf0e9]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Backend products */}
        {!loading && bestSellerProducts.length > 0 && (
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={updateScrollButtons}
              onMouseEnter={updateScrollButtons}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
            >
              {bestSellerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.35,
                    delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16),
                  }}
className="w-[58%] min-w-[58%] snap-start sm:w-[36%] sm:min-w-[36%] md:w-[27%] md:min-w-[27%] lg:w-[calc(20%-16px)] lg:min-w-[calc(20%-16px)]"                >
                  <div className="h-full rounded-2xl">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subtle edge fade */}
            <div className="pointer-events-none absolute bottom-5 right-0 top-0 hidden w-8 bg-gradient-to-l from-[#fafbf8] to-transparent md:block" />
          </div>
        )}

        {/* Empty state: no fake products */}
        {!loading && bestSellerProducts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#d8e2d5] bg-white px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3eb]">
              <ShoppingBag className="h-6 w-6 text-[#397653]" />
            </div>

            <h3 className="mt-5 font-['Manrope',sans-serif] text-lg font-semibold text-[#193b2c]">
              No products to display
            </h3>

            <p className="mx-auto mt-2 max-w-md font-['Manrope',sans-serif] text-sm leading-6 text-[#737d73]">
              Products assigned to the most-loved collection will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
