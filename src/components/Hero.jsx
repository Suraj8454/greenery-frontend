
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// import {
//   Leaf,
//   ChevronRight,
//   ChevronLeft,
// } from 'lucide-react';
// import { api, mediaUrl } from '../utils/api';

// const DEFAULT_SLIDES = [
//   {
//     image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920',
//     tagline: 'Bring Nature Home',
//     title1: 'Greener Spaces',
//     title2: 'for a',
//     title3: 'Brighter Tomorrow',
//     description:
//       'Premium plants, stylish pots, eco-friendly cocopeat and everything you need for a greener, healthier lifestyle.',
//     button_text: 'Shop Plants',
//     button_url: '/category/Indoor',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1920',
//     tagline: 'Premium Planters',
//     title1: 'Crafted Pots',
//     title2: 'for',
//     title3: 'Modern Living',
//     description:
//       'Handpicked planters designed to elevate your space with timeless elegance.',
//     button_text: 'Explore Planters',
//     button_url: '/category/Planters',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1920',
//     tagline: 'Green Your World',
//     title1: 'Every Corner',
//     title2: 'deserves a',
//     title3: 'Touch of Green',
//     description:
//       'Discover plants, soil and supplies for every green dream.',
//     button_text: 'Shop Now',
//     button_url: '/',
//   },
// ];

// const AUTOPLAY_MS = 5500;

// const contentVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.15,
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.25 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.55,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [slides, setSlides] = useState(DEFAULT_SLIDES);

//   const resumeTimer = useRef(null);
//   const reduceMotion = useReducedMotion();

//   // Fetch slides from backend
//   useEffect(() => {
//     let cancelled = false;

//     api('/slides')
//       .then((rows) => {
//         if (cancelled) return;

//         if (Array.isArray(rows) && rows.length) {
//           setSlides(
//             rows.map((slide) => ({
//               ...slide,
//               image: mediaUrl(slide.image),
//             }))
//           );
//         }
//       })
//       .catch(() => {});

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Reset slide if slides count changes
//   useEffect(() => {
//     if (currentSlide >= slides.length) {
//       setCurrentSlide(0);
//     }
//   }, [currentSlide, slides.length]);

//   // Preload adjacent images
//   useEffect(() => {
//     if (slides.length < 2) return;

//     const next = (currentSlide + 1) % slides.length;
//     const prev = (currentSlide - 1 + slides.length) % slides.length;

//     [next, prev].forEach((index) => {
//       const img = new Image();
//       img.src = slides[index].image;
//     });
//   }, [currentSlide, slides]);

//   // Autoplay
//   useEffect(() => {
//     if (!isAutoPlay || slides.length < 2 || reduceMotion) return;

//     const id = setInterval(() => {
//       setCurrentSlide((previous) => (previous + 1) % slides.length);
//     }, AUTOPLAY_MS);

//     return () => clearInterval(id);
//   }, [isAutoPlay, slides.length, reduceMotion]);

//   // Cleanup timer
//   useEffect(() => {
//     return () => clearTimeout(resumeTimer.current);
//   }, []);

//   const pauseAndScheduleResume = useCallback(() => {
//     setIsAutoPlay(false);

//     clearTimeout(resumeTimer.current);

//     resumeTimer.current = setTimeout(() => {
//       setIsAutoPlay(true);
//     }, 10000);
//   }, []);

//   const goToSlide = useCallback(
//     (index) => {
//       setCurrentSlide(index);
//       pauseAndScheduleResume();
//     },
//     [pauseAndScheduleResume]
//   );

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((previous) => (previous + 1) % slides.length);
//     pauseAndScheduleResume();
//   }, [slides.length, pauseAndScheduleResume]);

//   const prevSlide = useCallback(() => {
//     setCurrentSlide(
//       (previous) => (previous - 1 + slides.length) % slides.length
//     );
//     pauseAndScheduleResume();
//   }, [slides.length, pauseAndScheduleResume]);

//   const activeSlide = slides[currentSlide] || slides[0];

//   return (
//     <section className="relative w-full h-[70vh] min-h-[480px] max-h-[700px] md:h-[78vh] md:min-h-[550px] overflow-hidden bg-[#0b1512]">

//       {/* Background Images */}
//       <div className="absolute inset-0 z-0">
//         {slides.map((slide, index) => (
//           <motion.div
//             key={index}
//             initial={false}
//             animate={{
//               opacity: index === currentSlide ? 1 : 0,
//             }}
//             transition={{
//               duration: reduceMotion ? 0 : 0.9,
//               ease: 'easeInOut',
//             }}
//             className="absolute inset-0"
//             aria-hidden={index !== currentSlide}
//           >
//             <img
//               src={slide.image}
//               alt=""
//               className="w-full h-full object-cover object-center"
//               loading={index === 0 ? 'eager' : 'lazy'}
//               decoding="async"
//               draggable={false}
//             />
//           </motion.div>
//         ))}

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
//       </div>

//       {/* Decorative Leaf */}
//       {!reduceMotion && (
//         <motion.div
//           animate={{
//             y: [0, -14, 0],
//             rotate: [45, 52, 45],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: 'easeInOut',
//           }}
//           className="absolute top-24 right-20 z-[1] opacity-15 pointer-events-none hidden lg:block"
//         >
//           <Leaf
//             className="w-32 h-32 text-[#a3d9b1]"
//             strokeWidth={0.5}
//           />
//         </motion.div>
//       )}

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center pt-16 pb-16">

//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={currentSlide}
//             variants={contentVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="max-w-xl"
//           >
//             {/* Tagline */}
//             <motion.div
//               variants={itemVariants}
//               className="flex items-center gap-2 text-[#a3d9b1] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4"
//             >
//               <Leaf className="w-4 h-4" />
//               {activeSlide.tagline}
//             </motion.div>

//             {/* Heading */}
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.15] mb-4 drop-shadow-lg">
//               <motion.span
//                 variants={itemVariants}
//                 className="block"
//               >
//                 {activeSlide.title1}
//               </motion.span>

//               <motion.span
//                 variants={itemVariants}
//                 className="block"
//               >
//                 {activeSlide.title2}{' '}
//                 <span className="italic font-light text-[#a3d9b1]">
//                   {activeSlide.title3}
//                 </span>
//               </motion.span>
//             </h1>

//             {/* Description */}
//             <motion.p
//               variants={itemVariants}
//               className="text-gray-200/90 text-xs sm:text-sm md:text-base max-w-md leading-relaxed mb-6"
//             >
//               {activeSlide.description}
//             </motion.p>

//             {/* Buttons */}
//             <motion.div
//               variants={itemVariants}
//               className="flex flex-wrap gap-3"
//             >
//               <a
//                 href={activeSlide.button_url || '/'}
//                 className="group bg-[#a3d9b1] text-[#1a3c2e] hover:bg-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
//               >
//                 {activeSlide.button_text || 'Shop Plants'}

//                 <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
//               </a>

//               <a
//                 href="/#categories"
//                 className="group border border-white/40 text-white hover:bg-white/10 px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-colors duration-200 active:scale-[0.98]"
//               >
//                 Explore Categories
//               </a>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Navigation Arrows */}
//       {slides.length > 1 && (
//         <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
//           <button
//             onClick={prevSlide}
//             aria-label="Previous slide"
//             className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#a3d9b1] hover:text-[#1a3c2e] hover:border-[#a3d9b1] transition-colors duration-200"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>

//           <button
//             onClick={nextSlide}
//             aria-label="Next slide"
//             className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#a3d9b1] hover:text-[#1a3c2e] hover:border-[#a3d9b1] transition-colors duration-200"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       {/* Slider Dots */}
//       {slides.length > 1 && (
//         <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//               aria-current={currentSlide === index}
//               className="group p-1"
//             >
//               <span
//                 className={`block h-1.5 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? 'w-10 bg-[#a3d9b1]'
//                     : 'w-4 bg-white/30 group-hover:bg-white/60'
//                 }`}
//               />
//             </button>
//           ))}
//         </div>
//       )}

//     </section>
//   );
// };

// export default Hero;



import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Leaf,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { api, mediaUrl } from '../utils/api';

const DEFAULT_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920',
    tagline: 'Bring Nature Home',
    title1: 'Greener Spaces',
    title2: 'for a',
    title3: 'Brighter Tomorrow',
    description:
      'Premium plants, stylish pots, eco-friendly cocopeat and everything you need for a greener, healthier lifestyle.',
    button_text: 'Shop Plants',
    button_url: '/category/Indoor',
  },
  {
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1920',
    tagline: 'Premium Planters',
    title1: 'Crafted Pots',
    title2: 'for',
    title3: 'Modern Living',
    description:
      'Handpicked planters designed to elevate your space with timeless elegance.',
    button_text: 'Explore Planters',
    button_url: '/category/Planters',
  },
  {
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1920',
    tagline: 'Green Your World',
    title1: 'Every Corner',
    title2: 'deserves a',
    title3: 'Touch of Green',
    description:
      'Discover plants, soil and supplies for every green dream.',
    button_text: 'Shop Now',
    button_url: '/',
  },
];

const AUTOPLAY_MS = 5500;

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  const resumeTimer = useRef(null);
  const touchStartX = useRef(0);
  const reduceMotion = useReducedMotion();

  // Fetch slides from backend - existing API structure preserved
  useEffect(() => {
    let cancelled = false;

    api('/slides')
      .then((rows) => {
        if (cancelled) return;

        if (Array.isArray(rows) && rows.length) {
          setSlides(
            rows.map((slide) => ({
              ...slide,
              image: mediaUrl(slide.image),
            }))
          );
        }
      })
      .catch((error) => {
        console.error('Hero slides loading error:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Reset slide if slides count changes
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  // Preload adjacent images
  useEffect(() => {
    if (slides.length < 2) return;

    const next = (currentSlide + 1) % slides.length;
    const prev = (currentSlide - 1 + slides.length) % slides.length;

    [next, prev].forEach((index) => {
      const img = new Image();
      img.src = slides[index].image;
    });
  }, [currentSlide, slides]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlay || slides.length < 2 || reduceMotion) return;

    const id = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [isAutoPlay, slides.length, reduceMotion]);

  // Cleanup timer
  useEffect(() => {
    return () => clearTimeout(resumeTimer.current);
  }, []);

  // Pause autoplay after manual interaction
  const pauseAndScheduleResume = useCallback(() => {
    setIsAutoPlay(false);

    clearTimeout(resumeTimer.current);

    resumeTimer.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(index);
      pauseAndScheduleResume();
    },
    [pauseAndScheduleResume]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
    pauseAndScheduleResume();
  }, [slides.length, pauseAndScheduleResume]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (previous) => (previous - 1 + slides.length) % slides.length
    );
    pauseAndScheduleResume();
  }, [slides.length, pauseAndScheduleResume]);

  // Mobile swipe support
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX;

    if (Math.abs(difference) < 50 || slides.length < 2) return;

    if (difference > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const activeSlide = slides[currentSlide] || slides[0];

  if (!activeSlide) return null;

  return (
    <section
      className="
        relative w-full overflow-hidden bg-[#193b2b]
        h-[400px] min-h-[400px] max-h-[400px]
        sm:h-[500px] sm:min-h-[500px] sm:max-h-[500px]
        md:h-[580px] md:min-h-[580px] md:max-h-[580px]
        lg:h-[650px] lg:min-h-[650px] lg:max-h-[650px]
      "
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id || index}
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.image}
              alt={slide.tagline || 'Cityscape Greenery'}
              className="
                h-full w-full object-cover
                object-center
              "
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          </motion.div>
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </div>

      {/* Decorative Leaf */}
      {!reduceMotion && (
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [45, 52, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute top-24 right-20 z-[1]
            opacity-15 pointer-events-none hidden lg:block
          "
        >
          <Leaf
            className="w-32 h-32 text-white"
            strokeWidth={0.5}
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div
        className="
            relative z-10 mx-auto flex h-full w-full
  max-w-7xl items-center
  px-5 sm:px-8 lg:px-10
  pt-20 pb-5
  sm:pt-16 sm:pb-5
        "
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-xl"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="
                mb-3 sm:mb-5
                flex items-center gap-2
                text-white/90 text-[9px] sm:text-xs
                font-semibold tracking-[0.22em] sm:tracking-[0.3em]
                uppercase
              "
            >
              <Leaf className="w-4 h-4" />
              {activeSlide.tagline}
            </motion.div>

            {/* Heading - Backend data preserved */}
            <h1
              className="
                mb-3 sm:mb-5
                font-serif font-medium text-white
                text-[34px] leading-[1.04]
                sm:text-5xl
                md:text-6xl
                lg:text-[68px]
                tracking-[-0.025em]
                drop-shadow-lg
              "
            >
              <motion.span
                variants={itemVariants}
                className="block"
              >
                {activeSlide.title1}
              </motion.span>

              <motion.span
                variants={itemVariants}
                className="block"
              >
                {activeSlide.title2}{' '}
                <span className="italic font-normal text-white/85">
                  {activeSlide.title3}
                </span>
              </motion.span>
            </h1>

            {/* Description - Backend data preserved */}
            <motion.p
              variants={itemVariants}
              className="
                mb-5 sm:mb-7
                max-w-md
                text-white/85
                text-[11px] leading-[1.65]
                sm:text-sm sm:leading-relaxed
                md:text-base
              "
            >
              {activeSlide.description}
            </motion.p>

            {/* Buttons - Backend button data preserved */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              <a
                href={activeSlide.button_url || '/'}
                className="
                  group inline-flex items-center gap-2
                  rounded-full
                  bg-white text-[#193b2b]
                  hover:bg-[#193b2b] hover:text-white
                  px-5 py-2.5
                  sm:px-7 sm:py-3
                  font-semibold
                  text-[11px] sm:text-sm
                  transition-all duration-300
                  shadow-lg active:scale-[0.98]
                "
              >
                {activeSlide.button_text || 'Shop Plants'}

                <ChevronRight
                  className="
                    h-4 w-4
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                />
              </a>

              <a
                href="/#categories"
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  border border-white/50
                  text-white hover:bg-white/10
                  px-5 py-2.5
                  sm:px-7 sm:py-3
                  font-medium
                  text-[11px] sm:text-sm
                  transition-all duration-300
                  active:scale-[0.98]
                "
              >
                Explore Categories
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop */}
      {slides.length > 1 && (
        <div
          className="
            absolute right-5 md:right-8
            top-1/2 -translate-y-1/2
            z-20 hidden md:flex flex-col gap-3
          "
        >
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-white/10 border border-white/30
              text-white
              hover:bg-white hover:text-[#193b2b]
              transition-all duration-300
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-white/10 border border-white/30
              text-white
              hover:bg-white hover:text-[#193b2b]
              transition-all duration-300
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slider Dots */}
      {slides.length > 1 && (
        <div
          className="
            absolute bottom-4 sm:bottom-6
            left-1/2 -translate-x-1/2
            z-20 flex items-center gap-2.5
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index}
              className="group p-1"
            >
              <span
                className={`
                  block h-1 rounded-full
                  transition-all duration-300
                  ${
                    currentSlide === index
                      ? 'w-8 sm:w-10 bg-white'
                      : 'w-3 sm:w-4 bg-white/45 group-hover:bg-white/80'
                  }
                `}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
