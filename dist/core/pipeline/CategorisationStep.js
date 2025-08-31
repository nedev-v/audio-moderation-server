import axios from "axios";
import { OPENAI_MODERATION_API } from "../../seed/ai_tools";
export class CategorisationStep {
    constructor(name, description, tool) {
        this.stepName = "Categorisation Step";
        this.stepName = name;
        this.description = description;
        if (tool) {
            this.tool = tool;
        }
        else {
            this.tool = OPENAI_MODERATION_API;
        }
    }
    async execute(audioContext) {
        try {
            const transcription = audioContext.transcriptions?.["en"] ?? "";
            if (transcription === "") {
                throw new Error("Transcription is empty");
            }
            const moderationCategories = await this.moderate(transcription);
            console.log("Moderation categories:", moderationCategories);
            return audioContext;
        }
        catch (e) {
            throw new Error(`Error while getting moderation: ${e.message || e}`);
        }
    }
    ;
    async moderate(moderationText) {
        try {
            const response = await axios.post(this.tool.api_endpoint, {
                model: this.tool.model,
                input: moderationText,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.tool.api_key}`,
                },
            });
            const result = response.data;
            console.log("Moderation response:", result);
        }
        catch (e) {
            throw new Error(`Error while getting moderation categories: ${e.message || e}`);
        }
    }
}
//# sourceMappingURL=CategorisationStep.js.map