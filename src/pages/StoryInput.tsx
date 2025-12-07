import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Square, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { VoiceRecognizer } from '../services/audioRecorder';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';

export const StoryInput: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCharacter, setRecordedTopic } = useStore();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognizerRef = useRef<VoiceRecognizer | null>(null);

  const toggleRecording = () => {
    setError(null);

    if (isRecording) {
      // Stop recording
      if (recognizerRef.current) {
        const finalText = recognizerRef.current.stop();
        if (finalText) {
          setTranscript(finalText);
        }
      }
      setIsRecording(false);
      recognizerRef.current = null;
    } else {
      // Start recording
      try {
        if (!VoiceRecognizer.isSupported()) {
          throw new Error('您的浏览器不支持语音识别，请使用 Chrome 或 Edge 浏览器');
        }

        recognizerRef.current = new VoiceRecognizer();
        
        recognizerRef.current.start(
          // On transcript update
          (text) => {
            setTranscript(text);
          },
          // On error
          (errorMsg) => {
            setError(errorMsg);
            setIsRecording(false);
            recognizerRef.current = null;
          },
          // On end
          () => {
            setIsRecording(false);
          }
        );

        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recognition:', err);
        setError(err instanceof Error ? err.message : '无法启动语音识别');
        recognizerRef.current = null;
      }
    }
  };

  const handleCreate = () => {
    if (!transcript) return;
    setRecordedTopic(transcript);
    navigate('/create/generating');
  };

  return (
    <div className="h-full bg-gradient-to-b from-candy-pink/10 to-white p-6 flex flex-col">
       <header className="flex items-center gap-4 mb-6 relative z-10">
        <AppButton variant="ghost" size="sm" onClick={() => navigate(-1)} icon={<ArrowLeft size={24} />} className="!p-2 rounded-full bg-white/80" />
        <div className="flex items-center gap-2 bg-white/60 p-2 pr-4 rounded-full backdrop-blur-sm border border-white/40">
            <img src={selectedCharacter?.avatarUrl} className="w-8 h-8 rounded-full bg-gray-100" alt="char" />
            <h1 className="text-sm font-bold font-bubble text-candy-text">For {selectedCharacter?.name?.split(' ')[0]}...</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-h-[600px] my-auto">
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-bubble text-candy-text">What happens next?</h2>
            <p className="text-gray-400 font-body">Tap the microphone to tell your story.</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3 max-w-sm"
          >
            <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
            <p className="text-red-700 font-body text-sm">{error}</p>
          </motion.div>
        )}

        {/* Story Topic Input Area */}
        <AppCard variant="glass" className="w-full p-6 flex flex-col gap-4 text-center relative max-w-sm mx-auto">
            <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-candy-blue uppercase tracking-wide">Story Topic</label>
                <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Tell me what happens... or use the microphone below!"
                    className="w-full min-h-[140px] p-4 border-2 border-candy-blue/20 bg-white/80 rounded-2xl text-lg font-bubble leading-relaxed text-candy-text placeholder-gray-300 focus:border-candy-blue focus:outline-none transition-all resize-none"
                    disabled={isRecording}
                />
            </div>
            
            {/* Waveform Animation Mock */}
            {isRecording && (
                <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1.5 bg-gradient-to-t from-white/90 via-white/50 to-transparent pb-4 rounded-b-3xl">
                    {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ height: [12, 40, 12] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05, ease: "easeInOut" }}
                            className="w-2 bg-gradient-to-t from-candy-pink to-candy-purple rounded-full"
                        />
                    ))}
                </div>
            )}
        </AppCard>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 w-full relative z-20">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-[0_10px_40px_-5px_rgba(0,0,0,0.1)] border-[6px] transition-all bg-white relative ${
                    isRecording 
                    ? 'border-red-100' 
                    : 'border-white'
                }`}
            >
                <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                    ? 'bg-red-500 scale-75 rounded-2xl shadow-inner'
                    : 'bg-gradient-to-br from-candy-blue to-blue-400 scale-90 shadow-lg hover:brightness-105'
                }`}>
                     {isRecording ? <Square size={28} fill="currentColor" className="text-white" /> : <Mic size={36} className="text-blue-900" />}
                </div>
            </motion.button>
            
            <p className="text-gray-400 font-bubble text-sm bg-white/50 px-4 py-1 rounded-full">
                {isRecording ? 'Tap to stop' : 'Tap to speak'}
            </p>
        </div>
      </div>

      {transcript && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
             className="w-full max-w-sm mx-auto"
        >
             <AppButton 
                onClick={handleCreate}
                variant="primary"
                size="xl"
                className="w-full shadow-candy-blue/30"
                icon={<Sparkles size={24} className="text-blue-800" />}
            >
                Create Story
            </AppButton>
        </motion.div>
      )}
    </div>
  );
};
