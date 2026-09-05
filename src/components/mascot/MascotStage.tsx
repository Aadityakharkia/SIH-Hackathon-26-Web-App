"use client";

import { useState, useCallback } from "react";
import { BhasiniBot, BotState, MascotCharacter } from "./BhasiniBot";
import {
  Mic,
  Brain,
  Volume2,
  Smile,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  Heart,
  VolumeX,
  Hand,
} from "lucide-react";
import confetti from "canvas-confetti";

interface MascotStageProps {
  onStartActivity?: (activityId: string) => void;
}

const STATE_CONFIG: Record<
  BotState,
  { label: string; icon: any; color: string; desc: string; badgeColor: string }
> = {
  idle: {
    label: "Idle / Calm",
    icon: Sparkles,
    color: "text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-300",
    desc: "Peaceful, calm breathing and gentle presence",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
  },
  listen: {
    label: "Listening",
    icon: Mic,
    color: "text-emerald-700 bg-emerald-100 hover:bg-emerald-200 border-emerald-300",
    desc: "Waving and attentively listening to your voice",
    badgeColor: "bg-emerald-50 text-[#065f46] border-emerald-300",
  },
  think: {
    label: "Thinking",
    icon: Brain,
    color: "text-purple-700 bg-purple-100 hover:bg-purple-200 border-purple-300",
    desc: "Taking a thoughtful breath and reflecting",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-300",
  },
  speak: {
    label: "Speaking",
    icon: Volume2,
    color: "text-amber-700 bg-amber-100 hover:bg-amber-200 border-amber-300",
    desc: "Speaking kind words and sharing encouragement",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
  },
  happy: {
    label: "Happy",
    icon: Smile,
    color: "text-pink-700 bg-pink-100 hover:bg-pink-200 border-pink-300",
    desc: "Joyful celebration and smiling bounce",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-300",
  },
  concerned: {
    label: "Empathetic",
    icon: HeartHandshake,
    color: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 border-indigo-300",
    desc: "Gentle understanding, empathy, and patient care",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-300",
  },
};

import { useMascot } from "@/context/MascotContext";

export function MascotStage({ onStartActivity }: MascotStageProps) {
  const { character, setCharacter } = useMascot();
  const [botState, setBotState] = useState<BotState>("idle");
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false);
  const [spokenText, setSpokenText] = useState<string>(
    "Good morning! I am your companion. Today is a peaceful day for comfortable memories."
  );
  const [speechMuted, setSpeechMuted] = useState(false);

  // Web Speech API for audible companionship
  const speakAudio = useCallback(
    (text: string) => {
      if (speechMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // Gentle, clear cadence suitable for dementia care
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    },
    [speechMuted]
  );

  // Trigger state change with feedback
  const handleSelectState = (state: BotState) => {
    setBotState(state);
    if (state === "happy") {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#6c3bb8", "#059669", "#f59e0b", "#a855f7"],
      });
      speakAudio("I am so delighted to spend this wonderful day with you!");
    } else if (state === "concerned") {
      speakAudio("Take all the time you need. I am right here with you, safe and unhurried.");
    } else if (state === "listen") {
      speakAudio("I am listening. Tell me whatever is on your mind.");
    }
  };

  // Automated voice simulation cycle
  const runVoiceCompanionCycle = () => {
    if (isSimulatingVoice) return;
    setIsSimulatingVoice(true);

    // 1. Listen state: Mascot waves and listens
    setBotState("listen");
    setSpokenText(`${character} is listening to you with warm attention...`);

    // 2. Think state after 2.5s: Mascot takes deep breath
    setTimeout(() => {
      setBotState("think");
      setSpokenText(`${character} is taking a gentle breath and recalling pleasant springtime stories...`);

      // 3. Speak state after another 2s: Mascot moves mouth and speaks
      setTimeout(() => {
        setBotState("speak");
        const phrase =
          "Good morning! It is sunny and pleasant today. Would you like to chat about garden roses, or enjoy your morning tea?";
        setSpokenText(`"${phrase}"`);
        speakAudio(phrase);

        // 4. Happy state after speaking completes: Mascot celebrates
        setTimeout(() => {
          setBotState("happy");
          setSpokenText(`${character} is beaming with joy spending this morning with you!`);
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#6c3bb8", "#059669", "#ec4899"],
          });
          setIsSimulatingVoice(false);

          // 5. Return to calm idle after 4s
          setTimeout(() => {
            setBotState("idle");
            setSpokenText(`${character} is resting comfortably, ready whenever you are.`);
          }, 4000);
        }, 5000);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="relative w-full">
      {/* Background stacked shadow cards mimicking Stitch Screen #2 */}
      <div className="absolute -right-3 top-3 bottom-3 left-3 bg-slate-100/70 rounded-3xl border border-slate-200/60 -z-10 hidden sm:block" />
      <div className="absolute -right-1.5 top-1.5 bottom-1.5 left-1.5 bg-slate-50 rounded-3xl border border-slate-200/70 -z-10" />

      {/* Main Foreground Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col items-center text-center">
        {/* Recommended Badge Pill */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#065f46] text-xs font-extrabold tracking-wider uppercase">
            RECOMMENDED FOR TODAY
          </span>
          <button
            onClick={() => setSpeechMuted(!speechMuted)}
            className="p-1.5 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title={speechMuted ? "Unmute Voice Narration" : "Mute Voice Narration"}
            aria-label="Toggle Voice Audio"
          >
            {speechMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#059669]" />}
          </button>
        </div>

        {/* Main Title with curved underline accent */}
        <div className="mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Morning Reminiscence &{" "}
            <span className="relative inline-block text-slate-900">
              Calm
              <span className="absolute left-0 bottom-0 w-full h-[6px] bg-[#059669] rounded-full -mb-1 opacity-90" />
            </span>
          </h1>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          DAILY COMPANION ROUTINE • RESPONSIVE RIVE MASCOT
        </span>

        {/* Mascot Centerpiece Graphic with Ambient Glow */}
        <div className="relative w-full max-w-[380px] h-84 my-1 flex items-center justify-center">
          {/* Gentle ambient halo glow */}
          <div
            className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
              botState === "listen"
                ? "bg-emerald-300/40 scale-110"
                : botState === "think"
                ? "bg-purple-300/40 scale-105"
                : botState === "speak"
                ? "bg-amber-300/40 scale-110"
                : botState === "happy"
                ? "bg-pink-300/40 scale-115"
                : botState === "concerned"
                ? "bg-indigo-300/40"
                : "bg-gradient-to-tr from-emerald-100/60 via-purple-100 to-amber-50"
            }`}
          />

          {/* Soft container frame for Responsive Mascot */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-b from-purple-50/70 via-white/80 to-purple-100/60 border-2 border-purple-100/80 shadow-md flex items-center justify-center overflow-visible" onMouseEnter={() => setBotState("listen")} onMouseLeave={() => setBotState("idle")} title="Hover to wave">
            {/* Rive Animated BhasiniBot with Responsive Mascot */}
            <BhasiniBot
              state={botState}
              character={character}
              onCharacterChange={setCharacter}
              className="w-full h-full"
            />

            {/* Status Heart Badge */}
            <div
              className={`absolute bottom-2 right-2 w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md border-2 border-white transition-transform duration-300 ${
                botState === "happy" ? "scale-125 bg-pink-500 animate-pulse" : "bg-[#059669]"
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>

        {/* Direct interactive hint */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 mb-2 font-medium">
          <Hand className="w-3.5 h-3.5 text-[#6c3bb8]" />
          <span>Tip: Click directly on {character} to say hello and make them wave!</span>
        </div>

        {/* Dynamic Companion Dialogue Bubble */}
        <div className="w-full max-w-lg mt-2 mb-4 p-4 rounded-2xl bg-[#faf7fc] border border-purple-100 text-left flex items-start gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6c3bb8] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
            {character}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-[#6c3bb8] uppercase tracking-wider">
                Companion Speech
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${STATE_CONFIG[botState].badgeColor}`}
              >
                {STATE_CONFIG[botState].label}
              </span>
            </div>
            <p className="text-[15px] font-medium text-slate-800 leading-relaxed italic">
              {spokenText}
            </p>
          </div>
        </div>

        {/* Interactive Node Status Row */}
        <div className="w-full max-w-lg mb-5 flex items-center justify-between px-4 py-3 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-[#059669] flex items-center justify-center shadow-xs">
                <span className="w-3 h-3 rounded-full bg-[#059669] animate-pulse" />
              </div>
            </div>
            <span className="font-bold text-base text-slate-800 text-left">
              Today&apos;s Conversation: Memories of Spring
            </span>
          </div>
          <button
            onClick={() => handleSelectState("listen")}
            className="w-7 h-7 rounded-full bg-emerald-100 hover:bg-emerald-200 text-[#059669] flex items-center justify-center text-xs font-bold transition-transform active:scale-95"
            title="Start Conversation"
          >
            ▶
          </button>
        </div>

        {/* Primary Action Button (Start Morning Conversation) */}
        <div className="w-full max-w-lg flex flex-col items-center gap-3">
          <button
            disabled={isSimulatingVoice}
            onClick={runVoiceCompanionCycle}
            className={`w-full py-4 px-8 rounded-full text-white font-bold text-lg shadow-sm hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-3 ${
              isSimulatingVoice
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-[#059669] hover:bg-[#047857]"
            }`}
          >
            <Mic className={`w-5 h-5 ${isSimulatingVoice ? "animate-pulse" : ""}`} />
            <span>{isSimulatingVoice ? "Voice Session in Progress..." : `Speak with ${character}`}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="text-[#059669] font-bold">✓</span> Gentle voice-guided conversation • Simple 1-tap start
          </p>
        </div>

      </div>
    </div>
  );
}
