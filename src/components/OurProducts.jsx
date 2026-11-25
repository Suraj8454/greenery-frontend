// import useSection from '../hooks/useSection';



// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { motion, useReducedMotion } from 'framer-motion';
// import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';

// import ProductCard from './ProductCard';
// import { useProducts } from '../context/ProductsContext';

// const OurProducts = () => {
//   const section = useSection('our_products');
//   const { products = [], loading } = useProducts();
//   const scrollRef = useRef(null);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

//   const reduceMotion = useReducedMotion();

//   // Only products received from the backend
//   const sectionProducts = products
//     .filter(
//       (product) =>
//         product.is_active !== 0 &&
//         product.collection === 'our-products'
//     )
//     .slice(0, 8);

//   const checkScroll = useCallback(() => {
//     const element = scrollRef.current;
//     if (!element) return;

//     setCanScrollLeft(element.scrollLeft > 5);
//     setCanScrollRight(
//       element.scrollLeft + element.clientWidth <
//         element.scrollWidth - 5
//     );
//   }, []);

//   const scroll = (direction) => {
//     const element = scrollRef.current;
//     if (!element) return;

//     element.scrollBy({
//       left:
//         direction === 'left'
//           ? -element.clientWidth * 0.8
//           : element.clientWidth * 0.8,
//       behavior: reduceMotion ? 'auto' : 'smooth',
//     });
//   };

//   useEffect(() => {
//     checkScroll();

//     const element = scrollRef.current;
//     if (!element) return;

//     const resizeObserver = new ResizeObserver(checkScroll);
//     resizeObserver.observe(element);

//     element.addEventListener('scroll', checkScroll, { passive: true });
//     window.addEventListener('resize', checkScroll);

//     return () => {
//       resizeObserver.disconnect();
//       element.removeEventListener('scroll', checkScroll);
//       window.removeEventListener('resize', checkScroll);
//     };
//   }, [checkScroll, sectionProducts.length, loading]);

//   // Gentle auto-scroll; pauses while the user interacts
//   useEffect(() => {
//     if (
//       reduceMotion ||
//       isPaused ||
//       loading ||
//       sectionProducts.length < 2
//     ) {
//       return;
//     }

//     const interval = setInterval(() => {
//       const element = scrollRef.current;
//       if (!element) return;

//       const atEnd =
//         element.scrollLeft + element.clientWidth >=
//         element.scrollWidth - 10;

//       element.scrollTo({
//         left: atEnd ? 0 : element.scrollLeft + element.clientWidth * 0.8,
//         behavior: 'smooth',
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isPaused, loading, reduceMotion, sectionProducts.length]);

//   return (
//     <section
//       className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-10"
//       aria-labelledby="our-products-heading"
//     >
//       <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

//         {/* Heading */}
//         <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
//           <motion.div
//             initial={reduceMotion ? false : { opacity: 0, y: 14 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.4 }}
//             className="max-w-2xl"
//           >
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dce7dc] bg-[#fafbf8] px-3.5 py-2">
//               <Tag className="h-3.5 w-3.5 text-[#397653]" />
//               <span className="font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.18em] text-[#397653]">
//                 {section.eyebrow || 'Our collection'}
//               </span>
//             </div>

//             <h2
//               id="our-products-heading"
//               style={section.color ? {color:section.color} : undefined} className="font-['Manrope',sans-serif] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#193b2c] sm:text-4xl lg:text-5xl"
//             >
// {section.title || 'Our Products'}
//             </h2>

//             <p className="mt-3 max-w-lg font-['Manrope',sans-serif] text-sm leading-6 text-[#737d73] sm:text-base">
//               {section.description || 'Explore our collection and find your perfect choice.'}
//             </p>
//           </motion.div>

//           {/* Carousel arrows */}
//           <div className="flex shrink-0 items-center gap-3">
//             <span className="mr-1 hidden font-['Manrope',sans-serif] text-xs text-[#7a857b] sm:inline">
//               Explore collection
//             </span>

//             <button
//               type="button"
//               onClick={() => scroll('left')}
//               disabled={!canScrollLeft}
//               aria-label="Previous products"
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6dc] bg-white text-[#244b36] transition-colors hover:border-[#244b36] hover:bg-[#244b36] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </button>

//             <button
//               type="button"
//               onClick={() => scroll('right')}
//               disabled={!canScrollRight}
//               aria-label="Next products"
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-[#244b36] text-white transition-colors hover:bg-[#356b4b] disabled:cursor-not-allowed disabled:opacity-35"
//             >
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Loading state */}
//         {loading && sectionProducts.length === 0 && (
//           <div className="flex gap-4 overflow-hidden sm:gap-5">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="w-[58%] min-w-[58%] animate-pulse overflow-hidden rounded-2xl border border-[#e8ece5] bg-white sm:w-[36%] sm:min-w-[36%] md:w-[27%] md:min-w-[27%] lg:w-[calc(20%-16px)] lg:min-w-[calc(20%-16px)]"
//               >
//                 <div className="aspect-[4/3] bg-[#edf0e9]" />
//                 <div className="space-y-3 p-3">
//                   <div className="h-3 w-1/3 rounded bg-[#edf0e9]" />
//                   <div className="h-4 w-4/5 rounded bg-[#edf0e9]" />
//                   <div className="h-4 w-1/2 rounded bg-[#edf0e9]" />
//                   <div className="h-9 rounded-xl bg-[#edf0e9]" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Backend products */}
//         {!loading && sectionProducts.length > 0 && (
//           <div
//             className="relative"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             onFocusCapture={() => setIsPaused(true)}
//             onBlurCapture={(event) => {
//               if (!event.currentTarget.contains(event.relatedTarget)) {
//                 setIsPaused(false);
//               }
//             }}
//           >
//             <div
//               ref={scrollRef}
//               onScroll={checkScroll}
//               className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-5 pt-2 sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//             >
//               {sectionProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={
//                     reduceMotion ? false : { opacity: 0, y: 12 }
//                   }
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.1 }}
//                   transition={{
//                     duration: 0.3,
//                     delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.14),
//                   }}
//                   className="w-[58%] min-w-[58%] snap-start sm:w-[36%] sm:min-w-[36%] md:w-[27%] md:min-w-[27%] lg:w-[calc(20%-16px)] lg:min-w-[calc(20%-16px)]"
//                 >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </div>

//             {/* Edge fades */}
//             <div
//               className={`pointer-events-none absolute bottom-5 left-0 top-0 z-10 hidden w-8 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 md:block ${
//                 canScrollLeft ? 'opacity-100' : 'opacity-0'
//               }`}
//             />

//             <div
//               className={`pointer-events-none absolute bottom-5 right-0 top-0 z-10 hidden w-8 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 md:block ${
//                 canScrollRight ? 'opacity-100' : 'opacity-0'
//               }`}
//             />
//           </div>
//         )}

//         {/* Empty state: no placeholder products */}
//         {!loading && sectionProducts.length === 0 && (
//           <div className="rounded-3xl border border-dashed border-[#d8e2d5] bg-[#fafbf8] px-5 py-12 text-center sm:py-14">
//             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3eb]">
//               <Tag className="h-5 w-5 text-[#397653]" />
//             </div>

//             <h3 className="mt-4 font-['Manrope',sans-serif] text-base font-semibold text-[#193b2c]">
//               No products available
//             </h3>

//             <p className="mt-2 font-['Manrope',sans-serif] text-sm text-[#737d73]">
//               Products assigned to this collection will appear here.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default OurProducts;



import useSection from '../hooks/useSection';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Tag } from 'lucide-react';

import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductsContext';

const DOT_COUNT = 3;
const AUTOPLAY_DELAY = 5000;

const OurProducts = () => {
  const section = useSection('our_products');
  const { products = [], loading } = useProducts();

  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);

  const [activeDot, setActiveDot] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reduceMotion = useReducedMotion();

  // Backend products
  const sectionProducts = products.filter(
    (product) =>
      product.is_active !== 0 &&
      product.collection === 'our-products'
  );

  const showCarousel = sectionProducts.length > 5;

  // Update active dot based on scroll position
  const checkScroll = useCallback(() => {
    const element = scrollRef.current;

    if (!element || !showCarousel) {
      setActiveDot(0);
      return;
    }

    const maxScroll = element.scrollWidth - element.clientWidth;

    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }

    const progress = element.scrollLeft / maxScroll;

    const nextDot = Math.min(
      DOT_COUNT - 1,
      Math.round(progress * (DOT_COUNT - 1))
    );

    setActiveDot(nextDot);
  }, [showCarousel]);

  // Scroll to a particular dot
  const goToDot = useCallback(
    (dotIndex) => {
      const element = scrollRef.current;
      if (!element) return;

      const maxScroll = element.scrollWidth - element.clientWidth;

      const target =
        (maxScroll / (DOT_COUNT - 1)) * dotIndex;

      element.scrollTo({
        left: target,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });

      setActiveDot(dotIndex);
    },
    [reduceMotion]
  );

  // Automatic carousel
  useEffect(() => {
    if (
      !showCarousel ||
      isPaused ||
      loading ||
      reduceMotion
    ) {
      return;
    }

    autoplayRef.current = setInterval(() => {
      const nextDot = (activeDot + 1) % DOT_COUNT;
      goToDot(nextDot);
    }, AUTOPLAY_DELAY);

    return () => {
      clearInterval(autoplayRef.current);
    };
  }, [
    activeDot,
    showCarousel,
    isPaused,
    loading,
    reduceMotion,
    goToDot,
  ]);

  // Reset carousel after product updates
  useEffect(() => {
    setActiveDot(0);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'auto',
      });
    }
  }, [sectionProducts.length]);

  return (
    <section
      className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-10"
      aria-labelledby="our-products-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

        {/* Centered Heading */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="mb-3 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dce7dc] bg-[#fafbf8] px-3.5 py-2">
                <Tag className="h-3.5 w-3.5 text-[#397653]" />

                <span className="font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.18em] text-[#397653]">
                  {section.eyebrow || 'Our collection'}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2
              id="our-products-heading"
              style={
                section.color
                  ? { color: section.color }
                  : undefined
              }
              className="w-full text-center font-['Manrope',sans-serif] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#193b2c] sm:text-4xl lg:text-5xl"
            >
              {section.title || 'Our Products'}
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-center font-['Manrope',sans-serif] text-sm leading-6 text-[#737d73] sm:text-base">
              {section.description ||
                'Explore our collection and find your perfect choice.'}
            </p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && sectionProducts.length === 0 && (
          <div className="flex gap-3 overflow-hidden sm:gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-[calc((100%-12px)/2)] min-w-[calc((100%-12px)/2)] animate-pulse overflow-hidden rounded-2xl border border-[#e8ece5] bg-white sm:w-[calc((100%-40px)/3)] sm:min-w-[calc((100%-40px)/3)] lg:w-[calc((100%-96px)/5)] lg:min-w-[calc((100%-96px)/5)]"
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

        {/* Products */}
        {!loading && sectionProducts.length > 0 && (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                setIsPaused(false);
              }
            }}
          >
            {/* Product Carousel */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className={`flex gap-3 pb-5 pt-2 sm:gap-5 ${
                showCarousel
                  ? 'flex-nowrap snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                  : 'flex-wrap justify-center overflow-hidden'
              }`}
            >
              {sectionProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.3,
                    delay: reduceMotion
                      ? 0
                      : Math.min(index * 0.035, 0.14),
                  }}
                  className={`
                    flex-shrink-0
                    ${
                      showCarousel
                        ? `
                          w-[calc((100%-12px)/2)] min-w-[calc((100%-12px)/2)] snap-start
                          sm:w-[calc((100%-40px)/3)]
                          sm:min-w-[calc((100%-40px)/3)]
                          lg:w-[calc((100%-96px)/5)]
                          lg:min-w-[calc((100%-96px)/5)]
                        `
                        : `
                          w-[calc((100%-12px)/2)]
                          sm:w-[calc((100%-40px)/3)]
                          lg:w-[calc((100%-96px)/5)]
                        `
                    }
                  `}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Three Large Dots */}
            {showCarousel && (
              <div className="mt-2 flex items-center justify-center gap-4">
                {Array.from({ length: DOT_COUNT }).map(
                  (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToDot(index)}
                      aria-label={`Go to product group ${index + 1}`}
                      aria-current={
                        activeDot === index ? 'true' : undefined
                      }
                      className={`h-3 rounded-full transition-all duration-300 ${
                        activeDot === index
                          ? 'w-10 bg-[#244b36]'
                          : 'w-3 bg-[#d5dfd3] hover:bg-[#8da58f]'
                      }`}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
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
