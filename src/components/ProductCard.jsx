import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const [added, setAdded] = useState(false);

  // Card click → product page
  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  // Add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock_quantity <= 0) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Toggle favorite
  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#2d6a4f]/20 hover:shadow-2xl hover:shadow-[#2d6a4f]/15 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      
      {/* ============ IMAGE ============ */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#f4f1ea] to-[#eef2ed]">
        <img
          src={(product.images && product.images[0]) || product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {product.stock_quantity <= 0 && <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/85 px-3 py-1 text-[10px] font-bold text-white">Out of stock</span>}

        {/* Tag Badge */}
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-md ${
            product.tag === 'Bestseller' ? 'bg-red-500 text-white' :
            product.tag === 'New' ? 'bg-[#2d6a4f] text-white' :
            'bg-orange-500 text-white'
          }`}>
            {product.tag}
          </span>
        )}

        {/* ❤️ Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 z-10 ${
            favorited
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* ============ DETAILS ============ */}
      <div className="p-3 md:p-4 flex flex-col flex-1 space-y-2">
        
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            ({product.reviews || 45})
          </span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-[#2d6a4f] transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1a3c2e] text-base">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-[11px] text-gray-400 line-through">₹{product.oldPrice}</span>
          )}
        </div>

        {product.colors?.length > 0 && <div className="flex items-center gap-1.5 pt-1" aria-label="Available colours">{product.colors.slice(0, 5).map((color) => <span key={`${color.name}-${color.hex}`} title={color.name} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />)}<span className="ml-1 text-[10px] text-gray-500">{product.colors.length} colours</span></div>}

        {/* 🛒 Add to Cart Button (FULL WIDTH, ALWAYS VISIBLE) */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={product.stock_quantity <= 0}
          className={`w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm ${
            product.stock_quantity <= 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : added
              ? 'bg-green-600 text-white shadow-green-600/30'
              : 'bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white shadow-[#1a3c2e]/20'
          }`}
          aria-label="Add to cart"
        >
          {product.stock_quantity <= 0 ? 'Out of Stock' : added ? (
            <>
              <Check className="w-4 h-4" /> Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;