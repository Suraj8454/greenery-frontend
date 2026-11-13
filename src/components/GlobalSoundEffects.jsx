import React, { useEffect } from 'react';
import soundManager from '../utils/soundManager';

const GlobalSoundEffects = () => {
  useEffect(() => {
    // Enable sound on first user interaction
    const enableSound = () => {
      soundManager.init();
    };
    window.addEventListener('click', enableSound, { once: true });
    window.addEventListener('touchstart', enableSound, { once: true });
    window.addEventListener('keydown', enableSound, { once: true });

    // ============ CLICK HANDLER (ONLY) ============
    const handleClick = (e) => {
      const target = e.target;

      // Check if clicking on interactive element
      const interactive = target.closest(
        'a, button, [role="button"], [data-sound-click]'
      );

      if (!interactive) return;

      // Skip if element has data-sound="off"
      if (interactive.dataset.sound === 'off') return;

      // Play chime on click
      soundManager.play('chime', { stopAfter: 1200 });
    };

    // ============ ATTACH LISTENER ============
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', enableSound);
      window.removeEventListener('touchstart', enableSound);
      window.removeEventListener('keydown', enableSound);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default GlobalSoundEffects;