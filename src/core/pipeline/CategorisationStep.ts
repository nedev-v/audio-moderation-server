import axios from "axios";
import { OPENAI_MODERATION_API } from "../../seed/ai_tools.js";
import { AI_Tool, AudioContextBundle, ModerationResult } from "../entities/AudioContextBundle";
import { ModerationStep } from "../entities/ModerationStep";

export class CategorisationStep implements ModerationStep{
    stepName: string = "Categorisation Step";
    description: string;
    tool: AI_Tool;
    constructor(name: string, description: string, tool?: AI_Tool | undefined){
        this.stepName = name;
        this.description = description;
        if(tool){
            this.tool = tool;
        } else{
            this.tool = OPENAI_MODERATION_API;
        }
    }

    async execute(audioContext: AudioContextBundle): Promise<AudioContextBundle> {
        try{
            const transcription = audioContext.transcriptions?.["en"] ?? "";
            if(transcription === ""){
                throw new Error("Transcription is empty");
            }
            const moderationCategories: ModerationResult = await this.moderate(transcription);

            audioContext.moderation = {
                result: moderationCategories,
                violations: {}
            };
            return audioContext;
        } catch (e: any) {
            throw new Error(`Error while getting moderation: ${e.message || e}`);
        }
    };

    private async moderate(moderationText: string){
        try {
            const response = await axios.post(
                this.tool.api_endpoint,
                {
                    model: this.tool.model, 
                    input: moderationText,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.tool.api_key}`,
                    },
                }
            );
            const results = response.data.results[0];
            return results;
        } catch (e: any) {
            throw new Error(`Error while getting moderation categories: ${e.message || e}`);
        }
    }
    
}