"use client";

import { useState, useRef, useCallback } from "react";
import { BhasiniBot, BotState } from "./BhasiniBot";
import { useMascot } from "@/context/MascotContext";
import { speakAnnouncement } from "@/lib/speech";
import { Sparkles, Heart, Hand, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

interface SignInMascotProps {
  onRefReady?: (el: HTMLDivElement | null) => void;
}

export function SignInMascot({ onRefReady }: SignInMascotProps) {
  const { character, setCharacter } = useMascot();
  const [botState, setBotState] = useState<BotState>("idle");
  const [speechMuted, setSpeechMuted] = useState(false);
  const [dialogue, setDialogue] = useState<string>(
    "Hello! I am your Cogniva companion. Tap or hover me to say hi, then pick your role below!"
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const speakGreeting = useCallback(
    (text: string) => {
      if (speechMuted) return;
      speakAnnouncement(text);
    },
    [speechMuted]
  );

  const handleMascotClick = () => {
    setBotState("happy");
    setDialogue(`"It is so wonderful to see you today! Click below whenever you are ready."`);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.35 },
      colors: ["#184735", "#059669", "#f59e0b", "#ec4899"],
    });
    speakGreeting("Hello! It is so wonderful to see you today! Let's have a peaceful day together.");

    setTimeout(() => {
      setBotState("idle");
    }, 3000);
  };

  const handleHoverEnter = () => {
    if (botState === "idle") {
      setBotState("listen");
    }
  };

  const handleHoverLeave = () => {
    if (botState === "listen") {
      setBotState("idle");
    }
  };

  return (
    <div
      ref={(el) => {
        (containerRef as any).current = el;
        if (onRefReady) onRefReady(el);
      }}
      className="relative flex flex-col items-center mb-6 z-20 group"
    >
      {/* Outer ambient aura glow */}
      <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-amber-200/50 via-emerald-200/40 to-purple-200/50 blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />

      {/* Main Interactive Mascot Container */}
      <div
        onClick={handleMascotClick}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-amber-50 via-white to-emerald-50 border-4 border-amber-200/80 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:border-emerald-400 active:scale-95 overflow-visible"
        title="Click me to interact!"
      >
        {/* Rive Animated Mascot */}
        <BhasiniBot
          state={botState}
          character={character}
          onCharacterChange={setCharacter}
          className="w-40 h-40 sm:w-48 sm:h-48"
        />

        {/* Heart Reaction Badge */}
        <div
          className={`absolute bottom-1 right-1 w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md border-2 border-white transition-all duration-300 ${
            botState === "happy"
              ? "scale-125 bg-pink-500 animate-bounce"
              : "bg-[#184735] group-hover:scale-110"
          }`}
        >
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Direct hint */}
      <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mt-3 mb-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
        <Hand className="w-3.5 h-3.5 text-[#184735] animate-pulse" />
        <span>Tap mascot to wave • Interactive Companion</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSpeechMuted(!speechMuted);
          }}
          className="ml-1 text-slate-500 hover:text-slate-900"
          title={speechMuted ? "Unmute Voice" : "Mute Voice"}
        >
          {speechMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
        </button>
      </div>

      {/* Dialogue Speech Bubble on Sign In */}
      <div className="max-w-md w-full px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md text-center text-xs sm:text-sm font-medium text-slate-800 italic relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white" />
        <p className="flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span>{dialogue}</span>
        </p>
      </div>
    </div>
  );
}
