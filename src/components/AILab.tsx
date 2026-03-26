import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Mic, Volume2, Sparkles, Loader2, Play, Square, Download, Trash2, Key } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

const ASPECT_RATIOS = [
  { label: '1:1', value: '1:1' },
  { label: '2:3', value: '2:3' },
  { label: '3:2', value: '3:2' },
  { label: '3:4', value: '3:4' },
  { label: '4:3', value: '4:3' },
  { label: '9:16', value: '9:16' },
  { label: '16:9', value: '16:9' },
  { label: '21:9', value: '21:9' },
];

const AILab = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'transcribe' | 'tts'>('image');
  const [hasKey, setHasKey] = useState(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);

  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Transcribe State
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // TTS State
  const [ttsText, setTtsText] = useState('');
  const [isGeneratingTTS, setIsGeneratingTTS] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
    setIsCheckingKey(false);
  };

  const handleSelectKey = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: { parts: [{ text: imagePrompt }] },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: "1K"
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      if (error instanceof Error && error.message.includes('Requested entity was not found')) {
        setHasKey(false);
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          transcribeAudio(base64Audio);
        };
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording failed:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (base64Data: string) => {
    setIsTranscribing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: "Transcribe this audio accurately." },
            { inlineData: { data: base64Data, mimeType: 'audio/webm' } }
          ]
        }
      });
      setTranscription(response.text || 'No transcription available.');
    } catch (error) {
      console.error('Transcription failed:', error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const generateTTS = async () => {
    if (!ttsText) return;
    setIsGeneratingTTS(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: ttsText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binary = atob(base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error('TTS failed:', error);
    } finally {
      setIsGeneratingTTS(false);
    }
  };

  if (isCheckingKey) return null;

  return (
    <section id="ai-lab" className="py-24 bg-ink text-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl mb-4 text-accent">AI LAB</h2>
            <p className="text-paper/40 uppercase tracking-[0.3em] text-sm font-bold">Creative Power Tools</p>
          </div>
          
          {!hasKey && (
            <button 
              onClick={handleSelectKey}
              className="flex items-center gap-3 bg-accent text-ink px-6 py-3 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <Key className="w-5 h-5" />
              Select API Key to Unlock
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Tabs */}
          <div className="space-y-4">
            {[
              { id: 'image', icon: ImageIcon, label: 'Image Gen', desc: 'Text to visual' },
              { id: 'transcribe', icon: Mic, label: 'Transcribe', desc: 'Voice to text' },
              { id: 'tts', icon: Volume2, label: 'Speech', desc: 'Text to voice' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-6 border transition-all group ${
                  activeTab === tab.id 
                    ? 'bg-accent border-accent text-ink' 
                    : 'bg-paper/5 border-paper/10 hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-ink' : 'text-accent'}`} />
                  <span className="font-display text-xl uppercase tracking-tight">{tab.label}</span>
                </div>
                <p className={`text-xs uppercase tracking-widest opacity-60 ${activeTab === tab.id ? 'text-ink' : 'text-paper'}`}>
                  {tab.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-paper/5 border border-paper/10 p-8 min-h-[500px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-accent">Prompt</label>
                    <textarea 
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe the image you want to create..."
                      className="w-full bg-paper/5 border border-paper/10 p-4 font-mono text-sm outline-none focus:border-accent transition-colors min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-accent">Aspect Ratio</label>
                    <div className="flex flex-wrap gap-2">
                      {ASPECT_RATIOS.map((ratio) => (
                        <button
                          key={ratio.value}
                          onClick={() => setAspectRatio(ratio.value)}
                          className={`px-4 py-2 text-[10px] font-bold border transition-all ${
                            aspectRatio === ratio.value 
                              ? 'bg-accent text-ink border-accent' 
                              : 'bg-transparent border-paper/20 hover:border-accent'
                          }`}
                        >
                          {ratio.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={generateImage}
                    disabled={isGeneratingImage || !imagePrompt || !hasKey}
                    className="w-full bg-accent text-ink py-4 font-display text-xl uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                  >
                    {isGeneratingImage ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    {isGeneratingImage ? 'Generating...' : 'Create Visual'}
                  </button>

                  {generatedImage && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <img src={generatedImage} alt="AI Generated" className="w-full h-auto border border-paper/10" />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={generatedImage} download="ai-visual.png" className="p-3 bg-accent text-ink hover:scale-110 transition-transform">
                          <Download className="w-5 h-5" />
                        </a>
                        <button onClick={() => setGeneratedImage(null)} className="p-3 bg-ink text-paper hover:bg-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'transcribe' && (
                <motion.div
                  key="transcribe"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 flex flex-col items-center justify-center h-full"
                >
                  <div className="text-center space-y-4">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
                      isRecording ? 'bg-red-500/20 scale-110' : 'bg-accent/10'
                    }`}>
                      <button 
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={!hasKey}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                          isRecording ? 'bg-red-500 animate-pulse' : 'bg-accent text-ink hover:scale-110'
                        } disabled:opacity-50 disabled:scale-100`}
                      >
                        {isRecording ? <Square className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                      </button>
                    </div>
                    <p className="font-display text-2xl uppercase tracking-tight">
                      {isRecording ? 'Listening...' : 'Tap to Record'}
                    </p>
                    <p className="text-sm text-paper/40 uppercase tracking-widest">
                      Record your thoughts and let AI transcribe them
                    </p>
                  </div>

                  {isTranscribing && (
                    <div className="flex items-center gap-3 text-accent font-mono text-xs animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      TRANSCRIBING AUDIO...
                    </div>
                  )}

                  {transcription && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full bg-paper/5 border border-paper/10 p-6 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Transcription</span>
                        <button onClick={() => setTranscription('')} className="text-paper/40 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-lg font-light leading-relaxed italic">"{transcription}"</p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'tts' && (
                <motion.div
                  key="tts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-accent">Text to Speak</label>
                    <textarea 
                      value={ttsText}
                      onChange={(e) => setTtsText(e.target.value)}
                      placeholder="Type something for the AI to say..."
                      className="w-full bg-paper/5 border border-paper/10 p-4 font-mono text-sm outline-none focus:border-accent transition-colors min-h-[150px] resize-none"
                    />
                  </div>

                  <button 
                    onClick={generateTTS}
                    disabled={isGeneratingTTS || !ttsText || !hasKey}
                    className="w-full bg-accent text-ink py-4 font-display text-xl uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                  >
                    {isGeneratingTTS ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
                    {isGeneratingTTS ? 'Synthesizing...' : 'Generate Speech'}
                  </button>

                  {audioUrl && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 bg-accent/10 border border-accent/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent text-ink flex items-center justify-center rounded-full">
                          <Play className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-display uppercase tracking-tight">Audio Ready</p>
                          <p className="text-[10px] uppercase tracking-widest text-accent">Voice: Kore (Cheerful)</p>
                        </div>
                      </div>
                      <audio controls src={audioUrl} className="hidden" id="tts-audio" />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => (document.getElementById('tts-audio') as HTMLAudioElement).play()}
                          className="px-6 py-2 bg-accent text-ink font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
                        >
                          Play Now
                        </button>
                        <button onClick={() => setAudioUrl(null)} className="p-2 text-paper/40 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILab;
