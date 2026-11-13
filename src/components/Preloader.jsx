// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Leaf as LeafIcon, MousePointerClick } from 'lucide-react';

// // ============ REALISTIC LEAF SVG (NEW DESIGN) ============
// const LeafShape = ({ color, size }) => (
//   <svg 
//     viewBox="0 0 40 40" 
//     style={{ width: size, height: size }}
//     className="drop-shadow-lg"
//   >
//     <defs>
//       <linearGradient id={`leafGrad-${color.replace('#', '')}-${size}`} x1="20%" y1="0%" x2="80%" y2="100%">
//         <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
//         <stop offset="20%" stopColor={color} stopOpacity="1" />
//         <stop offset="100%" stopColor={color} stopOpacity="0.7" />
//       </linearGradient>
//       <linearGradient id={`leafShine-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
//         <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
//       </linearGradient>
//     </defs>
    
//     {/* Curved leaf body (realistic shape with pointed tip) */}
//     <path 
//       d="M 20 2 
//          C 28 6, 34 12, 34 20 
//          C 34 28, 28 34, 20 38 
//          C 12 34, 6 28, 6 20 
//          C 6 12, 12 6, 20 2 Z" 
//       fill={`url(#leafGrad-${color.replace('#', '')}-${size})`}
//       stroke="rgba(0,0,0,0.08)"
//       strokeWidth="0.5"
//     />
    
//     {/* Shine highlight */}
//     <path 
//       d="M 20 2 C 28 6, 34 12, 34 20 C 24 18, 16 18, 6 20 C 6 12, 12 6, 20 2 Z" 
//       fill={`url(#leafShine-${size})`}
//     />
    
//     {/* Center vein - thicker in middle, thinner at ends */}
//     <path 
//       d="M 20 4 Q 21 20, 20 36" 
//       stroke="rgba(0,0,0,0.15)" 
//       strokeWidth="0.8" 
//       fill="none"
//     />
//     <path 
//       d="M 20 4 Q 21 20, 20 36" 
//       stroke="rgba(255,255,255,0.3)" 
//       strokeWidth="0.4" 
//       fill="none"
//       transform="translate(0.3,0)"
//     />
    
//     {/* Side veins - curved like real leaves */}
//     <path d="M 20 10 Q 24 11, 26 14" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 10 Q 16 11, 14 14" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 17 Q 26 18, 29 22" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 17 Q 14 18, 11 22" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 24 Q 25 25, 27 28" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 24 Q 15 25, 13 28" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 30 Q 23 31, 24 33" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//     <path d="M 20 30 Q 17 31, 16 33" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none" />
//   </svg>
// );

// // ============ REALISTIC FLOWER SVG (NEW DESIGN) ============
// const FlowerShape = ({ color, size }) => (
//   <svg 
//     viewBox="0 0 40 40" 
//     style={{ width: size, height: size }}
//     className="drop-shadow-lg"
//   >
//     <defs>
//       <radialGradient id={`petalGrad-${color.replace('#', '')}-${size}`} cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
//         <stop offset="30%" stopColor={color} stopOpacity="1" />
//         <stop offset="100%" stopColor={color} stopOpacity="0.7" />
//       </radialGradient>
//       <radialGradient id={`centerGrad-${size}`} cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#fff3c4" />
//         <stop offset="60%" stopColor="#f0c987" />
//         <stop offset="100%" stopColor="#d4a843" />
//       </radialGradient>
//     </defs>
    
//     <g transform="translate(20, 20)">
//       {/* 6 Petals - layered depth */}
//       {[0, 60, 120, 180, 240, 300].map((angle, i) => (
//         <g key={angle} transform={`rotate(${angle})`}>
//           {/* Petal shadow */}
//           <ellipse
//             cx="0"
//             cy="-10.5"
//             rx="5"
//             ry="10.5"
//             fill={color}
//             opacity="0.25"
//           />
//           {/* Petal main */}
//           <ellipse
//             cx="0"
//             cy="-10"
//             rx="4.5"
//             ry="10"
//             fill={`url(#petalGrad-${color.replace('#', '')}-${size})`}
//             stroke="rgba(255,255,255,0.5)"
//             strokeWidth="0.3"
//           />
//           {/* Petal highlight line */}
//           <path 
//             d="M 0 -18 Q 0.5 -14, 0 -5" 
//             stroke="rgba(255,255,255,0.6)" 
//             strokeWidth="0.3" 
//             fill="none"
//           />
//         </g>
//       ))}
      
//       {/* Inner petals (smaller, rotated 30deg for layered effect) */}
//       {[30, 90, 150, 210, 270, 330].map((angle) => (
//         <ellipse
//           key={angle}
//           cx="0"
//           cy="-6"
//           rx="3"
//           ry="6"
//           fill={color}
//           opacity="0.5"
//           transform={`rotate(${angle})`}
//         />
//       ))}
      
//       {/* Center - golden with details */}
//       <circle cx="0" cy="0" r="4" fill={`url(#centerGrad-${size})`} />
//       <circle cx="0" cy="0" r="2.5" fill="#d4a843" opacity="0.6" />
      
//       {/* Center dots (pollen) */}
//       <circle cx="-1" cy="-0.8" r="0.5" fill="#fff8dc" opacity="0.9" />
//       <circle cx="1" cy="-0.8" r="0.4" fill="#fff8dc" opacity="0.9" />
//       <circle cx="0" cy="1" r="0.5" fill="#fff8dc" opacity="0.9" />
//       <circle cx="-0.7" cy="0.7" r="0.4" fill="#fff8dc" opacity="0.9" />
//       <circle cx="0.7" cy="0.7" r="0.4" fill="#fff8dc" opacity="0.9" />
      
//       {/* Tiny highlight */}
//       <circle cx="-1" cy="-1.5" r="1" fill="#ffffff" opacity="0.4" />
//     </g>
//   </svg>
// );

// // ============ COLOR PALETTES ============
// const LEAF_COLORS = [
//   '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', 
//   '#b7e4c7', '#a3d9b1', '#d8f3dc', '#8fbc8f', '#9acd32', 
//   '#adc178', '#c9d9b8', '#e8dcc4', '#f0c987', '#e6b980', '#d4a373',
// ];

// const FLOWER_COLORS = [
//   '#f4a4b8', '#f7c8d6', '#ffb6c1', '#e8b4d4', '#f5d76e', 
//   '#ff9ec4', '#dda0dd', '#ee82ee', '#ff69b4', '#ffc0cb', 
//   '#fff0f5', '#ffdab9', '#ffdead', '#f0e68c', '#e6e6fa', '#d8bfd8',
// ];

// // ============ GENERATE LEAVES & FLOWERS ============
// const generateLeaves = (count = 70) => {
//   return Array.from({ length: count }).map((_, i) => ({
//     id: `leaf-${i}`,
//     type: 'leaf',
//     left: Math.random() * 100,
//     delay: Math.random() * 1.2,           // more delay variation
//     duration: 2.0 + Math.random() * 2.0,  // slower fall (2s - 4s)
//     size: 18 + Math.random() * 22,
//     rotate: Math.random() * 360,
//     swayAmount: 40 + Math.random() * 100,
//     color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
//   }));
// };

// const generateFlowers = (count = 50) => {
//   return Array.from({ length: count }).map((_, i) => ({
//     id: `flower-${i}`,
//     type: 'flower',
//     left: Math.random() * 100,
//     delay: 0.3 + Math.random() * 1.4,
//     duration: 2.2 + Math.random() * 2.0,  // slower fall
//     size: 14 + Math.random() * 16,
//     rotate: Math.random() * 360,
//     swayAmount: 30 + Math.random() * 80,
//     color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
//   }));
// };

// const Preloader = ({ onComplete }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [isOpening, setIsOpening] = useState(false);
//   const [leaves] = useState(generateLeaves(70));
//   const [flowers] = useState(generateFlowers(50));

//   const handleEnter = () => {
//     if (isOpening) return;
//     setIsOpening(true);

//     // Wait for doors (1.8s) + leaves fall
//     setTimeout(() => {
//       setIsVisible(false);
//       setTimeout(onComplete, 200);
//     }, 3600);
//   };

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'Enter') handleEnter();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, []);

//   const allElements = [...leaves, ...flowers].sort(() => Math.random() - 0.5);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <div className="fixed inset-0 z-[9999] overflow-hidden">

//           {/* ==================== DOORS ==================== */}
//           <div className="absolute inset-0 z-20 flex">
            
//             {/* LEFT DOOR - SLOWER */}
//             <motion.div
//               initial={{ x: 0 }}
//               animate={isOpening ? { x: '-100%' } : { x: 0 }}
//               transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
//               className="w-1/2 h-full bg-gradient-to-br from-[#1a3c2e] via-[#1f4634] to-[#1a3c2e] relative"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
//             </motion.div>

//             {/* RIGHT DOOR - SLOWER */}
//             <motion.div
//               initial={{ x: 0 }}
//               animate={isOpening ? { x: '100%' } : { x: 0 }}
//               transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
//               className="w-1/2 h-full bg-gradient-to-bl from-[#1a3c2e] via-[#1f4634] to-[#1a3c2e] relative -ml-px"
//             >
//               <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent"></div>
//             </motion.div>

//           </div>

//           {/* ==================== FALLING LEAVES + FLOWERS ==================== */}
//           {isOpening && (
//             <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
//               {allElements.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ 
//                     y: '-15vh',
//                     x: 0,
//                     opacity: 0,
//                     rotate: item.rotate,
//                   }}
//                   animate={{ 
//                     y: '115vh',
//                     x: [0, item.swayAmount, -item.swayAmount, item.swayAmount * 0.5, 0],
//                     opacity: [0, 1, 1, 1, 0],
//                     rotate: item.rotate + 720,
//                   }}
//                   transition={{ 
//                     duration: item.duration,
//                     delay: item.delay,
//                     ease: 'easeIn',
//                     x: {
//                       duration: item.duration,
//                       repeat: 0,
//                       ease: 'easeInOut',
//                     }
//                   }}
//                   style={{
//                     position: 'absolute',
//                     left: `${item.left}%`,
//                     top: 0,
//                     willChange: 'transform',
//                   }}
//                 >
//                   {item.type === 'leaf' ? (
//                     <LeafShape color={item.color} size={item.size} />
//                   ) : (
//                     <FlowerShape color={item.color} size={item.size} />
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           )}

//           {/* ==================== CENTER CONTENT ==================== */}
//           <motion.div
//             animate={isOpening ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 pointer-events-none"
//           >
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
//               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//               transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
//               className="mb-4"
//             >
//               <div className="relative">
//                 <LeafIcon className="text-[#a3d9b1] w-16 h-16" strokeWidth={1.5} />
//                 <motion.div 
//                   animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
//                   transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
//                   className="absolute inset-0 bg-[#a3d9b1]/40 rounded-full blur-2xl"
//                 />
//               </div>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
//               className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide"
//             >
//               Cityscape
//             </motion.h1>
            
//             <motion.h2
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
//               className="text-sm md:text-lg font-light text-[#a3d9b1] tracking-[0.4em] mt-1"
//             >
//               GREENERY
//             </motion.h2>

//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: '120px' }}
//               transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
//               className="h-px bg-gradient-to-r from-transparent via-[#a3d9b1] to-transparent mt-6 mb-8"
//             />

//             <motion.button
//               onClick={handleEnter}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
//               whileHover={{ scale: 1.08 }}
//               whileTap={{ scale: 0.95 }}
//               className="pointer-events-auto group relative cursor-pointer"
//               aria-label="Enter Site"
//             >
//               <motion.div
//                 animate={{ 
//                   scale: [1, 1.3, 1], 
//                   opacity: [0.4, 0.7, 0.4] 
//                 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//                 className="absolute inset-0 bg-[#a3d9b1]/30 rounded-full blur-2xl -z-10"
//               />

//               <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
//                 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
//                   <motion.g
//                     animate={{ rotate: [-3, 3, -3] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                     style={{ transformOrigin: '50px 45px' }}
//                   >
//                     <ellipse cx="50" cy="30" rx="6" ry="16" fill="#4a9b6a" />
//                     <ellipse cx="40" cy="33" rx="5" ry="13" fill="#5fb87d" transform="rotate(-25 40 33)" />
//                     <ellipse cx="60" cy="33" rx="5" ry="13" fill="#5fb87d" transform="rotate(25 60 33)" />
//                     <ellipse cx="34" cy="40" rx="4" ry="11" fill="#7fcb9a" transform="rotate(-50 34 40)" />
//                     <ellipse cx="66" cy="40" rx="4" ry="11" fill="#7fcb9a" transform="rotate(50 66 40)" />
//                   </motion.g>
//                   <path 
//                     d="M 32 50 L 68 50 L 64 88 Q 64 92 60 92 L 40 92 Q 36 92 36 88 Z" 
//                     fill="#e8dcc4" 
//                     stroke="#d4c3a3"
//                     strokeWidth="1.5"
//                   />
//                   <rect x="29" y="46" width="42" height="8" rx="2" fill="#d4c3a3" />
//                   <path 
//                     d="M 32 50 L 40 50 L 40 92 L 40 92 Q 36 92 36 88 Z" 
//                     fill="#000"
//                     opacity="0.08"
//                   />
//                 </svg>

//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.5, 1], 
//                     opacity: [0.6, 0, 0.6] 
//                   }}
//                   transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
//                   className="absolute inset-0 border-2 border-[#a3d9b1] rounded-full"
//                 />
//               </div>
//             </motion.button>

//           </motion.div>

//           {/* AMBIENT LIGHTS */}
//           <motion.div
//             animate={{ 
//               opacity: [0.2, 0.5, 0.2],
//               scale: [1, 1.2, 1]
//             }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2d6a4f]/30 rounded-full blur-[100px] z-10"
//           />
//           <motion.div
//             animate={{ 
//               opacity: [0.3, 0.6, 0.3],
//               scale: [1.2, 1, 1.2]
//             }}
//             transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#a3d9b1]/20 rounded-full blur-[120px] z-10"
//           />

//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Preloader;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf as LeafIcon } from 'lucide-react';

// ============ LIGHTWEIGHT LEAF SVG ============
const LeafShape = React.memo(({ color, size }) => (
  <svg
    viewBox="0 0 40 40"
    style={{ width: size, height: size }}
  >
    <defs>
      <linearGradient id={`lg-${color.replace('#', '')}`} x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <path
      d="M 20 2 C 28 6, 34 12, 34 20 C 34 28, 28 34, 20 38 C 12 34, 6 28, 6 20 C 6 12, 12 6, 20 2 Z"
      fill={`url(#lg-${color.replace('#', '')})`}
    />
    <path d="M 20 4 Q 21 20, 20 36" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" fill="none" />
  </svg>
));

// ============ LIGHTWEIGHT FLOWER SVG ============
const FlowerShape = React.memo(({ color, size }) => (
  <svg
    viewBox="0 0 40 40"
    style={{ width: size, height: size }}
  >
    <defs>
      <radialGradient id={`fg-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="40%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.7" />
      </radialGradient>
    </defs>
    <g transform="translate(20, 20)">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-9"
          rx="4"
          ry="9"
          fill={`url(#fg-${color.replace('#', '')})`}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="3" fill="#f0c987" />
      <circle cx="0" cy="0" r="1.5" fill="#d4a843" />
    </g>
  </svg>
));

// ============ COLORS ============
const LEAF_COLORS = ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#a3d9b1', '#8fbc8f', '#adc178', '#e8dcc4', '#f0c987'];
const FLOWER_COLORS = ['#f4a4b8', '#ffb6c1', '#e8b4d4', '#f5d76e', '#ff9ec4', '#dda0dd', '#ff69b4', '#ffc0cb', '#ffdab9'];

// ============ GENERATE (REDUCED COUNT) ============
const generateElements = () => {
  const leaves = Array.from({ length: 35 }).map((_, i) => ({
    id: `l-${i}`,
    type: 'leaf',
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.4 + Math.random() * 1.2,
    size: 18 + Math.random() * 18,
    rotate: Math.random() * 360,
    swayAmount: 30 + Math.random() * 60,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
  }));

  const flowers = Array.from({ length: 25 }).map((_, i) => ({
    id: `f-${i}`,
    type: 'flower',
    left: Math.random() * 100,
    delay: Math.random() * 1.0,
    duration: 1.6 + Math.random() * 1.2,
    size: 14 + Math.random() * 14,
    rotate: Math.random() * 360,
    swayAmount: 25 + Math.random() * 50,
    color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
  }));

  return [...leaves, ...flowers].sort(() => Math.random() - 0.5);
};

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [elements] = useState(generateElements);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    // ✅ FASTER: doors 1.2s + quick fade
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 100);
    }, 2400);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') handleEnter();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">

          {/* ============ DOORS (FASTER) ============ */}
          <div className="absolute inset-0 z-20 flex">
            <motion.div
              initial={{ x: 0 }}
              animate={isOpening ? { x: '-100%' } : { x: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-1/2 h-full bg-gradient-to-br from-[#1a3c2e] via-[#1f4634] to-[#1a3c2e] relative"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={isOpening ? { x: '100%' } : { x: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-1/2 h-full bg-gradient-to-bl from-[#1a3c2e] via-[#1f4634] to-[#1a3c2e] relative -ml-px"
            />
          </div>

          {/* ============ FALLING ELEMENTS (OPTIMIZED) ============ */}
          {isOpening && (
            <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
              {elements.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{
                    y: '-15vh',
                    x: 0,
                    opacity: 0,
                    rotate: item.rotate,
                  }}
                  animate={{
                    y: '115vh',
                    x: [0, item.swayAmount, -item.swayAmount, 0],
                    opacity: [0, 1, 1, 0],
                    rotate: item.rotate + 360,
                  }}
                  transition={{
                    duration: item.duration,
                    delay: item.delay,
                    ease: 'easeIn',
                    x: {
                      duration: item.duration,
                      ease: 'easeInOut',
                    },
                  }}
                  style={{
                    position: 'absolute',
                    left: `${item.left}%`,
                    top: 0,
                    // ✅ GPU ACCELERATION
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {item.type === 'leaf' ? (
                    <LeafShape color={item.color} size={item.size} />
                  ) : (
                    <FlowerShape color={item.color} size={item.size} />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* ============ CENTER CONTENT ============ */}
          <motion.div
            animate={isOpening ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 pointer-events-none"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }}
              className="mb-4"
            >
              <div className="relative">
                <LeafIcon className="text-[#a3d9b1] w-16 h-16" strokeWidth={1.5} />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-[#a3d9b1]/30 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide"
            >
              Cityscape
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-sm md:text-lg font-light text-[#a3d9b1] tracking-[0.4em] mt-1"
            >
              GREENERY
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
              className="h-px bg-gradient-to-r from-transparent via-[#a3d9b1] to-transparent mt-6 mb-8"
            />

            {/* POT BUTTON */}
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto group relative cursor-pointer"
              aria-label="Enter Site"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[#a3d9b1]/30 rounded-full blur-xl -z-10"
              />

              <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.g
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '50px 45px' }}
                  >
                    <ellipse cx="50" cy="30" rx="6" ry="16" fill="#4a9b6a" />
                    <ellipse cx="40" cy="33" rx="5" ry="13" fill="#5fb87d" transform="rotate(-25 40 33)" />
                    <ellipse cx="60" cy="33" rx="5" ry="13" fill="#5fb87d" transform="rotate(25 60 33)" />
                    <ellipse cx="34" cy="40" rx="4" ry="11" fill="#7fcb9a" transform="rotate(-50 34 40)" />
                    <ellipse cx="66" cy="40" rx="4" ry="11" fill="#7fcb9a" transform="rotate(50 66 40)" />
                  </motion.g>
                  <path
                    d="M 32 50 L 68 50 L 64 88 Q 64 92 60 92 L 40 92 Q 36 92 36 88 Z"
                    fill="#e8dcc4"
                    stroke="#d4c3a3"
                    strokeWidth="1.5"
                  />
                  <rect x="29" y="46" width="42" height="8" rx="2" fill="#d4c3a3" />
                </svg>

                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 border-2 border-[#a3d9b1] rounded-full"
                />
              </div>
            </motion.button>
          </motion.div>

          {/* ============ AMBIENT LIGHTS (REDUCED) ============ */}
          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2d6a4f]/30 rounded-full blur-[80px] z-10 pointer-events-none"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#a3d9b1]/20 rounded-full blur-[100px] z-10 pointer-events-none"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;