import { DEFAULT_GAME_ID, VOICE_TURN_ENDPOINT } from "./config";
import type { VoiceTurnRequest, VoiceTurnResponse } from "./contracts";

function createLocalVoiceReply(transcript: string): VoiceTurnResponse {
  const normalized = transcript.toLowerCase();
  const wantsGame =
    normalized.includes("start") ||
    normalized.includes("play") ||
    normalized.includes("game") ||
    normalized.includes("memory");

  if (wantsGame) {
    return {
      replyText: "Starting the memory garden game for you.",
      intent: "START_GAME",
      gameCommand: {
        action: "START_GAME",
        gameId: DEFAULT_GAME_ID,
        source: "voice",
        transcript,
      },
    };
  }

  if (normalized.includes("help")) {
    return {
      replyText: "I am listening. You can ask me to start a game, help you choose, or just talk with me.",
      intent: "HELP",
    };
  }

  return {
    replyText: transcript
      ? "I heard you. I am right here with you."
      : "I am ready whenever you are.",
    intent: "CHAT",
  };
}

export async function sendVoiceTurn(request: VoiceTurnRequest): Promise<VoiceTurnResponse> {
  if (!VOICE_TURN_ENDPOINT) {
    return createLocalVoiceReply(request.transcript);
  }

  const formData = new FormData();
  formData.append("transcript", request.transcript);
  formData.append("locale", request.locale);
  formData.append("route", request.route);
  formData.append("sessionId", request.sessionId);

  if (request.audioBlob) {
    formData.append("audio", request.audioBlob, `voice-turn-${request.sessionId}.webm`);
  }

  const response = await fetch(VOICE_TURN_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Voice engine request failed with ${response.status}`);
  }

  return response.json();
}
