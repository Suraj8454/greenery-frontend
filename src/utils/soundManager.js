// src/utils/soundManager.js

class SoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.isInitialized = false;
    this.listeners = [];

    // Sound file paths
    this.paths = {
      chime: '/sounds/chime.mp3',
      leaves: '/sounds/leaves.mp3',
      birds: '/sounds/birds.mp3',
      breeze: '/sounds/breeze.mp3',
    };
  }

  // Initialize all audio objects (call once on app mount)
  init() {
    if (this.isInitialized) return;
    if (typeof window === 'undefined') return; // SSR safety

    Object.entries(this.paths).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = 1.0;
      audio.preload = 'auto';
      this.sounds[key] = audio;
    });

    this.isInitialized = true;
  }

  // Play a sound by name
  play(name, { loop = false, stopAfter = null } = {}) {
    if (this.isMuted) return;
    const audio = this.sounds[name];
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.loop = loop;

      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (stopAfter) {
              setTimeout(() => {
                try {
                  audio.pause();
                  audio.currentTime = 0;
                } catch (e) {}
              }, stopAfter);
            }
          })
          .catch((err) => {
            // Silent fail (autoplay blocked)
          });
      }
    } catch (e) {
      // Silent fail
    }
  }

  // Stop a specific sound
  stop(name) {
    const audio = this.sounds[name];
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  }

  // Stop all sounds
  stopAll() {
    Object.keys(this.sounds).forEach((key) => this.stop(key));
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stopAll();
    this.notifyListeners();
    return this.isMuted;
  }

  setMuted(value) {
    this.isMuted = value;
    if (value) this.stopAll();
    this.notifyListeners();
  }

  getMuted() {
    return this.isMuted;
  }

  // Subscribe to mute state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isMuted));
  }
}

// Export singleton
const soundManager = new SoundManager();
export default soundManager;