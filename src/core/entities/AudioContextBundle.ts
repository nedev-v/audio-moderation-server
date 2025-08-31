import { UploadedFile } from "./UploadedFile";

export enum ToolType {
    MODERATION = "moderation",
    TRANSCRIPTION = "transcription",
}

export type AudioContextBundle = {
    id: string;
    name: string;
    uploadedFile: UploadedFile
    transcriptions?: Transcriptions;
    moderation?: ModerationContextBundle;
};

export type ModerationContextBundle = {
    result: ModerationResult;
    violations: Partial<Record<ViolationType, Array<[string, number]>>>
}

export enum ViolationType {
    HIGH_RISK = "high_risk",
    MEDIUM_RISK = "medium_risk",
    LOW_RISK = "low_risk",
}

export type ModerationResult = {
  flagged: boolean;
  categories: {
    [category: string]: boolean;
  };
  category_scores: {
        [category: string]: number;
  };
};

export type Transcriptions = {
    [languageCode: string]: string;
}

export type AI_Tool = {
    model: string;
    api_endpoint: string;
    api_key: string;
    prompt?: string;
}
