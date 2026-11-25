// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Heart, ArrowRight, Leaf } from 'lucide-react';
// import { useFavorites } from '../context/FavoritesContext';
// import ProductCard from '../components/ProductCard';

// const Favorites = () => {
//   const { favorites } = useFavorites();

//   if (favorites.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#fcfbf7] flex flex-col items-center justify-center px-4 py-20">
//         <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
//           <Heart className="w-12 h-12 text-red-300" />
//         </div>
//         <h2 className="text-3xl font-serif font-bold text-[#1a3c2e] mb-3">No favorites yet</h2>
//         <p className="text-gray-500 text-sm mb-8">Save your favourite products for later</p>
//         <Link to="/" className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-8 py-3 rounded-full font-semibold text-sm group">
//           Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
//             <Leaf className="w-3.5 h-3.5" /> Saved Items
//           </div>
//           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">My Favorites</h1>
//           <p className="text-gray-500 text-sm mb-8">{favorites.length} item{favorites.length > 1 ? 's' : ''} saved</p>
//         </motion.div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//           {favorites.map(p => <ProductCard key={p.id} product={p} />)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Favorites;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  ArrowRight,
  Leaf,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  const itemCount = favorites.length;

  // Empty Favorites
  if (itemCount === 0) {
    return (
      <div className="min-h-[75vh] bg-[#fcfbf7] flex items-center justify-center px-4 py-16 overflow-hidden relative">

        {/* Background decoration */}
        <div className="absolute top-10 right-0 w-64 h-64 bg-[#a3d9b1]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2d6a4f]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md text-center"
        >
          {/* Icon */}
          <div className="relative mx-auto mb-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#edf4eb] flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-[#d7e7d5]" />

            <Heart
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#2d6a4f]"
              strokeWidth={1.4}
            />

            <span className="absolute top-2 right-3 text-[#7da889]">
              <Sparkles size={17} />
            </span>

            <span className="absolute bottom-3 left-2 text-[#7da889]">
              <Leaf size={16} />
            </span>
          </div>

          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d6a4f] mb-3">
            <Leaf size={13} />
            Your Collection
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a3c2e] mb-3">
            No favorites yet
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm leading-6 max-w-xs mx-auto mb-7">
            Your favorite plants deserve a place here. Explore our collection
            and save the ones you love.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <ShoppingBag size={16} />
            Explore Products
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    );
  }

  // Favorites Products
  return (
    <div className="min-h-screen bg-[#fcfbf7] py-8 sm:py-10 lg:py-12 px-3 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 sm:mb-9"
        >
          {/* Breadcrumb style label */}
          <div className="flex items-center gap-2 text-[#2d6a4f] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5">
            <Leaf size={13} />
            Saved Items
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1a3c2e]">
                My Favorites
              </h1>

              <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
                Your personally selected collection of plants.
              </p>
            </div>

            {/* Item Counter */}
            <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-white border border-[#e5ebdf] rounded-full px-4 py-2 shadow-sm">
              <Heart
                size={14}
                className="text-[#2d6a4f]"
                fill="#2d6a4f"
              />

              <span className="text-xs font-semibold text-[#1a3c2e]">
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-5 h-px w-full bg-[#e8ede5]" />
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5"
        >
          {favorites.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: Math.min(index * 0.04, 0.3),
              }}
              className="min-w-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Continue Shopping */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2d6a4f] hover:text-[#1a3c2e] transition-colors group"
          >
            <ShoppingBag size={15} />
            Continue Shopping
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Favorites;
