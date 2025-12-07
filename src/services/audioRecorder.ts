/**
 * Speech Recognition Service
 * Uses browser's Web Speech API for real-time speech-to-text
 */

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export class VoiceRecognizer {
  private recognition: SpeechRecognition | null = null;
  private transcript: string = '';
  private onTranscriptUpdate?: (text: string) => void;
  private onError?: (error: string) => void;
  private onEnd?: () => void;

  constructor() {
    // Check for browser support
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      console.warn('Web Speech API not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognitionAPI();
    this.setupRecognition();
  }

  private setupRecognition() {
    if (!this.recognition) return;

    // Configure recognition
    this.recognition.continuous = true; // Keep listening until stopped
    this.recognition.interimResults = true; // Get partial results
    this.recognition.lang = 'zh-CN'; // Chinese language
    this.recognition.maxAlternatives = 1;

    // Handle results
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the full transcript
      if (finalTranscript) {
        this.transcript += finalTranscript;
      }

      // Notify listeners with current transcript (final + interim)
      const currentText = this.transcript + interimTranscript;
      if (this.onTranscriptUpdate && currentText.trim()) {
        this.onTranscriptUpdate(currentText.trim());
      }
    };

    // Handle errors
    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      
      let errorMessage = '语音识别出错';
      switch (event.error) {
        case 'no-speech':
          errorMessage = '没有检测到语音，请重试';
          break;
        case 'audio-capture':
          errorMessage = '无法访问麦克风';
          break;
        case 'not-allowed':
          errorMessage = '麦克风权限被拒绝';
          break;
        case 'network':
          errorMessage = '网络错误，请检查连接';
          break;
      }

      if (this.onError) {
        this.onError(errorMessage);
      }
    };

    // Handle end
    this.recognition.onend = () => {
      if (this.onEnd) {
        this.onEnd();
      }
    };
  }

  /**
   * Start voice recognition
   */
  start(
    onUpdate: (text: string) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): void {
    if (!this.recognition) {
      onError('您的浏览器不支持语音识别功能，请使用 Chrome 或 Edge 浏览器');
      return;
    }

    this.transcript = '';
    this.onTranscriptUpdate = onUpdate;
    this.onError = onError;
    this.onEnd = onEnd;

    try {
      this.recognition.start();
      console.log('🎤 Voice recognition started');
    } catch (error) {
      console.error('Failed to start recognition:', error);
      onError('无法启动语音识别');
    }
  }

  /**
   * Stop voice recognition and return final transcript
   */
  stop(): string {
    if (this.recognition) {
      this.recognition.stop();
      console.log('🎤 Voice recognition stopped');
    }
    return this.transcript.trim();
  }

  /**
   * Cancel recognition
   */
  cancel(): void {
    if (this.recognition) {
      this.recognition.abort();
    }
    this.transcript = '';
  }

  /**
   * Check if browser supports speech recognition
   */
  static isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
}

