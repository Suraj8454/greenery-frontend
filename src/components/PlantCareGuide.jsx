import React, { useRef, useState } from 'react';
import useSection from '../hooks/useSection';
import { mediaUrl } from '../utils/api';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Leaf, Sun, Droplets, Wind, Sprout, ChevronRight } from 'lucide-react';

const plantTypes = [
  {
    id: 'indoor',
    name: 'Indoor',
    icon: Sprout,
    tips: [
      { icon: Sun, label: 'Light', value: 'Bright, indirect' },
      { icon: Droplets, label: 'Water', value: 'Once a week' },
      { icon: Wind, label: 'Humidity', value: 'Moderate' },
    ],
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    icon: Sun,
    tips: [
      { icon: Sun, label: 'Light', value: 'Full sunlight' },
      { icon: Droplets, label: 'Water', value: 'Daily' },
      { icon: Wind, label: 'Humidity', value: 'Any' },
    ],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'succulent',
    name: 'Succulents',
    icon: Leaf,
    tips: [
      { icon: Sun, label: 'Light', value: 'Direct sun' },
      { icon: Droplets, label: 'Water', value: 'Every 2 weeks' },
      { icon: Wind, label: 'Humidity', value: 'Low' },
    ],
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800',
  },
];

const PlantCareGuide = () => {
  const section = useSection('plant_story');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState('indoor');

  const sourceItems = Array.isArray(section.items) && section.items.length ? section.items : null;
  const dynamicPlantTypes = sourceItems ? sourceItems.map((item, index) => {
    const fallbackPlant = plantTypes[index % plantTypes.length];
    const name = item.name || item.title || fallbackPlant.name;
    const id = item.id || String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const icon = String(item.icon || '').toLowerCase() === 'sun' ? Sun : String(item.icon || '').toLowerCase() === 'leaf' ? Leaf : Sprout;
    return { ...fallbackPlant, ...item, id, name, icon, image: mediaUrl(item.image) || (index === 0 && section.image ? mediaUrl(section.image) : item.image) || fallbackPlant.image, tips: Array.isArray(item.tips) && item.tips.length ? item.tips.map(t => ({ ...t, icon: String(t.icon || '').toLowerCase() === 'droplets' ? Droplets : String(t.icon || '').toLowerCase() === 'wind' ? Wind : Sun })) : fallbackPlant.tips };
  }) : plantTypes;
  const activePlant = dynamicPlantTypes.find((p) => p.id === active) || dynamicPlantTypes[0] || plantTypes[0];

  return (
    <section
      ref={ref}
      className="relative py-15 md:py-14 bg-gradient-to-b from-[#fcfbf7] via-[#f8faf6] to-white overflow-hidden"
    >
      {/* Soft background blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2d6a4f]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#a3d9b1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — same font, modern badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#2d6a4f]/15 shadow-sm text-[#2d6a4f] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
            <Leaf className="w-3 h-3" />
            {section.eyebrow || 'Plant Care Guide'}
          </div>
          <h2 style={section.color ? { color: section.color } : undefined} className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1a3c2e] leading-tight">
            {section.title || <>Every plant has a <span className="italic font-light text-[#2d6a4f]">story</span></>}
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            {section.description || 'Pick your plant type and get personalised care tips in seconds.'}
          </p>
        </motion.div>

        {/* Tabs — modern glass pill */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {dynamicPlantTypes.map((type) => {
            const Icon = type.icon;
            const isActive = active === type.id || (!dynamicPlantTypes.some((p) => p.id === active) && type.id === dynamicPlantTypes[0]?.id);
            return (
              <button
                key={type.id}
                onClick={() => setActive(type.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold transition-colors duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-[#2d6a4f] bg-white/60 backdrop-blur-sm border border-gray-200/70'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCareTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#1a3c2e] to-[#2d6a4f] rounded-full shadow-md"
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Card — modern container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/90 backdrop-blur-sm rounded-[32px] border border-gray-100 shadow-[0_8px_40px_rgba(45,106,79,0.08)] overflow-hidden"
        >
          {/* Image — clean frame with soft overlay */}
          <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden bg-[#f2f6f2]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={activePlant.image}
                  alt={activePlant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c2e]/25 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Small floating label on image */}
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/70">
              <Leaf className="w-3 h-3 text-[#2d6a4f]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a3c2e]">
                {activePlant.name}
              </span>
            </div>
          </div>

          {/* Tips */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[10px] text-[#2d6a4f] font-bold tracking-[0.3em] uppercase mb-2">
                  Care Guide
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1a3c2e] mb-6">
                  For your{' '}
                  <span className="italic text-[#2d6a4f]">{activePlant.name}</span> plants
                </h3>

                {/* Tips list — modern rows */}
                <div className="space-y-2 mb-8">
                  {activePlant.tips.map((tip, idx) => {
                    const TipIcon = tip.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-4 p-3 rounded-2xl bg-[#fafcf9] hover:bg-[#f2f7f2] border border-transparent hover:border-[#2d6a4f]/10 transition-all duration-300 group"
                      >
                        <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-[#2d6a4f] flex items-center justify-center shrink-0 shadow-sm transition-all duration-300">
                          <TipIcon className="w-5 h-5 text-[#2d6a4f] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-gray-500 uppercase tracking-[0.18em] font-semibold mb-0.5">
                            {tip.label}
                          </p>
                          <p className="text-sm font-bold text-[#1a3c2e] truncate">
                            {tip.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA — softer */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group inline-flex items-center gap-2 bg-[#1a3c2e] hover:bg-[#2d6a4f] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300 shadow-sm hover:shadow-lg"
                >
                  {section.button_text || `Shop ${activePlant.name} Plants`}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlantCareGuide;