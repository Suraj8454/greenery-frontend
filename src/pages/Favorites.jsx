import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Leaf } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfbf7] flex flex-col items-center justify-center px-4 py-20">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-red-300" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#1a3c2e] mb-3">No favorites yet</h2>
        <p className="text-gray-500 text-sm mb-8">Save your favourite products for later</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-8 py-3 rounded-full font-semibold text-sm group">
          Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
            <Leaf className="w-3.5 h-3.5" /> Saved Items
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3c2e] mb-2">My Favorites</h1>
          <p className="text-gray-500 text-sm mb-8">{favorites.length} item{favorites.length > 1 ? 's' : ''} saved</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {favorites.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

export default Favorites;