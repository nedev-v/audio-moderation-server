import { AI_Tool, AudioContextBundle } from "./AudioContextBundle";

export interface ModerationStep{
    stepName: string;
    description: string;
    tool?: AI_Tool; 
    execute: (ctx: AudioContextBundle) => Promise<AudioContextBundle>;  
}