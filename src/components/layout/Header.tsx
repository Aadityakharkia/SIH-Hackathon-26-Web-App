"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

interface HeaderProps {
  activeTab?: string;
}

export function Header({ activeTab = "home" }: HeaderProps) {
  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center relative">
        {/* Left Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#064e3b] text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Leaf className="w-6 h-6 text-emerald-300" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 font-serif">
              Cogniva
            </span>
          </Link>

          {/* Navigation Bar */}
        </div>

        {/* Centered Navigation Bar */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-[17px] font-semibold">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-3.5 py-2 transition-colors rounded-xl ${
              activeTab === "home"
                ? "text-[#065f46] bg-emerald-50 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>

          <Link
            href="/arcade"
            className={`inline-flex items-center gap-2 px-3.5 py-2 transition-colors rounded-xl ${
              activeTab === "arcade"
                ? "text-[#065f46] bg-emerald-50 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>🎮</span>
            <span>Arcade Games</span>
          </Link>
        </nav>

        {/* Right Action Controls */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#184735] hover:bg-[#1b4d3e] text-white font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
