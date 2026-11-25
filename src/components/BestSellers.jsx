// import useSection from '../hooks/useSection';
// import React, { useRef, useState } from 'react';
// import { motion, useReducedMotion } from 'framer-motion';
// import {
//   ArrowLeft,
//   ArrowRight,
//   Leaf,
//   ShoppingBag,
// } from 'lucide-react';

// import ProductCard from './ProductCard';
// import { useProducts } from '../context/ProductsContext';

// const BestSellers = () => {
//   const section = useSection('best_sellers');
//   const { products = [], loading } = useProducts();
//   const scrollRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const reduceMotion = useReducedMotion();

//   // Only backend products. No demo/static products.
//   const bestSellerProducts = products
//     .filter(
//       (product) =>
//         product.is_active !== 0 &&
//         product.collection === 'most-loved'
//     )
//     .slice(0, 8);

//   const updateScrollButtons = () => {
//     const element = scrollRef.current;
//     if (!element) return;

//     setCanScrollLeft(element.scrollLeft > 5);
//     setCanScrollRight(
//       element.scrollLeft + element.clientWidth <
//         element.scrollWidth - 5
//     );
//   };

//   const scrollProducts = (direction) => {
//     const element = scrollRef.current;
//     if (!element) return;

//     const distance = Math.max(element.clientWidth * 0.8, 250);

//     element.scrollBy({
//       left: direction === 'left' ? -distance : distance,
//       behavior: reduceMotion ? 'auto' : 'smooth',
//     });
//   };

//   return (
//     <section
//       className="relative overflow-hidden bg-[#fafbf8] py-10 sm:py-20 lg:py-10"
//       aria-labelledby="bestsellers-heading"
//     >
//       <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
//         {/* Section heading */}
//         <div className="mb-9 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
//           <motion.div
//             initial={reduceMotion ? false : { opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.25 }}
//             transition={{ duration: 0.45 }}
//             className="max-w-2xl"
//           >
//             <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce7dc] bg-white px-4 py-2">
//               <Leaf className="h-4 w-4 text-[#397653]" />
//               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#397653]">
//                 Shop the collection
//               </span>
//             </div>

//             <h2
//               id="bestsellers-heading"
//               style={section.color ? {color:section.color} : undefined} className="font-['Manrope',sans-serif] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#193b2c] sm:text-4xl lg:text-5xl"
//             >
// {section.title || 'Our Bestsellers'}
//             </h2>

//             <p className="mt-4 max-w-lg font-['Manrope',sans-serif] text-sm leading-7 text-[#737d73] sm:text-base">
//               {section.description || 'Explore our product collection and find the right fit for you.'}
//             </p>
//           </motion.div>

//           {/* Carousel controls */}
//           <div className="flex items-center gap-3">
//             <span className="mr-2 hidden text-xs font-medium text-[#7a857b] sm:inline">
//               Explore products
//             </span>

//             <button
//               type="button"
//               onClick={() => scrollProducts('left')}
//               disabled={!canScrollLeft}
//               aria-label="Previous products"
//               className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe6dc] bg-white text-[#244b36] transition-colors hover:border-[#244b36] hover:bg-[#244b36] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </button>

//             <button
//               type="button"
//               onClick={() => scrollProducts('right')}
//               disabled={!canScrollRight}
//               aria-label="Next products"
//               className="flex h-11 w-11 items-center justify-center rounded-full bg-[#244b36] text-white transition-colors hover:bg-[#356b4b] disabled:cursor-not-allowed disabled:opacity-35"
//             >
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Loading state */}
//         {loading && bestSellerProducts.length === 0 && (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="animate-pulse overflow-hidden rounded-2xl border border-[#e8ece5] bg-white"
//               >
//                 <div className="aspect-square bg-[#edf0e9]" />
//                 <div className="space-y-3 p-4">
//                   <div className="h-3 w-1/3 rounded bg-[#edf0e9]" />
//                   <div className="h-4 w-4/5 rounded bg-[#edf0e9]" />
//                   <div className="h-4 w-1/2 rounded bg-[#edf0e9]" />
//                   <div className="h-10 rounded-xl bg-[#edf0e9]" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Backend products */}
//         {!loading && bestSellerProducts.length > 0 && (
//           <div className="relative">
//             <div
//               ref={scrollRef}
//               onScroll={updateScrollButtons}
//               onMouseEnter={updateScrollButtons}
//               className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
//             >
//               {bestSellerProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={
//                     reduceMotion ? false : { opacity: 0, y: 14 }
//                   }
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.1 }}
//                   transition={{
//                     duration: 0.35,
//                     delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16),
//                   }}
// className="w-[58%] min-w-[58%] snap-start sm:w-[36%] sm:min-w-[36%] md:w-[27%] md:min-w-[27%] lg:w-[calc(20%-16px)] lg:min-w-[calc(20%-16px)]"                >
//                   <div className="h-full rounded-2xl">
//                     <ProductCard product={product} />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Subtle edge fade */}
//             <div className="pointer-events-none absolute bottom-5 right-0 top-0 hidden w-8 bg-gradient-to-l from-[#fafbf8] to-transparent md:block" />
//           </div>
//         )}

//         {/* Empty state: no fake products */}
//         {!loading && bestSellerProducts.length === 0 && (
//           <div className="rounded-3xl border border-dashed border-[#d8e2d5] bg-white px-5 py-14 text-center sm:py-16">
//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3eb]">
//               <ShoppingBag className="h-6 w-6 text-[#397653]" />
//             </div>

//             <h3 className="mt-5 font-['Manrope',sans-serif] text-lg font-semibold text-[#193b2c]">
//               No products to display
//             </h3>

//             <p className="mx-auto mt-2 max-w-md font-['Manrope',sans-serif] text-sm leading-6 text-[#737d73]">
//               Products assigned to the most-loved collection will appear here.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BestSellers;



import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, ShoppingBag } from 'lucide-react';

import useSection from '../hooks/useSection';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductsContext';

const DOT_COUNT = 3;
const AUTOPLAY_DELAY = 3500;

const BestSellers = () => {
  const section = useSection('best_sellers');
  const { products = [], loading } = useProducts();

  const scrollRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [activeDot, setActiveDot] = useState(0);

  // Backend products only
  const bestSellerProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.is_active !== 0 &&
          product.collection === 'most-loved'
      )
    : [];

  // Carousel only when more than 5 products
  const showCarousel = bestSellerProducts.length > 5;

  // Calculate active dot based on scroll position
  const updateActiveDot = useCallback(() => {
    const element = scrollRef.current;

    if (!element || !showCarousel) return;

    const maxScroll =
      element.scrollWidth - element.clientWidth;

    if (maxScroll <= 5) {
      setActiveDot(0);
      return;
    }

    const progress = element.scrollLeft / maxScroll;

    const index = Math.round(
      progress * (DOT_COUNT - 1)
    );

    setActiveDot(
      Math.max(0, Math.min(DOT_COUNT - 1, index))
    );
  }, [showCarousel]);

  // Scroll to a particular dot position
  const goToDot = useCallback(
    (index) => {
      const element = scrollRef.current;

      if (!element) return;

      const maxScroll =
        element.scrollWidth - element.clientWidth;

      const targetPosition =
        (maxScroll / (DOT_COUNT - 1)) * index;

      element.scrollTo({
        left: targetPosition,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });

      setActiveDot(index);
    },
    [reduceMotion]
  );

  // Automatic carousel
  useEffect(() => {
    if (!showCarousel || loading) return;

    const interval = setInterval(() => {
      const element = scrollRef.current;

      if (!element) return;

      const maxScroll =
        element.scrollWidth - element.clientWidth;

      if (maxScroll <= 5) return;

      const progress = element.scrollLeft / maxScroll;

      const currentPosition = Math.round(
        progress * (DOT_COUNT - 1)
      );

      const nextPosition =
        currentPosition >= DOT_COUNT - 1
          ? 0
          : currentPosition + 1;

      goToDot(nextPosition);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [
    showCarousel,
    loading,
    bestSellerProducts.length,
    goToDot,
  ]);

  // Reset dot when product list changes
  useEffect(() => {
    setActiveDot(0);

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [bestSellerProducts.length]);

  return (
    <section
      className="relative overflow-hidden bg-[#fafbf8] py-10 sm:py-16 lg:py-14"
      aria-labelledby="bestsellers-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

        {/* SECTION HEADER */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="mb-9 text-center sm:mb-12"
        >

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce7dc] bg-white px-4 py-2">
            <Leaf className="h-4 w-4 text-[#397653]" />

            <span className="font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.2em] text-[#397653]">
              Shop the collection
            </span>
          </div>

          <h2
            id="bestsellers-heading"
            style={
              section?.color
                ? { color: section.color }
                : undefined
            }
            className="font-['Manrope',sans-serif] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#193b2c] sm:text-4xl lg:text-5xl"
          >
            {section?.title || 'Our Bestsellers'}
          </h2>

          <p className="mx-auto mt-4 max-w-lg font-['Manrope',sans-serif] text-sm leading-7 text-[#737d73] sm:text-base">
            {section?.description ||
              'Explore our product collection and find the right fit for you.'}
          </p>

        </motion.div>

        {/* LOADING STATE */}
        {loading && bestSellerProducts.length === 0 && (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="w-[calc((100%-12px)/2)] animate-pulse overflow-hidden rounded-2xl border border-[#e8ece5] bg-white sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-80px)/5)]"
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

        {/* PRODUCTS */}
        {!loading && bestSellerProducts.length > 0 && (
          <div className="w-full">

            <div
              ref={scrollRef}
              onScroll={updateActiveDot}
              className={`
                flex gap-4 sm:gap-5 lg:gap-6
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                ${
                  showCarousel
                    ? 'flex-nowrap overflow-x-auto snap-x snap-mandatory'
                    : 'flex-wrap justify-center overflow-hidden'
                }
              `}
            >

              {bestSellerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: reduceMotion
                      ? 0
                      : Math.min(index * 0.04, 0.16),
                  }}
                  className={`
                    min-w-0
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
                  <div className="h-full">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}

            </div>

            {/* THREE LARGE DOTS */}
            {showCarousel && (
              <div className="mt-8 flex items-center justify-center gap-4">

                {Array.from({ length: DOT_COUNT }).map(
                  (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToDot(index)}
                      aria-label={`Show products section ${index + 1}`}
                      aria-current={
                        activeDot === index ? 'true' : undefined
                      }
                      className={`
                        h-3 rounded-full transition-all duration-300
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#193b2c]
                        focus-visible:ring-offset-4
                        ${
                          activeDot === index
                            ? 'w-10 bg-[#193b2c]'
                            : 'w-3 bg-[#c5d0c4] hover:bg-[#78917c]'
                        }
                      `}
                    />
                  )
                )}

              </div>
            )}

          </div>
        )}

        {/* EMPTY STATE */}
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
