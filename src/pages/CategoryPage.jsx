


// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Leaf,
//   SlidersHorizontal,
//   X,
//   ChevronRight,
//   ArrowUpDown,
//   RotateCcw,
//   PackageOpen
// } from 'lucide-react';

// import ProductCard from '../components/ProductCard';
// import { useProducts } from '../context/ProductsContext';
// import { api, mediaUrl } from '../utils/api';

// const CategoryPage = () => {
//   const { category, subcategory } = useParams();
//   const decodedCategory = decodeURIComponent(category || '');
//   const decodedSubcategory = decodeURIComponent(subcategory || '');

//   const { products, loading } = useProducts();

//   const [categoryRecords, setCategoryRecords] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [categoryError, setCategoryError] = useState(false);

//   const [priceRange, setPriceRange] = useState([0, Infinity]);
//   const [sortBy, setSortBy] = useState('featured');
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch categories directly from the backend.
//   useEffect(() => {
//     let isMounted = true;

//     const fetchCategories = async () => {
//       setCategoriesLoading(true);
//       setCategoryError(false);

//       try {
//         const response = await api('/categories');

//         if (isMounted) {
//           setCategoryRecords(
//             Array.isArray(response)
//               ? response.filter(
//                   (item) =>
//                     item &&
//                     item.name &&
//                     Number(item.is_active ?? 1) !== 0
//                 )
//               : []
//           );
//         }
//       } catch (error) {
//         console.error('Categories API:', error.message);

//         if (isMounted) {
//           setCategoryRecords([]);
//           setCategoryError(true);
//         }
//       } finally {
//         if (isMounted) setCategoriesLoading(false);
//       }
//     };

//     fetchCategories();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Find the current category by its name or slug.
//   const categoryRecord = useMemo(() => {
//     const current = decodedCategory.toLowerCase();

//     return categoryRecords.find((item) => {
//       const name = String(item.name || '').toLowerCase();
//       const slug = String(item.slug || '').toLowerCase();

//       return name === current || slug === current;
//     });
//   }, [categoryRecords, decodedCategory]);

//   const categoryName = categoryRecord?.name || decodedCategory;
//   const subcategoryRecords = Array.isArray(categoryRecord?.subcategories) ? categoryRecord.subcategories : [];
//   const subcategoryRecord = useMemo(() => {
//     if (!decodedSubcategory) return null;
//     const current = decodedSubcategory.toLowerCase();
//     return subcategoryRecords.find((item) =>
//       String(item.slug || '').toLowerCase() === current ||
//       String(item.name || '').toLowerCase() === current ||
//       String(item.id || '') === current
//     ) || null;
//   }, [subcategoryRecords, decodedSubcategory]);
//   const subcategoryName = subcategoryRecord?.name || decodedSubcategory;

//   // Filter by parent category first, then by its selected subcategory.
//   const categoryProducts = useMemo(() => {
//     const current = decodedCategory.toLowerCase();
//     const currentName = String(categoryName).toLowerCase();
//     const currentId = String(categoryRecord?.id ?? '');

//     return products.filter((product) => {
//       const productCategory = product.category;
//       let matchesCategory = false;

//       if (productCategory && typeof productCategory === 'object') {
//         const productCategoryName = String(productCategory.name || productCategory.slug || '').toLowerCase();
//         const productCategoryId = String(productCategory.id ?? '');
//         matchesCategory = productCategoryName === current || productCategoryName === currentName || (currentId && productCategoryId === currentId);
//       } else {
//         const value = String(productCategory || '').toLowerCase();
//         matchesCategory = value === current || value === currentName || (currentId && value === currentId) || (currentId && String(product.category_id || '') === currentId);
//       }

//       if (!matchesCategory) return false;
//       if (!decodedSubcategory) return true;

//       const selectedSubId = String(subcategoryRecord?.id ?? '');
//       const productSubId = String(product.subcategory_id ?? product.subcategoryId ?? '');
//       const productSub = product.subcategory;
//       const productSubName = productSub && typeof productSub === 'object'
//         ? String(productSub.name || productSub.slug || '').toLowerCase()
//         : String(productSub || product.subcategory_name || product.subcategory_slug || '').toLowerCase();
//       const selectedSub = decodedSubcategory.toLowerCase();
//       return (selectedSubId && productSubId === selectedSubId) ||
//         productSubName === selectedSub ||
//         productSubName === String(subcategoryName).toLowerCase() ||
//         productSubId === selectedSub;
//     });
//   }, [products, decodedCategory, categoryName, categoryRecord, decodedSubcategory, subcategoryRecord, subcategoryName]);

//   // Calculate the price limit from actual backend products.
//   const maxPrice = useMemo(() => {
//     return Math.max(
//       0,
//       ...categoryProducts.map((product) => Number(product.price) || 0)
//     );
//   }, [categoryProducts]);

//   const effectiveMaxPrice = Number.isFinite(priceRange[1])
//     ? priceRange[1]
//     : maxPrice;

//   // Update the price range when the category changes.
//   useEffect(() => {
//     setPriceRange([0, Infinity]);
//     setSortBy('featured');
//   }, [decodedCategory, decodedSubcategory]);

//   // Filter and sort actual products.
//   const filteredProducts = useMemo(() => {
//     const result = categoryProducts.filter((product) => {
//       const price = Number(product.price) || 0;

//       return price >= priceRange[0] && price <= effectiveMaxPrice;
//     });

//     switch (sortBy) {
//       case 'price-low':
//         result.sort((a, b) => Number(a.price) - Number(b.price));
//         break;

//       case 'price-high':
//         result.sort((a, b) => Number(b.price) - Number(a.price));
//         break;

//       case 'rating':
//         result.sort(
//           (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
//         );
//         break;

//       case 'newest':
//         result.sort(
//           (a, b) =>
//             new Date(b.created_at || 0).getTime() -
//             new Date(a.created_at || 0).getTime()
//         );
//         break;

//       default:
//         break;
//     }

//     return result;
//   }, [categoryProducts, priceRange, effectiveMaxPrice, sortBy]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [decodedCategory]);

//   const clearFilters = () => {
//     setPriceRange([0, Infinity]);
//     setSortBy('featured');
//   };

//   const activeFilterCount =
//     (priceRange[0] > 0 || effectiveMaxPrice < maxPrice ? 1 : 0) +
//     (sortBy !== 'featured' ? 1 : 0);

//   const getCategoryPath = (item) =>
//     `/category/${encodeURIComponent(item.slug || item.name)}`;

//   const categoryImage = categoryRecord?.image
//     ? mediaUrl(categoryRecord.image)
//     : '';

//   const FilterContent = ({ mobile = false }) => (
//     <div className={mobile ? 'space-y-6' : ''}>
//       {/* Dynamic categories */}
//       <div className="mb-6 border-b border-[#e8eee8] pb-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#1a3c2e]">
//             Categories
//           </h3>

//           {mobile && (
//             <span className="text-xs text-gray-400">
//               {categoryRecords.length} available
//             </span>
//           )}
//         </div>

//         {categoriesLoading ? (
//           <div className="space-y-3">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="h-9 animate-pulse rounded-xl bg-[#f0f4ef]"
//               />
//             ))}
//           </div>
//         ) : categoryError ? (
//           <p className="text-sm leading-6 text-red-600">
//             Categories could not be loaded. Please try again later.
//           </p>
//         ) : categoryRecords.length === 0 ? (
//           <p className="text-sm leading-6 text-gray-500">
//             No categories available.
//           </p>
//         ) : (
//           <div className={mobile ? 'grid grid-cols-2 gap-2' : 'space-y-1'}>
//             {categoryRecords.map((item) => {
//               const isActive =
//                 String(item.name).toLowerCase() ===
//                   String(categoryName).toLowerCase() ||
//                 String(item.slug || '').toLowerCase() ===
//                   decodedCategory.toLowerCase();

//               return (
//                 <Link
//                   key={item.id ?? item.slug ?? item.name}
//                   to={getCategoryPath(item)}
//                   onClick={() => setShowFilters(false)}
//                   className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
//                     isActive
//                       ? 'bg-[#1a3c2e] font-semibold text-white shadow-sm'
//                       : 'text-[#526457] hover:bg-[#f0f5ef] hover:text-[#1a3c2e]'
//                   }`}
//                 >
//                   <span className="min-w-0 truncate">{item.name}</span>

//                   <ChevronRight
//                     className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
//                       isActive ? 'text-[#a3d9b1]' : 'text-gray-300'
//                     }`}
//                   />
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Price filter */}
//       <div className="mb-6 border-b border-[#e8eee8] pb-6">
//         <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1a3c2e]">
//           Price range
//         </h3>

//         <div className="mb-4 flex items-center gap-2">
//           <label className="min-w-0 flex-1">
//             <span className="mb-1 block text-[10px] text-gray-400">
//               Minimum
//             </span>
//             <input
//               type="number"
//               min="0"
//               max={maxPrice}
//               value={priceRange[0]}
//               onChange={(event) => {
//                 const value = Math.max(
//                   0,
//                   Number(event.target.value) || 0
//                 );

//                 setPriceRange([
//                   Math.min(value, effectiveMaxPrice),
//                   effectiveMaxPrice
//                 ]);
//               }}
//               className="w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcf9] px-3 py-2.5 text-sm text-[#1a3c2e] outline-none transition focus:border-[#2d6a4f]"
//             />
//           </label>

//           <span className="mt-5 text-gray-300">—</span>

//           <label className="min-w-0 flex-1">
//             <span className="mb-1 block text-[10px] text-gray-400">
//               Maximum
//             </span>
//             <input
//               type="number"
//               min={priceRange[0]}
//               max={maxPrice}
//               value={effectiveMaxPrice}
//               onChange={(event) => {
//                 const value = Math.max(
//                   priceRange[0],
//                   Math.min(Number(event.target.value) || 0, maxPrice)
//                 );

//                 setPriceRange([priceRange[0], value]);
//               }}
//               className="w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcf9] px-3 py-2.5 text-sm text-[#1a3c2e] outline-none transition focus:border-[#2d6a4f]"
//             />
//           </label>
//         </div>

//         <input
//           aria-label="Maximum product price"
//           type="range"
//           min="0"
//           max={Math.max(maxPrice, 1)}
//           value={Math.min(effectiveMaxPrice, Math.max(maxPrice, 1))}
//           onChange={(event) =>
//             setPriceRange([priceRange[0], Number(event.target.value)])
//           }
//           className="w-full cursor-pointer accent-[#2d6a4f]"
//         />

//         <div className="mt-2 flex justify-between text-[11px] text-gray-400">
//           <span>₹0</span>
//           <span>₹{maxPrice.toLocaleString('en-IN')}</span>
//         </div>
//       </div>

//       {/* Clear filters */}
//       <button
//         type="button"
//         onClick={clearFilters}
//         className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce6db] px-4 py-3 text-sm font-semibold text-[#2d6a4f] transition hover:border-[#2d6a4f] hover:bg-[#f0f5ef]"
//       >
//         <RotateCcw className="h-4 w-4" />
//         Reset filters
//       </button>
//     </div>
//   );

//   if (loading || categoriesLoading) {
//     return (
//       <div className="grid min-h-[55vh] place-items-center bg-[#fcfbf7]">
//         <div className="text-center">
//           <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#dce8dc] border-t-[#2d6a4f]" />
//           <p className="text-sm font-medium text-[#526457]">
//             Preparing your collection...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fcfbf7] text-[#1a3c2e]">
//       {/* Modern category hero */}
//       <section className="relative isolate overflow-hidden bg-[#1a3c2e]">
//         {categoryImage && (
//           <img
//             src={categoryImage}
//             alt={categoryName}
//             className="absolute inset-0 h-full w-full object-cover opacity-20"
//           />
//         )}

//         <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/10" />
//         <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/10" />
//         <div className="absolute -bottom-24 left-[35%] h-64 w-64 rounded-full bg-[#2d6a4f]/30 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">
//           <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-white/60">
//             <Link to="/" className="transition hover:text-white">
//               Home
//             </Link>
//             <ChevronRight className="h-3 w-3" />
//             <Link to="/categories" className="transition hover:text-white">
//               Categories
//             </Link>
//             <ChevronRight className="h-3 w-3" />
//             <span className="font-medium text-[#a3d9b1]">
//               {subcategoryName || categoryName}
//             </span>
//           </nav>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55 }}
//             className="max-w-2xl"
//           >
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a3d9b1]">
//               <Leaf className="h-3.5 w-3.5" />
//               Explore collection
//             </div>

//             <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
//               {subcategoryName || categoryName}
//             </h1>

//             <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
//               {categoryRecord?.description ||
//                 'Explore the products available in this collection.'}
//             </p>

//             <div className="mt-7 flex flex-wrap items-center gap-3">
//               <span className="rounded-full bg-[#a3d9b1] px-4 py-2 text-xs font-bold text-[#1a3c2e]">
//                 {categoryProducts.length}{' '}
//                 {categoryProducts.length === 1 ? 'product' : 'products'}
//               </span>

//               <span className="text-xs text-white/55">
//                 Thoughtfully selected for your space
//               </span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main collection */}
//       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
//         <div className="flex items-center gap-2 text-xs text-gray-400">
//           <span>Collection</span>
//           <ChevronRight className="h-3 w-3" />
//           <span className="font-semibold text-[#2d6a4f]">
//             {subcategoryName || categoryName}
//           </span>
//         </div>

//         <div className="mt-7 flex items-start gap-8">
//           {/* Desktop filters */}
//           <aside className="hidden w-64 shrink-0 lg:block">
//             <div className="sticky top-24 rounded-2xl border border-[#e8eee8] bg-white p-5 shadow-[0_8px_30px_rgba(26,60,46,0.04)]">
//               <div className="mb-6 flex items-center gap-2 border-b border-[#e8eee8] pb-5">
//                 <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef5ed]">
//                   <SlidersHorizontal className="h-4 w-4 text-[#2d6a4f]" />
//                 </div>

//                 <div>
//                   <h2 className="text-sm font-extrabold">Refine selection</h2>
//                   <p className="mt-0.5 text-[11px] text-gray-400">
//                     Find your perfect match
//                   </p>
//                 </div>
//               </div>

//               <FilterContent />
//             </div>
//           </aside>

//           {/* Product section */}
//           <section className="min-w-0 flex-1">
//             <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8eee8] bg-white p-3 sm:p-4">
//               <div>
//                 <p className="text-sm font-bold text-[#1a3c2e]">
//                   All products
//                 </p>
//                 <p className="mt-1 text-xs text-gray-400">
//                   {filteredProducts.length} results
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(true)}
//                   className="inline-flex items-center gap-2 rounded-xl border border-[#e2e9e1] px-3 py-2.5 text-xs font-semibold text-[#1a3c2e] transition hover:bg-[#f0f5ef] lg:hidden"
//                 >
//                   <SlidersHorizontal className="h-4 w-4" />
//                   Filters
//                   {activeFilterCount > 0 && (
//                     <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#2d6a4f] px-1 text-[10px] text-white">
//                       {activeFilterCount}
//                     </span>
//                   )}
//                 </button>

//                 <div className="flex items-center gap-2 rounded-xl border border-[#e2e9e1] bg-[#fcfcf9] px-3">
//                   <ArrowUpDown className="h-3.5 w-3.5 text-[#2d6a4f]" />

//                   <select
//                     aria-label="Sort products"
//                     value={sortBy}
//                     onChange={(event) => setSortBy(event.target.value)}
//                     className="max-w-[145px] cursor-pointer bg-transparent py-2.5 text-xs font-semibold text-[#1a3c2e] outline-none sm:max-w-none"
//                   >
//                     <option value="featured">Featured</option>
//                     <option value="price-low">Price: Low to High</option>
//                     <option value="price-high">Price: High to Low</option>
//                     <option value="rating">Rating</option>
//                     <option value="newest">Newest</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Product grid */}
//             {filteredProducts.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="rounded-3xl border border-[#e8eee8] bg-white px-5 py-16 text-center sm:py-20"
//               >
//                 <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#eef5ed]">
//                   <PackageOpen className="h-7 w-7 text-[#2d6a4f]" />
//                 </div>

//                 <h2 className="font-serif text-2xl font-semibold text-[#1a3c2e]">
//                   No products found
//                 </h2>

//                 <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
//                   No products match your current selection. Try resetting your
//                   filters or explore another collection.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={clearFilters}
//                   className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a3c2e] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#2d6a4f]"
//                 >
//                   <RotateCcw className="h-3.5 w-3.5" />
//                   Reset filters
//                 </button>
//               </motion.div>
//             ) : (
//               <motion.div
//                 layout
//                 className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
//               >
//                 <AnimatePresence mode="popLayout">
//                   {filteredProducts.map((product, index) => (
//                     <motion.div
//                       key={product.id}
//                       layout
//                       initial={{ opacity: 0, y: 16 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.96 }}
//                       transition={{
//                         duration: 0.25,
//                         delay: Math.min(index * 0.025, 0.2)
//                       }}
//                       className="min-w-0"
//                     >
//                       <ProductCard product={product} />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>
//             )}
//           </section>
//         </div>
//       </main>

//       {/* Mobile filters drawer */}
//       <AnimatePresence>
//         {showFilters && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-[#10241b]/55 backdrop-blur-sm lg:hidden"
//             onClick={() => setShowFilters(false)}
//           >
//             <motion.div
//               initial={{ y: '100%' }}
//               animate={{ y: 0 }}
//               exit={{ y: '100%' }}
//               transition={{ type: 'spring', damping: 30, stiffness: 280 }}
//               onClick={(event) => event.stopPropagation()}
//               className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-[#fcfbf7] shadow-2xl"
//             >
//               <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e8eee8] bg-[#fcfbf7]/95 px-5 py-4 backdrop-blur">
//                 <div>
//                   <h2 className="text-base font-extrabold text-[#1a3c2e]">
//                     Refine selection
//                   </h2>
//                   <p className="mt-1 text-xs text-gray-400">
//                     {filteredProducts.length} products available
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   aria-label="Close filters"
//                   onClick={() => setShowFilters(false)}
//                   className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1a3c2e] shadow-sm transition hover:bg-[#eaf2e9]"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-5">
//                 <FilterContent mobile />

//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(false)}
//                   className="mt-5 w-full rounded-xl bg-[#1a3c2e] py-3.5 text-sm font-bold text-white transition hover:bg-[#2d6a4f]"
//                 >
//                   Show {filteredProducts.length} products
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CategoryPage;




import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Leaf,
  Sprout,
  Flower2,
  TreeDeciduous,
  Shovel,
  Sun,
  Droplets,
  LayoutGrid,
  SlidersHorizontal,
  X,
  ChevronRight,
  ArrowUpDown,
  RotateCcw,
  PackageOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { api, mediaUrl } from '../utils/api';


// ==========================================
// SUBCATEGORY ICONS AND COLORS
// ==========================================

const subcategoryIcons = [
  Sprout,
  Flower2,
  TreeDeciduous,
  Shovel,
  Sun,
  Droplets,
  Leaf
];

const subcategoryColors = [
  'from-[#e4f1e4] to-[#f3f7e9]',
  'from-[#e5eee8] to-[#dcebe2]',
  'from-[#edf0df] to-[#e3edda]',
  'from-[#e8eee4] to-[#dce8dc]',
  'from-[#f0f1e4] to-[#e8efdf]',
  'from-[#e2efed] to-[#e6f2e8]'
];

const getSubcategoryStyle = (item, index) => {
  const name = String(item?.name || '').toLowerCase();

  let iconIndex = index % subcategoryIcons.length;

  if (name.includes('flower') || name.includes('rose')) {
    iconIndex = 1;
  } else if (
    name.includes('tree') ||
    name.includes('outdoor')
  ) {
    iconIndex = 2;
  } else if (
    name.includes('tool') ||
    name.includes('garden')
  ) {
    iconIndex = 3;
  } else if (name.includes('sun')) {
    iconIndex = 4;
  } else if (
    name.includes('water') ||
    name.includes('aqua')
  ) {
    iconIndex = 5;
  } else if (
    name.includes('plant') ||
    name.includes('green')
  ) {
    iconIndex = 0;
  }

  return {
    Icon: subcategoryIcons[iconIndex],
    background: subcategoryColors[index % subcategoryColors.length]
  };
};


// ==========================================
// CATEGORY PAGE
// ==========================================

const CategoryPage = () => {

  const { category, subcategory } = useParams();

  const decodedCategory = decodeURIComponent(category || '');
  const decodedSubcategory = decodeURIComponent(subcategory || '');

  const { products = [], loading } = useProducts();

  // ========================================
  // STATES
  // ========================================

  const [categoryRecords, setCategoryRecords] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(false);

  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);


  // ========================================
  // FETCH CATEGORIES
  // ========================================

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoryError(false);

      try {
        const response = await api('/categories');

        if (isMounted) {
          const records = Array.isArray(response)
            ? response
            : Array.isArray(response?.categories)
              ? response.categories
              : Array.isArray(response?.data)
                ? response.data
                : [];

          setCategoryRecords(
            records.filter(
              (item) =>
                item &&
                item.name &&
                Number(item.is_active ?? 1) !== 0
            )
          );
        }

      } catch (error) {
        console.error('Categories API:', error.message);

        if (isMounted) {
          setCategoryRecords([]);
          setCategoryError(true);
        }

      } finally {
        if (isMounted) {
          setCategoriesLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);


  // ========================================
  // CURRENT CATEGORY
  // ========================================

  const categoryRecord = useMemo(() => {
    const current = decodedCategory.toLowerCase();

    return categoryRecords.find((item) => {
      const name = String(item.name || '').toLowerCase();
      const slug = String(item.slug || '').toLowerCase();

      return name === current || slug === current;
    });

  }, [categoryRecords, decodedCategory]);


  const categoryName = categoryRecord?.name || decodedCategory;


  // ========================================
  // SUBCATEGORIES
  // ========================================

  const subcategoryRecords = useMemo(() => {
    return Array.isArray(categoryRecord?.subcategories)
      ? categoryRecord.subcategories.filter(
          (item) =>
            item &&
            Number(item.is_active ?? 1) !== 0
        )
      : [];
  }, [categoryRecord]);


  const subcategoryRecord = useMemo(() => {

    if (!decodedSubcategory) return null;

    const current = decodedSubcategory.toLowerCase();

    return (
      subcategoryRecords.find((item) =>
        String(item.slug || '').toLowerCase() === current ||
        String(item.name || '').toLowerCase() === current ||
        String(item.id || '') === current
      ) || null
    );

  }, [subcategoryRecords, decodedSubcategory]);


  const subcategoryName =
    subcategoryRecord?.name || decodedSubcategory;

  const pageTitle = subcategoryName || categoryName;


  // ========================================
  // FILTER PRODUCTS BY CATEGORY
  // ========================================

  const categoryProducts = useMemo(() => {

    const current = decodedCategory.toLowerCase();
    const currentName = String(categoryName).toLowerCase();
    const currentId = String(categoryRecord?.id ?? '');

    return products.filter((product) => {

      const productCategory = product.category;

      let matchesCategory = false;

      if (
        productCategory &&
        typeof productCategory === 'object'
      ) {

        const productCategoryName = String(
          productCategory.name ||
          productCategory.slug ||
          ''
        ).toLowerCase();

        const productCategoryId = String(
          productCategory.id ?? ''
        );

        matchesCategory =
          productCategoryName === current ||
          productCategoryName === currentName ||
          (
            currentId &&
            productCategoryId === currentId
          );

      } else {

        const value = String(
          productCategory || ''
        ).toLowerCase();

        matchesCategory =
          value === current ||
          value === currentName ||
          (currentId && value === currentId) ||
          (
            currentId &&
            String(product.category_id || '') === currentId
          );
      }

      if (!matchesCategory) return false;

      // Parent category selected
      if (!decodedSubcategory) return true;

      // Subcategory selected
      const selectedSubId = String(
        subcategoryRecord?.id ?? ''
      );

      const productSubId = String(
        product.subcategory_id ??
        product.subcategoryId ??
        ''
      );

      const productSub = product.subcategory;

      const productSubName =
        productSub && typeof productSub === 'object'
          ? String(
              productSub.name ||
              productSub.slug ||
              ''
            ).toLowerCase()
          : String(
              productSub ||
              product.subcategory_name ||
              product.subcategory_slug ||
              ''
            ).toLowerCase();

      const selectedSub = decodedSubcategory.toLowerCase();

      return (
        (selectedSubId && productSubId === selectedSubId) ||
        productSubName === selectedSub ||
        productSubName === String(subcategoryName).toLowerCase() ||
        productSubId === selectedSub
      );

    });

  }, [
    products,
    decodedCategory,
    categoryName,
    categoryRecord,
    decodedSubcategory,
    subcategoryRecord,
    subcategoryName
  ]);


  // ========================================
  // PRICE CALCULATION
  // ========================================

  const maxPrice = useMemo(() => {

    return Math.max(
      0,
      ...categoryProducts.map(
        (product) => Number(product.price) || 0
      )
    );

  }, [categoryProducts]);


  const effectiveMaxPrice = Number.isFinite(priceRange[1])
    ? priceRange[1]
    : maxPrice;


  // ========================================
  // RESET FILTERS ON ROUTE CHANGE
  // ========================================

  useEffect(() => {

    setPriceRange([0, Infinity]);
    setSortBy('featured');
    setShowFilters(false);

  }, [decodedCategory, decodedSubcategory]);


  // ========================================
  // FILTER AND SORT PRODUCTS
  // ========================================

  const filteredProducts = useMemo(() => {

    const result = categoryProducts.filter((product) => {

      const price = Number(product.price) || 0;

      return (
        price >= priceRange[0] &&
        price <= effectiveMaxPrice
      );

    });

    switch (sortBy) {

      case 'price-low':
        result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case 'price-high':
        result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case 'rating':
        result.sort(
          (a, b) =>
            (Number(b.rating) || 0) -
            (Number(a.rating) || 0)
        );
        break;

      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );
        break;

      default:
        break;
    }

    return result;

  }, [
    categoryProducts,
    priceRange,
    effectiveMaxPrice,
    sortBy
  ]);


  // ========================================
  // SCROLL TO TOP
  // ========================================

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, [decodedCategory, decodedSubcategory]);


  // ========================================
  // HELPERS
  // ========================================

  const clearFilters = () => {
    setPriceRange([0, Infinity]);
    setSortBy('featured');
  };


  const activeFilterCount =
    (
      priceRange[0] > 0 ||
      effectiveMaxPrice < maxPrice
        ? 1
        : 0
    ) +
    (sortBy !== 'featured' ? 1 : 0);


  const getCategoryPath = (item) =>
    `/category/${encodeURIComponent(
      item?.slug || item?.name || decodedCategory
    )}`;


  const getSubcategoryPath = (item) => {

    const parent =
      categoryRecord?.slug ||
      categoryRecord?.name ||
      decodedCategory;

    const child =
      item?.slug ||
      item?.name ||
      item?.id;

    return `/category/${encodeURIComponent(parent)}/${encodeURIComponent(child)}`;
  };


  const categoryImage = categoryRecord?.image
    ? mediaUrl(categoryRecord.image)
    : '';


  // ========================================
  // FILTER CONTENT
  // ========================================

  const FilterContent = ({ mobile = false }) => (

    <div className={mobile ? 'space-y-6' : ''}>

      {/* Categories */}
      <div className="mb-6 border-b border-[#e8eee8] pb-6">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#1a3c2e]">
            Categories
          </h3>

          {mobile && (
            <span className="text-xs text-gray-400">
              {categoryRecords.length} available
            </span>
          )}

        </div>

        {categoriesLoading ? (

          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-9 animate-pulse rounded-xl bg-[#f0f4ef]"
              />
            ))}
          </div>

        ) : categoryError ? (

          <p className="text-sm leading-6 text-red-600">
            Categories could not be loaded.
          </p>

        ) : categoryRecords.length === 0 ? (

          <p className="text-sm leading-6 text-gray-500">
            No categories available.
          </p>

        ) : (

          <div className={mobile ? 'grid grid-cols-2 gap-2' : 'space-y-1'}>

            {categoryRecords.map((item) => {

              const isActive =
                String(item.name).toLowerCase() ===
                  String(categoryName).toLowerCase() ||
                String(item.slug || '').toLowerCase() ===
                  decodedCategory.toLowerCase();

              return (

                <Link
                  key={item.id ?? item.slug ?? item.name}
                  to={getCategoryPath(item)}
                  onClick={() => setShowFilters(false)}
                  className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1a3c2e] font-semibold text-white shadow-sm'
                      : 'text-[#526457] hover:bg-[#f0f5ef] hover:text-[#1a3c2e]'
                  }`}
                >

                  <span className="min-w-0 truncate">
                    {item.name}
                  </span>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      isActive
                        ? 'text-[#a3d9b1]'
                        : 'text-gray-300'
                    }`}
                  />

                </Link>

              );

            })}

          </div>

        )}

      </div>


      {/* Price filter */}
      <div className="mb-6 border-b border-[#e8eee8] pb-6">

        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1a3c2e]">
          Price range
        </h3>

        <div className="mb-4 flex items-center gap-2">

          <label className="min-w-0 flex-1">

            <span className="mb-1 block text-[10px] text-gray-400">
              Minimum
            </span>

            <input
              type="number"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(event) => {

                const value = Math.max(
                  0,
                  Number(event.target.value) || 0
                );

                setPriceRange([
                  Math.min(value, effectiveMaxPrice),
                  effectiveMaxPrice
                ]);

              }}
              className="w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcf9] px-3 py-2.5 text-sm text-[#1a3c2e] outline-none transition focus:border-[#2d6a4f]"
            />

          </label>

          <span className="mt-5 text-gray-300">
            —
          </span>

          <label className="min-w-0 flex-1">

            <span className="mb-1 block text-[10px] text-gray-400">
              Maximum
            </span>

            <input
              type="number"
              min={priceRange[0]}
              max={maxPrice}
              value={effectiveMaxPrice}
              onChange={(event) => {

                const value = Math.max(
                  priceRange[0],
                  Math.min(
                    Number(event.target.value) || 0,
                    maxPrice
                  )
                );

                setPriceRange([
                  priceRange[0],
                  value
                ]);

              }}
              className="w-full rounded-xl border border-[#e2e9e1] bg-[#fbfcf9] px-3 py-2.5 text-sm text-[#1a3c2e] outline-none transition focus:border-[#2d6a4f]"
            />

          </label>

        </div>

        <input
          aria-label="Maximum product price"
          type="range"
          min="0"
          max={Math.max(maxPrice, 1)}
          value={Math.min(
            effectiveMaxPrice,
            Math.max(maxPrice, 1)
          )}
          onChange={(event) =>
            setPriceRange([
              priceRange[0],
              Number(event.target.value)
            ])
          }
          className="w-full cursor-pointer accent-[#2d6a4f]"
        />

        <div className="mt-2 flex justify-between text-[11px] text-gray-400">

          <span>₹0</span>

          <span>
            ₹{maxPrice.toLocaleString('en-IN')}
          </span>

        </div>

      </div>


      {/* Reset filters */}
      <button
        type="button"
        onClick={clearFilters}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce6db] px-4 py-3 text-sm font-semibold text-[#2d6a4f] transition hover:border-[#2d6a4f] hover:bg-[#f0f5ef]"
      >
        <RotateCcw className="h-4 w-4" />
        Reset filters
      </button>

    </div>

  );


  // ========================================
  // LOADING SCREEN
  // ========================================

  if (loading || categoriesLoading) {

    return (

      <div className="grid min-h-[55vh] place-items-center bg-[#fcfbf7]">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#dce8dc] border-t-[#2d6a4f]" />

          <p className="text-sm font-medium text-[#526457]">
            Preparing your collection...
          </p>

        </div>

      </div>

    );

  }


  // ========================================
  // MAIN UI
  // ========================================

  return (

    <div className="min-h-screen overflow-hidden bg-[#fcfbf7] text-[#1a3c2e]">


      {/* =====================================
          CATEGORY HERO
      ====================================== */}

      <section className="relative isolate overflow-hidden bg-[#1a3c2e]">

        {categoryImage && (
          <img
            src={categoryImage}
            alt={categoryName}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        )}

        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/10" />

        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/10" />

        <div className="absolute -bottom-24 left-[35%] h-64 w-64 rounded-full bg-[#2d6a4f]/30 blur-3xl" />


        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20">


          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-white/60">

            <Link
              to="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <Link
              to={getCategoryPath(categoryRecord)}
              className="transition hover:text-white"
            >
              {categoryName}
            </Link>

            {subcategoryName && (
              <>
                <ChevronRight className="h-3 w-3" />

                <span className="font-medium text-[#a3d9b1]">
                  {subcategoryName}
                </span>
              </>
            )}

          </nav>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a3d9b1]">

              <Leaf className="h-3.5 w-3.5" />

              Explore collection

            </div>


            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {pageTitle}
            </h1>


            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              {subcategoryRecord?.description ||
                categoryRecord?.description ||
                'Explore our thoughtfully selected collection and bring more greenery into your everyday spaces.'}
            </p>


            <div className="mt-7 flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-[#a3d9b1] px-4 py-2 text-xs font-bold text-[#1a3c2e]">

                {categoryProducts.length}{' '}

                {categoryProducts.length === 1
                  ? 'product'
                  : 'products'}

              </span>

              <span className="text-xs text-white/55">
                Thoughtfully selected for your space
              </span>

            </div>

          </motion.div>

        </div>

      </section>



      {/* =====================================
          SUBCATEGORY NAVIGATION
          NO IMAGE REQUIRED
      ====================================== */}

      {subcategoryRecords.length > 0 && (

        <section className="border-b border-[#e8eee8] bg-white">

          <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-9 lg:px-8">


            {/* Section heading */}
            <div className="mb-5 flex items-end justify-between gap-3">

              <div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a927f]">
                  Discover more
                </span>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#1a3c2e] sm:text-3xl">
                  Explore Collections
                </h2>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  Find the perfect collection for your space
                </p>

              </div>

              <span className="hidden rounded-full bg-[#f0f5ef] px-3 py-1.5 text-xs font-semibold text-[#2d6a4f] sm:inline-flex">
                {subcategoryRecords.length} collections
              </span>

            </div>


            {/* Subcategory cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">


              {/* ALL CATEGORY CARD */}
              <Link
                to={getCategoryPath(categoryRecord)}
                className={`group relative overflow-hidden rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4 ${
                  !decodedSubcategory
                    ? 'border-[#2d6a4f] bg-[#f0f5ef] shadow-sm'
                    : 'border-[#e8eee8] bg-white hover:border-[#a3d9b1]'
                }`}
              >

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#829486]">
                    Collection
                  </span>

                  <ChevronRight className="h-4 w-4 text-[#2d6a4f] transition-transform group-hover:translate-x-1" />

                </div>


                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#e4f1e4] to-[#dcebe2] sm:h-20 sm:w-20">

                  <LayoutGrid className="h-8 w-8 text-[#2d6a4f] sm:h-9 sm:w-9" />

                </div>


                <h3 className="mt-4 line-clamp-2 text-sm font-bold text-[#1a3c2e]">
                  All {categoryName}
                </h3>

                <p className="mt-1 text-[10px] text-gray-400">
                  View all products
                </p>

              </Link>



              {/* SUBCATEGORY CARDS */}
              {subcategoryRecords.map((item, index) => {

                const isActive =
                  String(item.slug || '').toLowerCase() ===
                    decodedSubcategory.toLowerCase() ||
                  String(item.name || '').toLowerCase() ===
                    decodedSubcategory.toLowerCase() ||
                  String(item.id || '') === decodedSubcategory;

                const {
                  Icon,
                  background
                } = getSubcategoryStyle(item, index);


                return (

                  <Link
                    key={item.id ?? item.slug ?? item.name}
                    to={getSubcategoryPath(item)}
                    className={`group relative overflow-hidden rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4 ${
                      isActive
                        ? 'border-[#2d6a4f] bg-[#f0f5ef] shadow-sm'
                        : 'border-[#e8eee8] bg-white hover:border-[#a3d9b1]'
                    }`}
                  >

                    {/* Decorative background */}
                    <div className="absolute -right-7 -top-7 h-20 w-20 rounded-full bg-[#2d6a4f]/5 transition-transform duration-500 group-hover:scale-150" />


                    {/* Top label */}
                    <div className="relative mb-3 flex items-center justify-between">

                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#829486]">
                        Explore
                      </span>

                      {isActive ? (

                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1a3c2e] text-white">
                          <Leaf className="h-3.5 w-3.5" />
                        </span>

                      ) : (

                        <ChevronRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[#2d6a4f]" />

                      )}

                    </div>


                    {/* Icon box */}
                    <div
                      className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${background} transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20`}
                    >

                      <Icon className="h-8 w-8 text-[#2d6a4f] sm:h-9 sm:w-9" />

                    </div>


                    {/* Name */}
                    <h3 className="relative mt-4 line-clamp-2 text-sm font-bold text-[#1a3c2e]">
                      {item.name}
                    </h3>


                    <p className="relative mt-1 text-[10px] text-gray-400">
                      Explore collection
                    </p>


                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 h-1 w-full bg-[#2d6a4f]" />
                    )}

                  </Link>

                );

              })}

            </div>

          </div>

        </section>

      )}



      {/* =====================================
          MAIN PRODUCT COLLECTION
      ====================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">


        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400">

          <span>Collection</span>

          <ChevronRight className="h-3 w-3" />

          <span className="font-semibold text-[#2d6a4f]">
            {pageTitle}
          </span>

        </div>


        <div className="mt-7 flex items-start gap-8">


          {/* =====================================
              DESKTOP FILTER SIDEBAR
          ====================================== */}

          <aside className="hidden w-64 shrink-0 lg:block">

            <div className="sticky top-24 rounded-2xl border border-[#e8eee8] bg-white p-5 shadow-[0_8px_30px_rgba(26,60,46,0.04)]">


              <div className="mb-6 flex items-center gap-2 border-b border-[#e8eee8] pb-5">

                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef5ed]">

                  <SlidersHorizontal className="h-4 w-4 text-[#2d6a4f]" />

                </div>

                <div>

                  <h2 className="text-sm font-extrabold">
                    Refine selection
                  </h2>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    Find your perfect match
                  </p>

                </div>

              </div>


              <FilterContent />

            </div>

          </aside>



          {/* =====================================
              PRODUCT SECTION
          ====================================== */}

          <section className="min-w-0 flex-1">


            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8eee8] bg-white p-3 sm:p-4">

              <div>

                <p className="text-sm font-bold text-[#1a3c2e]">
                  {pageTitle} Collection
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Showing {filteredProducts.length} of {categoryProducts.length} products
                </p>

              </div>


              <div className="flex items-center gap-2">


                {/* Mobile filter button */}
                <button
                  type="button"
                  onClick={() => setShowFilters(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#e2e9e1] px-3 py-2.5 text-xs font-semibold text-[#1a3c2e] transition hover:bg-[#f0f5ef] lg:hidden"
                >

                  <SlidersHorizontal className="h-4 w-4" />

                  Filters

                  {activeFilterCount > 0 && (

                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#2d6a4f] px-1 text-[10px] text-white">
                      {activeFilterCount}
                    </span>

                  )}

                </button>



                {/* Sorting */}
                <div className="flex items-center gap-2 rounded-xl border border-[#e2e9e1] bg-[#fcfcf9] px-3">

                  <ArrowUpDown className="h-3.5 w-3.5 text-[#2d6a4f]" />

                  <select
                    aria-label="Sort products"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    className="max-w-[145px] cursor-pointer bg-transparent py-2.5 text-xs font-semibold text-[#1a3c2e] outline-none sm:max-w-none"
                  >

                    <option value="featured">
                      Featured
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="rating">
                      Rating
                    </option>

                    <option value="newest">
                      Newest
                    </option>

                  </select>

                </div>

              </div>

            </div>



            {/* =====================================
                EMPTY STATE
            ====================================== */}

            {filteredProducts.length === 0 ? (

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-[#e8eee8] bg-white px-5 py-16 text-center sm:py-20"
              >

                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#eef5ed]">

                  <PackageOpen className="h-7 w-7 text-[#2d6a4f]" />

                </div>


                <h2 className="font-serif text-2xl font-semibold text-[#1a3c2e]">
                  No products found
                </h2>


                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                  No products match your current selection. Try resetting your filters or explore another collection.
                </p>


                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a3c2e] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#2d6a4f]"
                >

                  <RotateCcw className="h-3.5 w-3.5" />

                  Reset filters

                </button>

              </motion.div>

            ) : (


              /* =====================================
                  PRODUCT GRID
              ====================================== */

              <motion.div
                layout
                className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
              >

                <AnimatePresence mode="popLayout">

                  {filteredProducts.map((product, index) => (

                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(index * 0.025, 0.2)
                      }}
                      className="min-w-0"
                    >

                      <ProductCard product={product} />

                    </motion.div>

                  ))}

                </AnimatePresence>

              </motion.div>

            )}

          </section>

        </div>

      </main>



      {/* =====================================
          MOBILE FILTER DRAWER
      ====================================== */}

      <AnimatePresence>

        {showFilters && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#10241b]/55 backdrop-blur-sm lg:hidden"
            onClick={() => setShowFilters(false)}
          >

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 280
              }}
              onClick={(event) => event.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-[#fcfbf7] shadow-2xl"
            >


              {/* Drawer header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e8eee8] bg-[#fcfbf7]/95 px-5 py-4 backdrop-blur">

                <div>

                  <h2 className="text-base font-extrabold text-[#1a3c2e]">
                    Refine selection
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    {filteredProducts.length} products available
                  </p>

                </div>


                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setShowFilters(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1a3c2e] shadow-sm transition hover:bg-[#eaf2e9]"
                >

                  <X className="h-5 w-5" />

                </button>

              </div>



              {/* Drawer content */}
              <div className="p-5">

                <FilterContent mobile />


                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a3c2e] py-3.5 text-sm font-bold text-white transition hover:bg-[#2d6a4f]"
                >

                  Show {filteredProducts.length} products

                  <ArrowRight className="h-4 w-4" />

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

};


export default CategoryPage;
