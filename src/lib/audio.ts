// Web Audio API ambient acoustic cafe generator
class CafeSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filterNodes: BiquadFilterNode[] = [];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public async start() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Master Gain for smooth fade-in
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.09, now + 2.5); // Warm, gentle level
    this.masterGain.connect(this.ctx.destination);

    // Warm chord: D-major add9 ambient frequencies (D2, A2, F#3, E4)
    const frequencies = [73.42, 110.0, 185.0, 329.63];

    this.oscillators = [];
    this.filterNodes = [];

    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const voiceGain = this.ctx.createGain();

      // Triangle wave creates warm woodwind/acoustic resonance
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle slow detune LFO for gentle organic warmth
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.04, now);
      lfoGain.gain.setValueAtTime(1.2, now);
      lfo.connect(osc.detune);
      lfo.start();

      // Lowpass filter to ensure buttery mellow tone (no harsh highs)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + idx * 80, now);

      voiceGain.gain.setValueAtTime(0.25 / frequencies.length, now);

      osc.connect(filter);
      filter.connect(voiceGain);
      voiceGain.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc);
      this.filterNodes.push(filter);
    });
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
      this.filterNodes = [];
      this.isPlaying = false;
    }, 1300);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const soundscape = typeof window !== 'undefined' ? new CafeSoundscapeEngine() : null;
