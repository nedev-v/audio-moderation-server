import { AI_Tool, AudioContextBundle, ModerationResult, ViolationType } from "../entities/AudioContextBundle.js";
import { ModerationStep } from "../entities/ModerationStep";

export class PrepareResultsStep implements ModerationStep{
    description: string;
    stepName: string = "Preparing results";

    constructor(stepName: string, description: string){
        this.stepName = stepName;
        this.description = description;
    }
    async execute(bundle: AudioContextBundle): Promise<AudioContextBundle> {
        const violations: Partial<Record<ViolationType, Array<[string, number]>>> = {
            [ViolationType.HIGH_RISK] : [],
            [ViolationType.MEDIUM_RISK] : [],
            [ViolationType.LOW_RISK] : [],
        };
        if(bundle.moderation?.result === undefined){
            throw new Error("No moderation result found to process it.");
        }
        const moderationResult: ModerationResult = bundle.moderation.result;

        if(!moderationResult.flagged){
            return bundle;
        }

        Object.entries(moderationResult.category_scores).forEach(([key, value]) => {
            if (value >= 0.8) {
                violations[ViolationType.HIGH_RISK]!.push([key, value]);
            } else if (value >= 0.5 && value < 0.8) {
                violations[ViolationType.MEDIUM_RISK]!.push([key, value]);
            } else if (value >= 0.2 && value < 0.5) {
                violations[ViolationType.LOW_RISK]!.push([key, value]);
            }
        });

        bundle.moderation = {
            ...bundle.moderation,
            violations,
        };

        return bundle;
    }
}