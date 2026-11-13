


import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  Star,
  Quote,
  Leaf,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

import { api, mediaUrl } from '../utils/api';
import useSection from '../hooks/useSection';

const COLORS = {
  background: '#F7F9F5',
  card: '#FFFFFF',
  green: '#1F3D2E',
  greenSoft: '#2D6A4F',
  sage: '#EAF1E6',
  text: '#26352D',
  muted: '#6B7A6F',
  border: '#E5EBE0',
  gold: '#C99A48',
};

const getInitials = (name = 'Happy Customer') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

const Testimonials = () => {
  const section = useSection('testimonials');
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchTestimonials = async () => {
      try {
        const response = await api('/testimonials');
        const rows = Array.isArray(response)
          ? response
          : Array.isArray(response?.testimonials)
            ? response.testimonials
            : Array.isArray(response?.data)
              ? response.data
              : Array.isArray(response?.data?.testimonials)
                ? response.data.testimonials
                : [];

        const result = rows
          .filter((item) => Number(item.is_active ?? 1) === 1)
          .map((item) => ({
            ...item,
            image: item.image ? mediaUrl(item.image) || '' : '',
            rating: Math.max(0, Math.min(5, Number(item.rating) || 5)),
          }));

        if (active) setTestimonials(result);
      } catch (error) {
        console.error('Testimonials API error:', error);
        if (active) setTestimonials([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchTestimonials();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  useEffect(() => {
    setCurrent((previous) => Math.min(previous, maxIndex));
  }, [maxIndex]);

  const next = () => {
    if (maxIndex > 0) {
      setCurrent((previous) => (previous >= maxIndex ? 0 : previous + 1));
    }
  };

  const prev = () => {
    if (maxIndex > 0) {
      setCurrent((previous) => (previous <= 0 ? maxIndex : previous - 1));
    }
  };

  useEffect(() => {
    if (!isInView || isPaused || maxIndex === 0) return;
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous >= maxIndex ? 0 : previous + 1));
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isInView, isPaused, maxIndex]);

  const eyebrow = section.eyebrow || 'A little love from our community';
  const title = section.title || 'Loved by plant parents.';
  const description =
    section.description ||
    'Real people, real homes, and a little more green in everyday life. See why our community loves growing with Cityscape Greenery.';

  const backgroundColor = section.background_color || COLORS.background;
  const headingColor = section.heading_color || COLORS.green;
  const descriptionColor = section.description_color || COLORS.muted;
  const accentColor = section.accent_color || COLORS.greenSoft;

  const visibleTestimonials = testimonials.slice(current, current + visibleCount);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[#e8eee7] bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] py-12 sm:py-16 lg:py-20"
      style={section.background_color ? { backgroundColor } : undefined}
    >
      {/* Subtle decorations (same as FeaturedIn) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e8f1e8]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f0f5ec]/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ===== Heading ===== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Leaf className="h-4 w-4 text-[#2d6a4f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6a4f] sm:text-xs">
              {eyebrow}
            </span>
          </div>

          <h2
            style={section.heading_color ? { color: headingColor } : undefined}
            className="text-xl font-medium tracking-tight text-[#253b2e] sm:text-2xl lg:text-3xl"
          >
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            {description}
          </p>

          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />
        </motion.div>

        {/* ===== Carousel controls ===== */}
        {!loading && testimonials.length > visibleCount && (
          <div className="mb-5 flex items-center justify-between sm:mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8eee7] bg-white/70 px-3 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-[#2d6a4f]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6a4f]">
                Customer stories
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonials"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dce9dc] bg-white text-[#2d6a4f] shadow-sm transition-all duration-300 hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonials"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dce9dc] bg-white text-[#2d6a4f] shadow-sm transition-all duration-300 hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ===== Loading skeleton ===== */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-[#edf0e9] bg-white p-5 shadow-[0_2px_8px_rgba(30,60,40,0.03)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="h-3 w-3 rounded bg-[#E9EDE5]" />
                    ))}
                  </div>
                  <div className="h-5 w-5 rounded bg-[#E9EDE5]" />
                </div>
                <div className="mb-2 h-3 w-full rounded bg-[#E9EDE5]" />
                <div className="mb-2 h-3 w-5/6 rounded bg-[#E9EDE5]" />
                <div className="mb-6 h-3 w-2/3 rounded bg-[#E9EDE5]" />
                <div className="flex items-center gap-2.5 border-t border-[#eef2ea] pt-4">
                  <div className="h-10 w-10 rounded-full bg-[#E9EDE5]" />
                  <div>
                    <div className="mb-1.5 h-2.5 w-24 rounded bg-[#E9EDE5]" />
                    <div className="h-2.5 w-16 rounded bg-[#E9EDE5]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== Empty state ===== */}
        {!loading && testimonials.length === 0 && (
          <div className="mx-auto max-w-xl rounded-xl border border-[#edf0e9] bg-white px-6 py-10 text-center shadow-[0_2px_8px_rgba(30,60,40,0.03)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf1e6] text-[#2d6a4f]">
              <Leaf size={22} strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 text-lg font-medium tracking-tight text-[#253b2e] sm:text-xl">
              Your story could grow here.
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Customer reviews will appear here once they are published
              from your admin panel.
            </p>
          </div>
        )}

        {/* ===== Review cards ===== */}
        {!loading && testimonials.length > 0 && (
          <>
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsPaused(false);
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current}-${visibleCount}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
                >
                  {visibleTestimonials.map((item, index) => (
                    <motion.article
                      key={item.id ?? item._id ?? `${current}-${index}`}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="group relative flex h-full flex-col rounded-xl border border-[#edf0e9] bg-white p-5 shadow-[0_2px_8px_rgba(30,60,40,0.03)] transition-all duration-300 hover:border-[#c9ddc9] hover:bg-[#fcfdfb] hover:shadow-[0_6px_20px_rgba(45,106,79,0.06)]"
                    >
                      {/* Top row — stars + quote */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={13}
                              strokeWidth={1.5}
                              fill={starIndex < item.rating ? COLORS.gold : 'transparent'}
                              color={starIndex < item.rating ? COLORS.gold : '#D8DCD4'}
                            />
                          ))}
                          <span className="ml-2 text-[11px] font-medium text-[#81877E]">
                            {item.rating.toFixed(1)}
                          </span>
                        </div>
                        <Quote
                          size={20}
                          strokeWidth={1.4}
                          className="text-[#c7d6c2] transition-colors duration-300 group-hover:text-[#2d6a4f]"
                        />
                      </div>

                      {/* Review text */}
                      <blockquote className="mt-4 flex-1">
                        <p className="text-[13.5px] leading-6 text-[#525D54]">
                          &ldquo;{item.review || 'A lovely experience with Cityscape Greenery.'}&rdquo;
                        </p>
                      </blockquote>

                      {/* Customer details */}
                      <div className="mt-5 flex items-center gap-2.5 border-t border-[#eef2ea] pt-4">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || 'Customer'}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                            className="h-10 w-10 shrink-0 rounded-full border border-[#e8eee7] object-cover"
                          />
                        ) : (
                          <div
                            aria-label={item.name || 'Customer'}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                            style={{
                              backgroundColor: COLORS.sage,
                              color: COLORS.green,
                            }}
                          >
                            {getInitials(item.name)}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-xs font-semibold text-[#253b2e]">
                            {item.name || 'Happy Customer'}
                          </h3>
                          {item.location && (
                            <p className="mt-0.5 truncate text-[10.5px] text-[#858B81]">
                              {item.location}
                            </p>
                          )}
                          {item.product && (
                            <span className="mt-1.5 inline-flex max-w-full items-center gap-1 truncate rounded-full bg-[#f2f5ef] px-2 py-0.5 text-[9.5px] font-medium text-[#426249]">
                              <Leaf size={9} />
                              {item.product}
                            </span>
                          )}
                        </div>

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f5ef] text-[#2d6a4f] transition-all duration-300 group-hover:bg-[#2d6a4f] group-hover:text-white">
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            {maxIndex > 0 && (
              <div className="mt-7 flex items-center justify-center gap-1.5">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to testimonial page ${index + 1}`}
                    aria-current={current === index ? 'true' : undefined}
                    className="rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                  >
                    <span
                      className="block h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: current === index ? 20 : 6,
                        backgroundColor: current === index ? accentColor : '#D4D9D0',
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* ===== Footer note ===== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.15 }}
          className="mt-8 flex items-center justify-center gap-2 text-center sm:mt-10"
        >
          <span className="text-xs text-gray-500 sm:text-sm">
            Thoughtfully chosen. Carefully delivered. Happily grown.
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#2d6a4f]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;