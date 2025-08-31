"use strict";
/* import axios from "axios";
import { ModerationStep } from "../../entities/ModerationStep.js";
import { AudioContextBundle, ToolType } from "../../entities/AudioContextBundle.js";


export class ModerationService implements ModerationStep{
    name: string = "Transcription Moderation";
    description: string = "This service is used to moderate audio text and classify the content using omni-moderation-latest OpenaAI API.";
    
    async action(ctx: AudioContextBundle): Promise<AudioContextBundle>{
        if (!ctx.audio.transcriptions) {
            throw new Error("No transcript found in context.");
        }
        try {
            const response = await axios.post(ctx.audio.tools!.moderation.api_url,
            {
                input: ctx.audio.transcriptions!["en"],
                model: ctx.audio.tools![ToolType.MODERATION].model,
            },
            {
                headers: {
                    Authorization: `Bearer ${ctx.audio.tools![ToolType.MODERATION].api_key}`,
                },
            });
            return {
                ...ctx,
                audio: {
                    ...ctx.audio,
                    moderation: response.data.results, //TODO correctly return moderation res
                },
            }
        } catch (e: any) {
            throw new Error(`Error while getting moderation: ${e.message || e}`);
        }
    };
} */ 
//# sourceMappingURL=ModerationService.js.map