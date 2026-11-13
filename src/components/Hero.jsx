


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import { Leaf, ChevronRight, ChevronLeft, Truck, ShieldCheck, Users, Sprout } from 'lucide-react';
// import { api, mediaUrl } from '../utils/api';

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);

//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 500], [0, 100]);
//   const opacity = useTransform(scrollY, [0, 400], [1, 0]);

//   // Slides are managed from the admin panel; defaults keep the hero usable if API is offline.
//   const defaultSlides = [
//     { image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920', tagline: 'Bring Nature Home', title1: 'Greener Spaces', title2: 'for a', title3: 'Brighter Tomorrow', description: 'Premium plants, stylish pots, eco-friendly cocopeat and everything you need for a greener, healthier lifestyle.', button_text: 'Shop Plants', button_url: '/category/Indoor' },
//     { image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1920', tagline: 'Premium Planters', title1: 'Crafted Pots', title2: 'for', title3: 'Modern Living', description: 'Handpicked planters designed to elevate your space with timeless elegance.', button_text: 'Explore Planters', button_url: '/category/Planters' },
//     { image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1920', tagline: 'Green Your World', title1: 'Every Corner', title2: 'deserves a', title3: 'Touch of Green', description: 'Discover plants, soil and supplies for every green dream.', button_text: 'Shop Now', button_url: '/' },
//   ];
//   const [slides, setSlides] = useState(defaultSlides);
//   useEffect(() => { api('/slides').then(rows => { if (Array.isArray(rows) && rows.length) setSlides(rows.map(slide => ({ ...slide, image: mediaUrl(slide.image) }))); }).catch(() => {}); }, []);
//   useEffect(() => { if (currentSlide >= slides.length) setCurrentSlide(0); }, [currentSlide, slides.length]);
//   const activeSlide = slides[currentSlide] || slides[0];

//   // ============ AUTOPLAY ============
//   useEffect(() => {
//     if (!isAutoPlay) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5500);
//     return () => clearInterval(interval);
//   }, [isAutoPlay, slides.length]);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     setIsAutoPlay(false);
//     // Resume autoplay after 10s of inactivity
//     setTimeout(() => setIsAutoPlay(true), 10000);
//   };

//   const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
//   const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

//   // ============ FEATURES BAR ============
//   const features = [
//     { icon: <Sprout className="w-5 h-5" />, title: 'Wide Range', sub: 'of Plants' },
//     { icon: <Truck className="w-5 h-5" />, title: 'Pan India', sub: 'Delivery' },
//     { icon: <ShieldCheck className="w-5 h-5" />, title: 'Quality', sub: 'Assured' },
//     { icon: <Users className="w-5 h-5" />, title: 'Expert', sub: 'Guidance' },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.12, delayChildren: 0.3 },
//     },
//     exit: { opacity: 0, transition: { duration: 0.3 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] } 
//     },
//   };

//   return (
//     <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black">

//       {/* ============ CAROUSEL BACKGROUND IMAGES ============ */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.05 }}
//           transition={{ duration: 1.2, ease: 'easeOut' }}
//           className="absolute inset-0 z-0"
//         >
//           <motion.img
//             style={{ y: y1 }}
//             src={activeSlide.image}
//             alt="Hero Background"
//             className="w-full h-[120%] object-cover object-center"
//           />
//           {/* DARK OVERLAY (left dark, right lighter) */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"></div>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"></div>
//         </motion.div>
//       </AnimatePresence>

//       {/* ============ FLOATING DECORATIVE LEAVES ============ */}
//       <motion.div 
//         animate={{ 
//           y: [0, -20, 0],
//           rotate: [45, 55, 45],
//         }}
//         transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
//         className="absolute top-32 right-20 z-[1] opacity-20 pointer-events-none hidden lg:block"
//       >
//         <Leaf className="w-48 h-48 text-[#a3d9b1]" strokeWidth={0.5} />
//       </motion.div>
//       <motion.div 
//         animate={{ 
//           y: [0, 25, 0],
//           rotate: [-30, -20, -30],
//         }}
//         transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
//         className="absolute bottom-40 right-40 z-[1] opacity-15 pointer-events-none hidden lg:block"
//       >
//         <Leaf className="w-32 h-32 text-[#a3d9b1]" strokeWidth={0.5} />
//       </motion.div>

//       {/* ============ MAIN CONTENT ============ */}
//       <motion.div 
//         style={{ opacity }}
//         className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-48 md:pt-32 md:pb-56"
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="max-w-xl"
//           >
//             {/* Tagline */}
//             <motion.div 
//               variants={itemVariants}
//               className="flex items-center gap-2 text-[#a3d9b1] text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
//             >
//               <motion.div
//                 animate={{ rotate: [0, 15, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//               >
//                 <Leaf className="w-4 h-4" />
//               </motion.div>
//               {activeSlide.tagline}
//             </motion.div>

//             {/* Heading */}
//             <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] mb-5 drop-shadow-lg">
//               <motion.span variants={itemVariants} className="block">
//                 {activeSlide.title1}
//               </motion.span>
//               <motion.span variants={itemVariants} className="block">
//                 {activeSlide.title2}{' '}
//                 <span className="italic font-light text-[#a3d9b1] whitespace-nowrap">
//                   {activeSlide.title3}
//                 </span>
//               </motion.span>
//             </h1>

//             {/* Description */}
//             <motion.p 
//               variants={itemVariants}
//               className="text-gray-200 text-sm md:text-base max-w-md leading-relaxed mb-8"
//             >
//               {activeSlide.description}
//             </motion.p>

//             {/* Buttons */}
//             <motion.div 
//               variants={itemVariants}
//               className="flex flex-wrap gap-3"
//             >
//               <motion.a href={activeSlide.button_url || '/'}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group bg-[#a3d9b1] text-[#1a3c2e] hover:bg-white px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
//               >
//                 {activeSlide.button_text || 'Shop Plants'}
//                 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </motion.a>
//               <motion.a href={window.innerWidth < 1024 ? "/#category-section-mobile" : "/#categories"}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300"
//               >
//                 Explore Categories
//               </motion.a>
//             </motion.div>

//             {/* Stats Row */}
//             <motion.div 
//               variants={itemVariants}
//               className="flex flex-wrap items-center gap-5 pt-6 mt-6 border-t border-white/20"
//             >
//               {[
//                 { value: '500+', label: 'Plant Varieties' },
//                 { value: '1000+', label: 'Happy Customers' },
//                 { value: 'Pan India', label: 'Delivery' },
//                 { value: 'Wholesale', label: '& Retail' },
//               ].map((stat, idx) => (
//                 <div 
//                   key={idx}
//                   className={idx > 0 ? 'border-l border-[#a3d9b1]/40 pl-5' : ''}
//                 >
//                   <p className="text-2xl font-bold text-white">{stat.value}</p>
//                   <p className="text-xs text-gray-300">{stat.label}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </motion.div>

//       {/* ============ CAROUSEL NAVIGATION ARROWS ============ */}
//       <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
//         <button
//           onClick={prevSlide}
//           className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#a3d9b1] hover:text-[#1a3c2e] hover:border-[#a3d9b1] transition-all duration-300 group"
//           aria-label="Previous Slide"
//         >
//           <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#a3d9b1] hover:text-[#1a3c2e] hover:border-[#a3d9b1] transition-all duration-300 group"
//           aria-label="Next Slide"
//         >
//           <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
//         </button>
//       </div>

//       {/* ============ CAROUSEL DOTS + PROGRESS ============ */}
//       <div className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             className="relative group"
//             aria-label={`Go to slide ${idx + 1}`}
//           >
//             <div className={`h-1.5 rounded-full transition-all duration-500 ${
//               currentSlide === idx 
//                 ? 'w-12 bg-[#a3d9b1]' 
//                 : 'w-6 bg-white/30 group-hover:bg-white/60'
//             }`}>
//               {/* Progress bar on active dot */}
//               {currentSlide === idx && isAutoPlay && (
//                 <motion.div
//                   initial={{ width: '0%' }}
//                   animate={{ width: '100%' }}
//                   transition={{ duration: 5.5, ease: 'linear' }}
//                   className="h-full bg-white/40 rounded-full"
//                 />
//               )}
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* ============ BOTTOM FEATURES BAR ============ */}
//       <motion.div 
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
//         className="absolute bottom-6 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8"
//       >
//         <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
//           <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
//             {features.map((item, idx) => (
//               <motion.div 
//                 key={idx} 
//                 whileHover={{ backgroundColor: 'rgba(163,217,177,0.15)' }}
//                 className="flex items-center justify-center gap-3 py-4 px-3 group cursor-pointer transition-colors duration-300"
//               >
//                 <motion.div 
//                   whileHover={{ scale: 1.2, rotate: 6 }}
//                   className="text-[#a3d9b1]"
//                 >
//                   {item.icon}
//                 </motion.div>
//                 <div>
//                   <p className="text-xs font-bold text-white">{item.title}</p>
//                   <p className="text-[10px] text-gray-300">{item.sub}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

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
  hidden: { opacity: 0, y: 20 },
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
  const reduceMotion = useReducedMotion();

  // Fetch slides from backend
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
      .catch(() => {});

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

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section className="relative w-full h-[70vh] min-h-[480px] max-h-[700px] md:h-[78vh] md:min-h-[550px] overflow-hidden bg-[#0b1512]">

      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
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
              alt=""
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          </motion.div>
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
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
          className="absolute top-24 right-20 z-[1] opacity-15 pointer-events-none hidden lg:block"
        >
          <Leaf
            className="w-32 h-32 text-[#a3d9b1]"
            strokeWidth={0.5}
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center pt-16 pb-16">

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-xl"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-[#a3d9b1] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4"
            >
              <Leaf className="w-4 h-4" />
              {activeSlide.tagline}
            </motion.div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.15] mb-4 drop-shadow-lg">
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
                <span className="italic font-light text-[#a3d9b1]">
                  {activeSlide.title3}
                </span>
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-200/90 text-xs sm:text-sm md:text-base max-w-md leading-relaxed mb-6"
            >
              {activeSlide.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <a
                href={activeSlide.button_url || '/'}
                className="group bg-[#a3d9b1] text-[#1a3c2e] hover:bg-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                {activeSlide.button_text || 'Shop Plants'}

                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="/#categories"
                className="group border border-white/40 text-white hover:bg-white/10 px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-colors duration-200 active:scale-[0.98]"
              >
                Explore Categories
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#a3d9b1] hover:text-[#1a3c2e] hover:border-[#a3d9b1] transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#a3d9b1] hover:text-[#1a3c2e] hover:border-[#a3d9b1] transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slider Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index}
              className="group p-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-10 bg-[#a3d9b1]'
                    : 'w-4 bg-white/30 group-hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      )}

    </section>
  );
};

export default Hero;
