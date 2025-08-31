import { AI_Tool } from "../core/entities/AudioContextBundle"

export const OPENAI_MODERATION_API: AI_Tool = {
    model: "omni-moderation-latest",
    api_endpoint: "https://api.openai.com/v1/moderations",
    get api_key() {
        return process.env.OPENAI_API_KEY?.trim() ?? "";
    }
}

export const OPENAI_TRANSCRIPTION_API: AI_Tool = {
    model: "whisper-1",
    api_endpoint: "https://api.openai.com/v1/audio/translations",
    get api_key() {
        return process.env.OPENAI_API_KEY?.trim() ?? "";
    }
}