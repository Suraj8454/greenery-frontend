
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import useSection from '../hooks/useSection';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';

import { Link, useNavigate } from 'react-router-dom';

import {
  Leaf,
  ArrowUpRight,
  ChevronRight,
  X,
} from 'lucide-react';

import { useProducts } from '../context/ProductsContext';
import { api, mediaUrl } from '../utils/api';

const categoryArt = {
  Indoor:
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600&h=750',

  Outdoor:
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600&h=750',

  Planters:
    'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=600&h=750',

  Hanging:
    'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&q=80&w=600&h=750',

  Cocopeat:
    'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600&h=750',

  Supplies:
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600&h=750',
};

const fallbackArt = Object.values(categoryArt)[0];

const VISIBLE_COUNT = 3;

const CategorySection = () => {
  const section = useSection('category_section');

  const containerRef = useRef(null);

  const { products } = useProducts();

  const reduceMotion = useReducedMotion();

  const navigate = useNavigate();

  const [backendCategories, setBackendCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    let cancelled = false;

    api('/categories')
      .then((rows) => {
        if (cancelled) return;

        setBackendCategories(Array.isArray(rows) ? rows : []);
      })
      .catch((error) => {
        if (cancelled) return;

        console.error('Failed to load categories:', error);

        setBackendCategories([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Build categories
  const categories = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    const source = backendCategories.length
      ? backendCategories
      : [
          ...new Set(
            safeProducts
              .map((p) => String(p.category || '').trim())
              .filter(Boolean)
          ),
        ].map((name) => ({
          name,
          slug: name,
          image: '',
          description: '',
        }));

    return source.map((cat) => {
      const count = safeProducts.filter(
        (p) =>
          String(p.category || '').toLowerCase() ===
          String(cat.name || '').toLowerCase()
      ).length;

      return {
        ...cat,
        slug: cat.slug || cat.name,
        img:
          mediaUrl(cat.image) ||
          categoryArt[cat.name] ||
          fallbackArt,
        count,
      };
    });
  }, [backendCategories, products]);

  // First 3 categories
  const featuredCategories = useMemo(
    () => categories.slice(0, VISIBLE_COUNT),
    [categories]
  );

  const hasMore = categories.length > VISIBLE_COUNT;

  // Navigate to category
  const handleClick = useCallback(
    (slug) => {
      navigate(`/category/${encodeURIComponent(slug)}`);
    },
    [navigate]
  );

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <>
      {/* ==========================================
          DESKTOP CATEGORY SECTION
      ========================================== */}

      <section
        id="categories"
        ref={containerRef}
        className="hidden lg:block relative bg-[#fcfbf7]"
        style={{ height: '200vh' }}
      >
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* HEADER */}
          <div className="absolute top-10 md:top-12 left-0 right-0 px-4 sm:px-6 lg:px-8 z-30">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

              <div>
                <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
                  <Leaf className="w-3.5 h-3.5" />

                  {section.eyebrow || 'Explore Collections'}
                </div>

                <h2
                  style={
                    section.color
                      ? { color: section.color }
                      : undefined
                  }
                  className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a3c2e] leading-tight"
                >
                  {section.title || 'Shop by Category'}
                </h2>
              </div>

              {hasMore && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group text-[#2d6a4f] font-semibold text-sm flex items-center gap-2 shrink-0 hover:gap-3 transition-[gap] duration-300"
                >
                  View All {categories.length} Categories

                  <span className="w-9 h-9 rounded-full bg-[#eef2ed] group-hover:bg-[#2d6a4f] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              )}

            </div>
          </div>

          {/* CATEGORY CARDS */}
          <div className="absolute top-[56%] -translate-y-1/2 left-0 right-0 w-full flex items-center justify-center px-4 md:px-8">

            <div className="flex items-center justify-center gap-5 w-full max-w-5xl mx-auto">

              {featuredCategories.map((cat, idx) => (
                <CardSlot
                  key={cat.slug || idx}
                  cat={cat}
                  idx={idx}
                  total={featuredCategories.length}
                  progress={smoothProgress}
                  onClick={() => handleClick(cat.slug)}
                  reduceMotion={reduceMotion}
                />
              ))}

            </div>
          </div>

          {/* BOTTOM CAPTION */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="absolute bottom-10 md:bottom-12 left-0 right-0 text-center z-30"
          >
            <div className="flex items-center justify-center gap-3">

              <span className="w-8 h-px bg-[#2d6a4f]/30" />

              <p className="text-[11px] text-[#2d6a4f]/70 tracking-[0.3em] uppercase font-medium">
                Curated for every green home
              </p>

              <span className="w-8 h-px bg-[#2d6a4f]/30" />

            </div>
          </motion.div>

        </div>
      </section>

      {/* ==========================================
          MOBILE CATEGORY SECTION
      ========================================== */}

      <section
        id="category-section-mobile"
        className="lg:hidden bg-[#fcfbf7] py-10 px-4"
      >
        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-7">

            <div className="flex items-center justify-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
              <Leaf className="w-3.5 h-3.5" />

              {section.eyebrow || 'Explore Collections'}
            </div>

            <h2 className="text-3xl font-serif font-bold text-[#1a3c2e] leading-tight">
              {section.title || 'Shop by Category'}
            </h2>

          </div>

          {/* FIRST 3 CATEGORIES */}
          <div className="space-y-3">

            {featuredCategories.map((cat, idx) => (
              <motion.div
                key={cat.slug || idx}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 20 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.05, 0.2),
                }}
              >
                <Link
                  to={`/category/${encodeURIComponent(cat.slug)}`}
                  className="block group relative rounded-2xl overflow-hidden aspect-[16/7] bg-gray-100 shadow-md active:scale-[0.99] transition-transform duration-150"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">

                    <h3 className="font-serif font-bold text-white text-lg leading-tight mb-1">
                      {cat.name}
                    </h3>

                    <p className="text-white/70 text-xs">
                      {cat.count} items
                    </p>

                  </div>
                </Link>
              </motion.div>
            ))}

          </div>

          {/* VIEW ALL BUTTON */}
          {hasMore && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-[#1a3c2e] text-white py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform"
            >
              View All {categories.length} Categories

              <ChevronRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </section>

      {/* ==========================================
          ALL CATEGORIES MODAL
      ========================================== */}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >

            <motion.div
              initial={{
                scale: 0.94,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.94,
                opacity: 0,
                y: 20,
              }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fcfbf7] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >

              {/* MODAL HEADER */}
              <div className="flex items-center justify-between p-5 md:p-7 border-b border-gray-100 bg-white">

                <div>
                  <div className="flex items-center gap-2 text-[#2d6a4f] text-[11px] font-bold tracking-[0.25em] uppercase mb-1">
                    <Leaf className="w-3.5 h-3.5" />

                    All Collections
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1a3c2e]">
                    Every Category
                  </h3>

                  <p className="text-gray-500 text-xs mt-1">
                    {categories.length} categories available
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close categories"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1a3c2e] hover:text-white flex items-center justify-center text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

              </div>

              {/* ALL CATEGORIES GRID */}
              <div className="p-5 md:p-7 overflow-y-auto max-h-[calc(90vh-110px)]">

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                  {categories.map((cat, idx) => (
                    <motion.div
                      key={cat.slug || idx}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, y: 15 }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: Math.min(idx * 0.03, 0.25),
                        duration: 0.35,
                      }}
                    >

                      <Link
                        to={`/category/${encodeURIComponent(cat.slug)}`}
                        onClick={() => setIsModalOpen(false)}
                        className="block group"
                      >

                        <div className="relative rounded-2xl overflow-hidden aspect-square mb-2 bg-gray-100 shadow-sm hover:shadow-lg transition-shadow">

                          <img
                            src={cat.img}
                            alt={cat.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                          <div className="absolute bottom-3 left-3 right-3">

                            <h4 className="font-bold text-white text-sm leading-tight">
                              {cat.name}
                            </h4>

                            <p className="text-white/70 text-[10px] mt-0.5">
                              {cat.count} items
                            </p>

                          </div>

                        </div>

                      </Link>

                    </motion.div>
                  ))}

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ==========================================
   CARD ANIMATION
========================================== */

const CardSlot = ({
  cat,
  idx,
  total,
  progress,
  onClick,
  reduceMotion,
}) => {
  const { inputRange } = useMemo(() => {
    const seg = 1 / Math.max(total, 1);

    const start = idx * seg;

    const end = start + seg * 0.8;

    const raw = [
      Math.max(0, start - 0.02),
      Math.max(0.01, start),
      Math.min(0.98, end),
      Math.min(1, end + 0.05),
    ];

    const out = [];

    for (let i = 0; i < raw.length; i++) {
      const prev = i === 0 ? -Infinity : out[i - 1];

      out.push(Math.max(raw[i], prev + 0.001));
    }

    return {
      inputRange: out,
    };
  }, [idx, total]);

  const y = useTransform(
    progress,
    inputRange,
    ['-20%', '-20%', '0%', '0%']
  );

  const opacity = useTransform(
    progress,
    inputRange,
    [0, 0, 1, 1]
  );

  const scale = useTransform(
    progress,
    inputRange,
    [0.96, 0.96, 1, 1]
  );

  if (reduceMotion) {
    return (
      <StaticCard
        cat={cat}
        idx={idx}
        onClick={onClick}
      />
    );
  }

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      className="flex-1 min-w-0 group cursor-pointer"
      onClick={onClick}
    >
      <CardVisual cat={cat} idx={idx} />
    </motion.div>
  );
};

/* ==========================================
   STATIC CARD
========================================== */

const StaticCard = ({ cat, idx, onClick }) => (
  <div
    className="flex-1 min-w-0 group cursor-pointer"
    onClick={onClick}
  >
    <CardVisual cat={cat} idx={idx} />
  </div>
);

/* ==========================================
   CARD DESIGN
========================================== */

const CardVisual = ({ cat, idx }) => (
  <div className="relative rounded-2xl overflow-hidden aspect-[5/4.5] bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow duration-300">

    <img
      src={cat.img}
      alt={cat.name}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

    <div className="absolute top-3 left-3 text-white/50 font-bold text-xs tracking-[0.2em]">
      0{idx + 1}
    </div>

    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <ArrowUpRight className="w-3.5 h-3.5" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-4">

      <h3 className="font-serif font-bold text-white text-lg leading-tight mb-1">
        {cat.name}
      </h3>

      <p className="text-white/70 text-xs">
        {cat.count} items
      </p>

    </div>

  </div>
);

export default CategorySection;
