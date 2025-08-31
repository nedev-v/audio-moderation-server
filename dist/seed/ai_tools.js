export const OPENAI_MODERATION_API = {
    model: "omni-moderation-latest",
    api_endpoint: "https://api.openai.com/v1/moderations",
    api_key: process.env.OPENAI_API_KEY ?? "",
};
export const OPENAI_TRANSCRIPTION_API = {
    model: "whisper-1",
    api_endpoint: "https://api.openai.com/v1/audio/translations",
    api_key: process.env.OPENAI_API_KEY ?? "",
};
//# sourceMappingURL=ai_tools.js.map