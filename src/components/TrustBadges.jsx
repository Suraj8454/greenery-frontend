import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Award,
  Headphones,
  Leaf,
  Package,
  Heart,
  Sprout,
  BadgeCheck,
} from 'lucide-react';
import useSection from '../hooks/useSection';

const ICON_MAP = {
  truck: Truck,
  'shield-check': ShieldCheck,
  'rotate-ccw': RotateCcw,
  award: Award,
  headphones: Headphones,
  leaf: Leaf,
  package: Package,
  heart: Heart,
  sprout: Sprout,
  'badge-check': BadgeCheck,
};

const defaultBadges = [
  { icon: Truck, title: 'Free Delivery', sub: 'On orders above ₹1999' },
  { icon: ShieldCheck, title: 'Secure Payment', sub: '100% safe checkout' },
  { icon: RotateCcw, title: 'Easy Returns', sub: '7-day return policy' },
  { icon: Award, title: 'Quality Assured', sub: 'Premium materials' },
  { icon: Headphones, title: '24/7 Support', sub: 'We are here to help' },
  { icon: Leaf, title: 'Eco-Friendly', sub: 'Sustainable packaging' },
];

const TrustBadges = () => {
  const section = useSection('trust_badges');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  // Normalize backend items (supports multiple field names)
  const backendItems =
    Array.isArray(section.items) && section.items.length
      ? section.items.map((b) => {
          const iconKey = String(
            b.icon ?? b.iconName ?? b.name ?? 'leaf'
          ).toLowerCase();
          const Icon = ICON_MAP[iconKey] || Leaf;
          return {
            icon: Icon,
            title: b.title ?? b.label ?? b.name ?? '',
            sub: b.description ?? b.sub ?? b.subtitle ?? '',
            color: b.color,
          };
        })
      : [];

  const finalBadges = backendItems.length ? backendItems : defaultBadges;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-[#eef2ed] bg-gradient-to-b from-white via-[#fbfcf9] to-white py-14 sm:py-16 lg:py-20"
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-[#e8f1e8]/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-[#f0f5ec]/60 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional eyebrow (only if backend provides) */}
        {section.eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6a4f] shadow-sm backdrop-blur-sm sm:text-xs">
              <Leaf className="h-3.5 w-3.5" />
              {section.eyebrow}
            </span>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-4">
          {finalBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={`${badge.title}-${idx}`}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 24,
                  scale: shouldReduceMotion ? 1 : 0.96,
                }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.96 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.2 } }
                }
                className="group relative flex flex-col items-center rounded-2xl border border-[#eef2ed] bg-white/70 p-4 text-center shadow-[0_2px_10px_rgba(30,60,40,0.03)] backdrop-blur-sm transition-all duration-300 hover:border-[#c9ddc9] hover:bg-white hover:shadow-[0_12px_28px_rgba(45,106,79,0.10)] sm:p-5"
              >
                {/* Icon container */}
                <div
                  style={badge.color ? { color: badge.color } : undefined}
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#eef2ed] to-[#e2ece1] transition-all duration-500 group-hover:from-[#2d6a4f] group-hover:to-[#3d8a68] group-hover:rotate-[8deg] group-hover:scale-105 sm:h-14 sm:w-14"
                >
                  <Icon
                    style={badge.color ? { color: badge.color } : undefined}
                    className="h-5 w-5 text-[#2d6a4f] transition-colors duration-500 group-hover:text-white sm:h-6 sm:w-6"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-1 text-xs font-bold tracking-tight text-[#1a3c2e] sm:text-sm">
                  {badge.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[10px] leading-relaxed text-gray-500 sm:text-xs">
                  {badge.sub}
                </p>

                {/* Hover underline accent */}
                <span className="mt-2 block h-[2px] w-0 rounded-full bg-gradient-to-r from-[#2d6a4f] to-[#9bb89b] transition-all duration-300 group-hover:w-8" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;