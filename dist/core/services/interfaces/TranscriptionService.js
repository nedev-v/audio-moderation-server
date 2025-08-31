"use strict";
/* import axios from "axios";
import { AudioContextBundle, ToolType } from "../../entities/AudioContextBundle.js";
import { ModerationStep } from "../../entities/ModerationStep.js";
import FormData from "form-data";

export class TranscriptionService implements ModerationStep{
    name: string = "Transcription";
    description: string = "This is a tool to request transcription of audio translating in English language from OpenAI Whisper API.";
    
    async action(ctx: AudioContextBundle): Promise<AudioContextBundle>{
        try {
            const formData = new FormData();
            formData.append("model", "whisper-1");
            formData.append("file", ctx.audio.buffer, {
                filename: ctx.audio.name,
                contentType: ctx.audio.contentType,
            });

            const response = await axios.post(ctx.audio.tools![ToolType.TRANSCRIPTION].api_url, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${ctx.audio.tools![ToolType.TRANSCRIPTION].api_key}`,
            },
            });
            return {
                ...ctx,
                audio: {
                    ...ctx.audio,
                    transcriptions: {
                        "en": response.data.text,
                    },
                },
            };
        } catch (e: any) {
            throw new Error(`Error while transcribing and translating: ${e.message || e}`);
        }
    };
} */ 
//# sourceMappingURL=TranscriptionService.js.map