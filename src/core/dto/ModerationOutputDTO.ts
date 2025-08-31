import { Transcriptions, ViolationType } from "../entities/AudioContextBundle";

export type ModerationOutputDTO = {
    id: string;
    name: string;
    originalName: string;
    transcription: Transcriptions;
    flagged: boolean;
    violations: Partial<Record<ViolationType, Array<[string, number]>>>
}