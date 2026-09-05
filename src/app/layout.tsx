"use client";

import { MascotProvider } from "@/context/MascotContext";
import { MascotTransitionOverlay } from "@/components/mascot/MascotTransitionOverlay";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fbf9f4] text-stone-900 antialiased">
        <MascotProvider>
          {children}
          <MascotTransitionOverlay />
        </MascotProvider>
      </body>
    </html>
  );
}

