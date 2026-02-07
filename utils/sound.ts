
export const playTempleBell = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioCtx.currentTime;

    // Main strike frequency (approx C5)
    const strikeFreq = 523.25;

    // Create multiple oscillators for a rich bell timbre (overtones)
    const partials = [1, 2, 3.01, 4.5, 5.2, 7];
    const gains = [1, 0.4, 0.2, 0.1, 0.05, 0.02];

    partials.forEach((partial, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(strikeFreq * partial, now);

      // Bell envelope: sharp attack, long exponential decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[i] * 0.2, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 3);
    });
  } catch (e) {
    console.warn("Temple bell playback failed", e);
  }
};

export const playChime = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.warn("Chime failed", e);
  }
};
