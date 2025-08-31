"use strict";
/* import axios from "axios";
import { UploadedFile } from "../../entities/UploadedFile";
import FormData from "form-data"; */
/**
 * Sends audio file buffer to OpenAI transcription endpoint
 */
/* export class OpenAITranscribeService implements TranscribeService{
    name: string = "";
    description: string = "This is a tool to request transcription of audio translating in English language from OpenAI Moderation API.";
    tools: AI_tool[];
    action: (ctx: AudioContextBundle) => Promise<AudioContextBundle>;
    async transcribe(audioFile: UploadedFile): Promise<string> {
        try {
            const formData = new FormData();
            formData.append("model", "whisper-1");
            formData.append("file", audioFile.buffer, {
                filename: audioFile.originalname,
                contentType: audioFile.mimetype,
            });

            const response = await axios.post("https://api.openai.com/v1/audio/translations", formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            });

            return response.data.text;
        } catch (e: any) {
            throw new Error(`Error while transcribing and translating: ${e.message || e}`);
        }
    }
} */ 
//# sourceMappingURL=OpenAITranscribeService.js.map