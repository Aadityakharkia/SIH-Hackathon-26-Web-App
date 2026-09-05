"use client";

import { useRef } from "react";
import Link from "next/link";
import { User, Shield, Gamepad2, BookOpen, Music, Users, ArrowRight } from "lucide-react";
import { SignInMascot } from "@/components/mascot/SignInMascot";
import { useMascot } from "@/context/MascotContext";

export default function SignInPage() {
  const { triggerMascotTransition } = useMascot();
  const mascotElRef = useRef<HTMLDivElement | null>(null);

  const handleSelectRole = (role: "martha" | "caregiver") => {
    const target = role === "martha" ? "/" : "/folk";
    triggerMascotTransition(target, role, mascotElRef.current);
  };

  const handleNavClick = (targetUrl: string, role?: "martha" | "caregiver") => {
    triggerMascotTransition(targetUrl, role, mascotElRef.current);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#184735] text-white flex items-center justify-center font-serif text-xl font-bold">
            C
          </div>
          <span className="font-serif font-bold text-2xl text-[#184735]">Cogniva</span>
        </div>

        <button
          type="button"
          onClick={() => handleNavClick("/")}
          className="text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
        >
          Skip to Home →
        </button>
      </header>

      {/* Main Sign-In Hero */}
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center z-10">
        {/* Interactive Mascot Centerpiece */}
        <SignInMascot onRefReady={(el) => (mascotElRef.current = el)} />

        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#184735] tracking-tight leading-tight">
          A gentle day,<br />rooted in familiar memories.
        </h1>

        <p className="text-stone-600 text-lg md:text-xl font-normal max-w-2xl mt-3 leading-relaxed">
          Interactive daily care, joyful memories, and calm activities tailored for you.
        </p>

        {/* Role Select Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={() => handleSelectRole("martha")}
            className="w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 bg-[#184735] hover:bg-[#1b4d3e] text-white font-bold font-serif text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
            type="button"
          >
            <User className="w-5 h-5 text-emerald-200" />
            <span>I'm Martha</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          <button
            onClick={() => handleSelectRole("caregiver")}
            className="w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 bg-[#eef3ec] hover:bg-[#e4ede1] border-2 border-stone-400/60 text-[#184735] font-bold font-serif text-lg py-4 px-8 rounded-full shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            type="button"
          >
            <Shield className="w-5 h-5 text-[#184735]" />
            <span>I'm a Caregiver</span>
          </button>
        </div>
      </main>

      {/* Dock Navigation */}
      <footer className="w-full max-w-6xl mx-auto px-6 pb-8 z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200 shadow-xl p-4 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200 text-center">
          <button
            onClick={() => handleNavClick("/arcade")}
            className="p-4 hover:bg-stone-50 rounded-2xl transition-colors text-center w-full"
          >
            <Gamepad2 className="w-8 h-8 text-[#184735] mx-auto mb-2" />
            <h3 className="font-serif font-bold text-slate-900">Memory Games</h3>
          </button>

          <button
            onClick={() => handleNavClick("/")}
            className="p-4 hover:bg-stone-50 rounded-2xl transition-colors text-center w-full"
          >
            <BookOpen className="w-8 h-8 text-[#c25e43] mx-auto mb-2" />
            <h3 className="font-serif font-bold text-slate-900">Daily Overview</h3>
          </button>

          <button
            onClick={() => handleNavClick("/")}
            className="p-4 hover:bg-stone-50 rounded-2xl transition-colors text-center w-full"
          >
            <Music className="w-8 h-8 text-[#d99a26] mx-auto mb-2" />
            <h3 className="font-serif font-bold text-slate-900">Music & Radio</h3>
          </button>

          <button
            onClick={() => handleNavClick("/folk")}
            className="p-4 hover:bg-stone-50 rounded-2xl transition-colors text-center w-full"
          >
            <Users className="w-8 h-8 text-[#184735] mx-auto mb-2" />
            <h3 className="font-serif font-bold text-slate-900">Folk Caregiver</h3>
          </button>
        </div>
      </footer>
    </div>
  );
}

