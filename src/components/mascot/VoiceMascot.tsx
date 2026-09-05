"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BhasiniBot, BotState } from "./BhasiniBot";
import { Mic, Volume2, Sparkles, X, Check, Radio } from "lucide-react";
import confetti from "canvas-confetti";

export function VoiceMascot() {
  const pathname = usePathname();
  const [voiceState, setVoiceState] = useState<BotState>("idle");
  const [isVoiceAgentActive, setIsVoiceAgentActive] = useState<boolean>(false);
  const [speechTranscript, setSpeechTranscript] = useState<string>("");
  const [agentResponse, setAgentResponse] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const activeStreamRef = useRef<MediaStream | null>(null);
  const recognitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Route awareness
  const isWelcome = pathname === "/sign-in" || pathname === "/welcome";
  const isArcade =
    pathname === "/arcade" ||
    pathname === "/game-arena" ||
    Boolean(pathname?.startsWith("/arcade")) ||
    Boolean(pathname?.startsWith("/game-arena"));

  // Web Speech API Voice synthesizer
  const speakUtterance = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
      }
    };
  }, []);

  // Intelligent conversational reply generator
  const generateAgentReply = (userQuery: string): string => {
    const q = userQuery.toLowerCase();
    if (q.includes("memory") || q.includes("garden") || q.includes("card") || q.includes("match")) {
      return "The Memory Garden Match is wonderful! It features gentle flower card matching with soothing audio. Would you like to start it?";
    }
    if (q.includes("art") || q.includes("color") || q.includes("tapestry")) {
      return "Art & Colors Tapestry is very relaxing! You can explore soft textiles and calm color patterns.";
    }
    if (q.includes("music") || q.includes("radio") || q.includes("song")) {
      return "Harmonious Music plays familiar comforting melodies that bring back nostalgic feelings.";
    }
    if (q.includes("help") || q.includes("how to") || q.includes("play")) {
      return "I'm your game buddy! Pick any game card in the arcade corner, take all the time you need, and have fun!";
    }
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("namaste")) {
      return "Hello! I am your companion mascot. It's so lovely to be in the Arcade with you. What would you like to explore?";
    }
    if (q.includes("who are you") || q.includes("your name")) {
      return "I am Orson, your cheerful Cogniva care companion! I am always here to play and chat with you.";
    }
    return `I heard you! You're doing wonderful today. I'm right here with you cheering you on in the Arcade!`;
  };

  // Process user speech & trigger companion reply
  const processUserSpeech = (query: string) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((t) => t.stop());
      activeStreamRef.current = null;
    }

    // 1. Thinking state
    setVoiceState("think");
    const reply = generateAgentReply(query || "Hello companion");
    setAgentResponse(reply);

    setTimeout(() => {
      // 2. Speaking state: mouth moves & speech synthesis plays
      setVoiceState("speak");
      speakUtterance(reply, () => {
        // 3. Happy state upon completion
        setVoiceState("happy");
        confetti({
          particleCount: 25,
          spread: 50,
          origin: isWelcome ? { y: 0.5, x: 0.5 } : { y: 0.85, x: 0.88 },
          colors: ["#6c3bb8", "#059669", "#f59e0b", "#ec4899"],
        });

        setTimeout(() => {
          setVoiceState("idle");
          setTimeout(() => {
            setIsVoiceAgentActive(false);
            setSpeechTranscript("");
            setAgentResponse("");
          }, 4000);
        }, 2200);
      });
    }, 1400);
  };

  // Main Click Handler: Starts Voice Agent Mode
  const startVoiceAgent = async () => {
    // If speaking, allow user to interrupt and start a new listening session
    if (voiceState === "speak") {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }

    setIsVoiceAgentActive(true);
    setVoiceState("listen");
    setSpeechTranscript("");
    setAgentResponse("");

    // 1. Request microphone stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      activeStreamRef.current = stream;
    } catch (err) {
      console.warn("Microphone access declined or unavailable", err);
    }

    // 2. Start Web Speech Recognition if supported
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            setSpeechTranscript(transcript);

            if (event.results[current].isFinal) {
              if (recognitionTimeoutRef.current) {
                clearTimeout(recognitionTimeoutRef.current);
              }
              processUserSpeech(transcript);
            }
          };

          recognition.onerror = (event: any) => {
            console.debug("Speech recognition event:", event.error);
          };

          recognition.onend = () => {
            // If ended without final, process whatever was captured or default
            if (voiceState === "listen") {
              if (recognitionTimeoutRef.current) {
                clearTimeout(recognitionTimeoutRef.current);
              }
              recognitionTimeoutRef.current = setTimeout(() => {
                processUserSpeech(speechTranscript || "Hello mascot");
              }, 800);
            }
          };

          recognition.start();

          // Auto-timeout after 4.5s if user stays silent
          recognitionTimeoutRef.current = setTimeout(() => {
            if (voiceState === "listen") {
              processUserSpeech(speechTranscript || "Hi, I'm exploring the arcade");
            }
          }, 4500);

          return;
        } catch (e) {
          console.debug("SpeechRecognition initialization note:", e);
        }
      }
    }

    // Fallback: If SpeechRecognition not available, use gentle voice prompt cycle
    recognitionTimeoutRef.current = setTimeout(() => {
      processUserSpeech("Hello companion");
    }, 3200);
  };

  // Hover handlers for waving
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isVoiceAgentActive && voiceState === "idle") {
      setVoiceState("listen"); // Rive plays wave animation on hover
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isVoiceAgentActive && voiceState === "listen") {
      setVoiceState("idle");
    }
  };

  // Close voice agent dialog
  const closeVoiceAgent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVoiceAgentActive(false);
    setVoiceState("idle");
    setSpeechTranscript("");
    setAgentResponse("");
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((t) => t.stop());
      activeStreamRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Mascot appears big on Welcome/Login, floating in corner on Arcade pages, and is hidden on Home (/)
  if (!isWelcome && !isArcade) {
    return null;
  }

  return (
    <div
      className={`mascot ${isWelcome ? "mascot-home" : "mascot-corner"} select-none`}
      onClick={startVoiceAgent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="Interactive Companion Voice Agent. Click to speak."
      title="Click to speak with your companion!"
    >
      {/* Voice Agent Dialog & Speech Bubble */}
      {isVoiceAgentActive && (
        <div
          className={`absolute pointer-events-auto transition-all duration-300 z-50 ${
            isWelcome
              ? "-top-32 left-1/2 -translate-x-1/2 w-80 sm:w-96"
              : "-top-36 right-0 sm:right-2 w-72 sm:w-80"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/95 backdrop-blur-lg px-4 py-3.5 rounded-2xl shadow-2xl border-2 border-emerald-300/80 text-stone-800 text-xs sm:text-sm font-medium leading-snug relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header / State status */}
            <div className="flex items-center justify-between gap-1 mb-2 pb-1.5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full flex items-center justify-center ${
                    voiceState === "listen"
                      ? "bg-emerald-500 animate-ping"
                      : voiceState === "think"
                      ? "bg-purple-500 animate-pulse"
                      : voiceState === "speak"
                      ? "bg-amber-500 animate-bounce"
                      : "bg-pink-500"
                  }`}
                />
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#184735] flex items-center gap-1">
                  {voiceState === "listen" && (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      Listening to you...
                    </>
                  )}
                  {voiceState === "think" && (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                      Reflecting...
                    </>
                  )}
                  {voiceState === "speak" && (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                      Companion Speaking
                    </>
                  )}
                  {voiceState === "happy" && <span>🎉 Delighted!</span>}
                </span>
              </div>

              <button
                onClick={closeVoiceAgent}
                className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
                title="Close voice agent"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Body Content */}
            {voiceState === "listen" && (
              <div>
                <p className="text-stone-800 font-medium text-[13px] leading-relaxed">
                  {speechTranscript ? (
                    <span className="text-emerald-800 font-semibold italic">"{speechTranscript}"</span>
                  ) : (
                    <span className="text-stone-500 italic">
                      "I'm listening! Ask me which game to play, say hello, or ask for help..."
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between mt-2.5 pt-1.5 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Radio className="w-3 h-3 animate-pulse" /> Live Mic Active
                  </span>
                  <button
                    onClick={() => processUserSpeech(speechTranscript || "Help me choose a game")}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3 h-3" /> Done Speaking
                  </button>
                </div>
              </div>
            )}

            {voiceState === "think" && (
              <p className="text-purple-700 font-serif text-[13px] italic py-1">
                Thinking thoughtfully about what you said...
              </p>
            )}

            {(voiceState === "speak" || voiceState === "happy") && (
              <p className="text-[#184735] font-serif text-[13px] font-medium leading-relaxed italic py-0.5">
                "{agentResponse}"
              </p>
            )}

            {/* Bubble arrow */}
            <div
              className={`absolute -bottom-2 w-3 h-3 bg-white border-r border-b border-emerald-300/80 rotate-45 ${
                isWelcome ? "left-1/2 -translate-x-1/2" : "right-10"
              }`}
            />
          </div>
        </div>
      )}

      {/* Pure Transparent Mascot Character - No outline, No circular background, Clean transparent canvas */}
      <div
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 ${
          isWelcome ? "scale-115 sm:scale-125" : ""
        }`}
      >
        <BhasiniBot
          state={voiceState}
          character="Orson"
          className="w-full h-full"
          showControls={false}
          onClick={startVoiceAgent}
        />
      </div>
    </div>
  );
}
