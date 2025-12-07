/**
 * Text-to-Speech Service
 * Uses browser's Web Speech API to read text aloud
 */

export class TextToSpeech {
  private synthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isPaused: boolean = false;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  /**
   * Speak the given text
   */
  speak(text: string, options?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onStart?: () => void;
  }): void {
    // Cancel any ongoing speech
    this.stop();

    // Create new utterance
    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    this.utterance.lang = options?.lang || 'zh-CN'; // Chinese by default
    this.utterance.rate = options?.rate || 0.9; // Slightly slower for kids
    this.utterance.pitch = options?.pitch || 1.1; // Slightly higher pitch for friendliness
    this.utterance.volume = options?.volume || 1.0;

    // Set up event handlers
    if (options?.onEnd) {
      this.utterance.onend = options.onEnd;
    }
    
    if (options?.onStart) {
      this.utterance.onstart = options.onStart;
    }

    // Speak
    this.synthesis.speak(this.utterance);
    this.isPaused = false;
  }

  /**
   * Pause current speech
   */
  pause(): void {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
      this.isPaused = true;
    }
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume();
      this.isPaused = false;
    }
  }

  /**
   * Stop current speech
   */
  stop(): void {
    this.synthesis.cancel();
    this.utterance = null;
    this.isPaused = false;
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  /**
   * Check if currently paused
   */
  isPausedState(): boolean {
    return this.isPaused;
  }

  /**
   * Get available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }

  /**
   * Set a specific voice
   */
  setVoice(voiceName: string): void {
    if (this.utterance) {
      const voices = this.getVoices();
      const voice = voices.find(v => v.name === voiceName);
      if (voice) {
        this.utterance.voice = voice;
      }
    }
  }

  /**
   * Check if browser supports TTS
   */
  static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}
