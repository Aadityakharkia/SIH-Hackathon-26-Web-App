"use client";

import { Volume2, PhoneCall, Calendar, Flame } from "lucide-react";
import { speakAnnouncement } from "@/lib/speech";

export function RoutineSidebar() {
  const reminders = [
    {
      time: "11:00 AM",
      title: "Gentle Garden Stroll",
      desc: "Fresh air & sunny courtyard walk",
      audio: "At 11:00 AM, it is time for your gentle stroll through the sunny flower garden.",
    },
    {
      time: "1:30 PM",
      title: "Family Call with Sarah",
      desc: "Sarah will call to share warm photos",
      audio: "At 1:30 PM, Sarah will be calling to say hello and share photos.",
    },
    {
      time: "3:00 PM",
      title: "Hydration & Chamomile Snack",
      desc: "Cool glass of water & biscuits",
      audio: "At 3:00 PM, enjoy a cool glass of water and fresh chamomile biscuits.",
    },
  ];

  const handleTriggerCaregiver = () => {
    speakAnnouncement(
      "Connecting with your caregiver instantly. Please sit comfortably while we reach Sarah."
    );
  };

  return (
    <aside aria-label="Daily Overview" className="lg:col-span-4 flex flex-col gap-5 w-full">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/60 flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-800 text-xl font-serif">
            E
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl text-slate-900 font-serif">Eleanor Vance</h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit mt-1">
            Comfortable Morning
          </span>
        </div>
      </div>

      {/* Today's Schedule Header */}
      <div className="bg-[#184735] text-white rounded-3xl p-6 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between text-emerald-200 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>Today's Date</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-amber-300 text-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-300" />
            <span>7 Day Streak</span>
          </div>
        </div>
        <p className="font-bold text-3xl font-serif tracking-tight mt-1">
          Thursday,<br />Oct 24, 2024
        </p>
        <span className="text-xs text-emerald-100 font-medium mt-2 bg-white/10 px-3 py-1.5 rounded-xl w-fit">
          10:30 AM • Morning tea time
        </span>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/60 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-lg text-slate-900 font-serif">Daily Reminders</h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            3 Scheduled
          </span>
        </div>

        <div className="space-y-2.5">
          {reminders.map((rem, i) => (
            <div
              key={i}
              className="bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-3.5 transition-colors flex items-center justify-between gap-3 border border-slate-200/50"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-emerald-800">{rem.time}</span>
                <span className="font-bold text-slate-900 text-base">{rem.title}</span>
                <span className="text-xs text-slate-500 truncate">{rem.desc}</span>
              </div>
              <button
                onClick={() => speakAnnouncement(rem.audio)}
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 shadow-xs flex items-center justify-center flex-shrink-0 transition-all border border-slate-200/60 active:scale-95"
                title="Play spoken reminder"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Emergency Caregiver Button */}
        <button
          onClick={handleTriggerCaregiver}
          className="w-full mt-2 py-3.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs"
        >
          <PhoneCall className="w-5 h-5 text-rose-600" />
          <span>Contact Caregiver Instantly</span>
        </button>
      </div>
    </aside>
  );
}
