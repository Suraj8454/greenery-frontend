import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { X, Volume2, VolumeX } from 'lucide-react';
import soundManager from '../utils/soundManager';
import { useSiteSettings } from '../hooks/useSiteSettings';

const FloatingWhatsApp = () => {
  const settings = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((muted) => setIsMuted(muted));
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      soundManager.play('birds', { stopAfter: 2500 });
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleClick = () => {
    soundManager.play('chime', { stopAfter: 1500 });
  };

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    soundManager.toggleMute();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[999] flex flex-col items-center gap-3"
        >
          
          {/* ✅ Sound Toggle - Centered above WhatsApp button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={toggleMute}
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white hover:border-[#2d6a4f] transition-all duration-300"
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-full bg-[#2d6a4f]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}

            {/* Small animated dot indicating sound status */}
            <motion.span
              animate={
                !isMuted
                  ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }
                  : { scale: 1, opacity: 0.3 }
              }
              transition={{ duration: 1.5, repeat: !isMuted ? Infinity : 0, ease: 'easeInOut' }}
              className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                isMuted ? 'bg-gray-400' : 'bg-[#25D366]'
              }`}
            />
          </motion.button>

          {/* WhatsApp Button Row */}
          <div className="flex items-center gap-3">
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative bg-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-2 max-w-[220px]"
                >
                  <div>
                    <p className="text-xs font-bold text-[#1a3c2e]">Need help? 🌿</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Chat with us on WhatsApp
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close tooltip"
                    data-sound="off"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {/* Arrow */}
                  <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${String(settings.whatsapp_number || '').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/40"
              aria-label="Chat on WhatsApp"
            >
              {/* Pulse ring */}
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-[#25D366]"
              />
              <FaWhatsapp className="w-7 h-7 text-white relative z-10" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;