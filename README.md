# Cogniva - Senior Care Daily Companion

**Good Days, Brighter Tomorrows**

Cogniva is an enterprise-grade, accessible web application designed to support seniors with cognitive dignity, gentle routines, reminiscence activities, interactive memory games, and voice assistance.

---

## Technical Stack

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Icons**: Lucide React & Google Material Symbols Outlined
- **Speech Engine**: Web Speech API (Synthesis) & Bhasini Multilingual Engine integration
- **Typography**: Atkinson Hyperlegible Next, Playfair Display, Caveat

---

## Directory Structure

```
├── docs/
│   └── ARCHITECTURE.md          # Technical Architecture & Accessibility Specs
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global Root Layout
│   │   ├── globals.css          # Global Tailwind & Custom Styles
│   │   ├── page.tsx             # Daily Companion Dashboard Route (/)
│   │   ├── sign-in/page.tsx     # Animated Persona Selection Route (/sign-in)
│   │   ├── folk/page.tsx        # Traditional Folk Heritage Route (/folk)
│   │   ├── arcade/page.tsx      # Arcade Games Hub Route (/arcade)
│   │   └── game-arena/page.tsx  # Memory Garden Game Arena Route (/game-arena)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx       # Enterprise Navigation & Caregiver PIN Modal
│   │   ├── companion/
│   │   │   ├── RoutineSidebar.tsx    # Reminders, Streaks & Caregiver Emergency Trigger
│   │   │   ├── ActivityCarousel.tsx  # Reminiscence & Activity Dock
│   │   │   └── BhasiniBot.tsx        # Multilingual Voice Assistant Engine
│   │   ├── mascot/
│   │   │   └── MascotStage.tsx       # Interactive Pip Mascot Stage
│   │   └── arcade/
│   │       └── ArcadeView.tsx        # Games Hub View & Category Cards
│   ├── lib/
│   │   └── speech.ts            # Web Speech API Synthesis Helper
│   └── types/
│       └── companion.ts         # TypeScript Interfaces & Data Definitions
├── tailwind.config.js           # Design System Tokens
├── tsconfig.json                # Strict TypeScript Config
└── package.json                 # Project Manifest
```

---

## Key Features

1. **Gentle Routine & Audio Reminders**:
   - Spoken notifications with Web Speech API (`speakAnnouncement`).
   - Emergency caregiver instant call trigger.

2. **Caregiver PIN Lock**:
   - Secure numeric keypad modal protecting routine configuration.

3. **Interactive Pip Mascot**:
   - Tap-responsive otter mascot providing warm, reassuring daily speech bubbles.

4. **Senior-Friendly Memory Game Arena**:
   - 4x4 floral pair matching with zero time constraints and clear visual feedback.

5. **Multilingual Assistant (Bhasini Engine)**:
   - Voice assistant supporting English, Hindi, Tamil, Telugu, Bengali, and Marathi.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Access the application locally at `http://localhost:3000`.
