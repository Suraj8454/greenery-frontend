import useSection from '../hooks/useSection';
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence, useInView } from 'framer-motion';
// import { Leaf, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
// import ProductCard from './ProductCard';
// import { useProducts } from '../context/ProductsContext';

// const OurProducts = () => {
//   const { products, loading } = useProducts();
//   const sectionProducts = products.filter(p => p.collection === 'our-products').slice(0, 8);
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
//       className="relative py-16 md:py-20 bg-white overflow-hidden"
//     >
//       {/* Decorative */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 0.06 } : {}}
//         transition={{ duration: 1.5 }}
//         className="absolute top-10 -left-20 w-80 h-80 bg-[#a3d9b1] rounded-full blur-[120px] pointer-events-none"
//       />

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
//                 <Tag className="w-3.5 h-3.5" />
//               </motion.div>
//               Sale Collection
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a3c2e] leading-tight">
//               Our{' '}
//               <span className="relative inline-block italic font-light text-[#2d6a4f]">
//                 {section.title || 'Our Products'}
//                 <motion.span
//                   initial={{ width: 0 }}
//                   animate={isInView ? { width: '100%' } : {}}
//                   transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
//                   className="absolute bottom-1 left-0 h-1 bg-[#a3d9b1]/60 rounded-full"
//                 />
//               </span>
//             </h2>
//             <p className="text-gray-500 text-sm mt-3">Big discounts on our premium planter range.</p>
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
//               key="our-products"
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

//           <div className={`absolute top-0 bottom-8 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
//           <div className={`absolute top-0 bottom-8 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurProducts;


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';

import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductsContext';

const OurProducts = () => {
  const section = useSection('our_products');
  const { products = [], loading } = useProducts();
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const reduceMotion = useReducedMotion();

  // Only products received from the backend
  const sectionProducts = products
    .filter(
      (product) =>
        product.is_active !== 0 &&
        product.collection === 'our-products'
    )
    .slice(0, 8);

  const checkScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    setCanScrollLeft(element.scrollLeft > 5);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth <
        element.scrollWidth - 5
    );
  }, []);

  const scroll = (direction) => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left:
        direction === 'left'
          ? -element.clientWidth * 0.8
          : element.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    checkScroll();

    const element = scrollRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(element);

    element.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, sectionProducts.length, loading]);

  // Gentle auto-scroll; pauses while the user interacts
  useEffect(() => {
    if (
      reduceMotion ||
      isPaused ||
      loading ||
      sectionProducts.length < 2
    ) {
      return;
    }

    const interval = setInterval(() => {
      const element = scrollRef.current;
      if (!element) return;

      const atEnd =
        element.scrollLeft + element.clientWidth >=
        element.scrollWidth - 10;

      element.scrollTo({
        left: atEnd ? 0 : element.scrollLeft + element.clientWidth * 0.8,
        behavior: 'smooth',
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, loading, reduceMotion, sectionProducts.length]);

  return (
    <section
      className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-10"
      aria-labelledby="our-products-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dce7dc] bg-[#fafbf8] px-3.5 py-2">
              <Tag className="h-3.5 w-3.5 text-[#397653]" />
              <span className="font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.18em] text-[#397653]">
                {section.eyebrow || 'Our collection'}
              </span>
            </div>

            <h2
              id="our-products-heading"
              style={section.color ? {color:section.color} : undefined} className="font-['Manrope',sans-serif] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#193b2c] sm:text-4xl lg:text-5xl"
            >
{section.title || 'Our Products'}
            </h2>

            <p className="mt-3 max-w-lg font-['Manrope',sans-serif] text-sm leading-6 text-[#737d73] sm:text-base">
              {section.description || 'Explore our collection and find your perfect choice.'}
            </p>
          </motion.div>

          {/* Carousel arrows */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="mr-1 hidden font-['Manrope',sans-serif] text-xs text-[#7a857b] sm:inline">
              Explore collection
            </span>

            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6dc] bg-white text-[#244b36] transition-colors hover:border-[#244b36] hover:bg-[#244b36] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#244b36] text-white transition-colors hover:bg-[#356b4b] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && sectionProducts.length === 0 && (
          <div className="flex gap-4 overflow-hidden sm:gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-[58%] min-w-[58%] animate-pulse overflow-hidden rounded-2xl border border-[#e8ece5] bg-white sm:w-[36%] sm:min-w-[36%] md:w-[27%] md:min-w-[27%] lg:w-[calc(20%-16px)] lg:min-w-[calc(20%-16px)]"
              >
                <div className="aspect-[4/3] bg-[#edf0e9]" />
                <div className="space-y-3 p-3">
                  <div className="h-3 w-1/3 rounded bg-[#edf0e9]" />
                  <div className="h-4 w-4/5 rounded bg-[#edf0e9]" />
                  <div className="h-4 w-1/2 rounded bg-[#edf0e9]" />
                  <div className="h-9 rounded-xl bg-[#edf0e9]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Backend products */}
        {!loading && sectionProducts.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false);
              }
            }}
          >
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-5 pt-2 sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sectionProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 12 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.3,
                    delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.14),
                  }}
                  className="w-[58%] min-w-[58%] snap-start sm:w-[36%] sm:min-w-[36%] md:w-[27%] md:min-w-[27%] lg:w-[calc(20%-16px)] lg:min-w-[calc(20%-16px)]"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Edge fades */}
            <div
              className={`pointer-events-none absolute bottom-5 left-0 top-0 z-10 hidden w-8 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 md:block ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div
              className={`pointer-events-none absolute bottom-5 right-0 top-0 z-10 hidden w-8 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 md:block ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}

        {/* Empty state: no placeholder products */}
        {!loading && sectionProducts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#d8e2d5] bg-[#fafbf8] px-5 py-12 text-center sm:py-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3eb]">
              <Tag className="h-5 w-5 text-[#397653]" />
            </div>

            <h3 className="mt-4 font-['Manrope',sans-serif] text-base font-semibold text-[#193b2c]">
              No products available
            </h3>

            <p className="mt-2 font-['Manrope',sans-serif] text-sm text-[#737d73]">
              Products assigned to this collection will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
