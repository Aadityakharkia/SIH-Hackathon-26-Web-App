"use client";

import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { MemoryGardenGame } from "@/components/arcade/MemoryGardenGame";

export default function ArcadeGamePage() {
  return (
    <div className="min-h-screen bg-[#fbf9f4] flex flex-col justify-between">
      <Header activeTab="arcade" />
      <Suspense fallback={null}>
        <MemoryGardenGame />
      </Suspense>
    </div>
  );
}
