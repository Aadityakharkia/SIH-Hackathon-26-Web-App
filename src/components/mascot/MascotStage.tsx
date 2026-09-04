"use client";

import { useState } from "react";
import { Volume2, Heart, Sparkles, Sun } from "lucide-react";
import { speakAnnouncement } from "@/lib/speech";

export function MascotStage() {
  const [speechBubble, setSpeechBubble] = useState(
    "Good morning, Eleanor! It's a sunny, gentle day. Would you like to stroll through the garden or listen to cozy tunes?"
  );

  const greetings = [
    "Good morning, Eleanor! It's a sunny, gentle day. Would you like to stroll through the garden or listen to cozy tunes?",
    "Take your time today. We're here together having a quiet, comfortable morning.",
    "Did you know? Walking in the fresh garden air brings gentle smiles and bright energy!",
    "Your garden flowers are blooming beautifully today. Shall we look at photos?",
  ];

  const handleMascotTap = () => {
    const nextGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setSpeechBubble(nextGreeting);
    speakAnnouncement(nextGreeting);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#fcfaf6] via-white to-[#f4f0e6] rounded-3xl p-6 lg:p-8 border border-[#e7e2d7] shadow-sm relative overflow-hidden flex flex-col items-center justify-between min-h-[420px]">
      {/* Background Ambient Warm Lights */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-100/60 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>

      {/* Top Status Bar */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full text-xs font-bold shadow-xs">
          <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
          <span>Gentle Care Mode Active</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
          <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Pip Companion</span>
        </div>
      </div>

      {/* Center Mascot & Interactive Halo */}
      <div className="my-6 relative flex flex-col items-center z-10 cursor-pointer group" onClick={handleMascotTap}>
        <div className="w-44 h-44 rounded-full bg-[#fdecdb]/80 flex items-center justify-center relative shadow-inner animate-mascot-bob group-hover:scale-105 transition-all duration-300">
          <div className="w-36 h-36 rounded-full bg-[#7752b5] flex flex-col items-center justify-center shadow-lg text-white text-center p-4">
            <span className="text-4xl mb-1">🦦</span>
            <span className="font-bold text-lg font-serif">Pip</span>
            <span className="text-[10px] text-purple-200 uppercase tracking-widest font-semibold">Your Companion</span>
          </div>
        </div>
        <span className="mt-3 text-xs font-semibold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 shadow-xs group-hover:bg-purple-100 transition-colors">
          Tap Pip to hear a message 💬
        </span>
      </div>

      {/* Bottom Companion Speech Bubble */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-md relative z-10 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs text-purple-800 uppercase tracking-wider">Pip Companion Says</span>
            <button
              onClick={() => speakAnnouncement(speechBubble)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen</span>
            </button>
          </div>
          <p className="text-base text-slate-800 leading-relaxed font-medium">"{speechBubble}"</p>
        </div>
      </div>
    </div>
  );
}
