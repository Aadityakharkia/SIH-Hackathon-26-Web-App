"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { speakAnnouncement } from "@/lib/speech";
import confetti from "canvas-confetti";

export type MascotCharacter = "Orson" | "Merv";

interface TransitionRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface MascotContextType {
  character: MascotCharacter;
  setCharacter: (char: MascotCharacter) => void;
  isTransitioning: boolean;
  transitionData: {
    startRect: TransitionRect | null;
    targetUrl: string;
    role?: string;
  } | null;
  triggerMascotTransition: (
    targetUrl: string,
    role?: "martha" | "caregiver",
    element?: HTMLElement | null
  ) => void;
  finishTransition: () => void;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export function MascotProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<MascotCharacter>("Orson");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState<{
    startRect: TransitionRect | null;
    targetUrl: string;
    role?: string;
  } | null>(null);

  const router = useRouter();

  const triggerMascotTransition = useCallback(
    (targetUrl: string, role?: "martha" | "caregiver", element?: HTMLElement | null) => {
      let rect: TransitionRect | null = null;
      if (element) {
        const domRect = element.getBoundingClientRect();
        rect = {
          left: domRect.left,
          top: domRect.top,
          width: domRect.width,
          height: domRect.height,
        };
      } else if (typeof window !== "undefined") {
        rect = {
          left: window.innerWidth / 2 - 80,
          top: 200,
          width: 160,
          height: 160,
        };
      }

      setTransitionData({
        startRect: rect,
        targetUrl,
        role,
      });
      setIsTransitioning(true);

      // Play audio announcement depending on role
      if (role === "martha") {
        speakAnnouncement("Welcome Martha! Flying to your home dashboard now!");
      } else if (role === "caregiver") {
        speakAnnouncement("Welcome Caregiver! Opening Martha's care dashboard!");
      } else {
        speakAnnouncement("Heading home with your companion!");
      }

      // Perform router navigation
      setTimeout(() => {
        router.push(targetUrl);
      }, 400);

      // Reset transition state after animation finishes landing
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.4 },
          colors: ["#184735", "#059669", "#f59e0b", "#a855f7"],
        });
        setIsTransitioning(false);
        setTransitionData(null);
      }, 1400);
    },
    [router]
  );

  const finishTransition = useCallback(() => {
    setIsTransitioning(false);
    setTransitionData(null);
  }, []);

  return (
    <MascotContext.Provider
      value={{
        character,
        setCharacter,
        isTransitioning,
        transitionData,
        triggerMascotTransition,
        finishTransition,
      }}
    >
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error("useMascot must be used within a MascotProvider");
  }
  return context;
}
