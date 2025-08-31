import { ModerationStep } from "../entities/ModerationStep";
import { AI_Tool, AudioContextBundle } from "../entities/AudioContextBundle";
import { UploadedFile } from "../entities/UploadedFile";
import axios from "axios";
import { OPENAI_TRANSCRIPTION_API } from "../../seed/ai_tools.js";


export class TranscriptionStep implements ModerationStep{
    stepName: string = "Transcription Step";
    description: string;
    tool: AI_Tool;
    
    constructor(name: string, description: string, tool?: AI_Tool | undefined){
        this.stepName = name;
        this.description = description;
        if(tool){
            this.tool = tool;
        } else{
            this.tool = OPENAI_TRANSCRIPTION_API;
        }
    }
    
    async execute(audioContextBundle: AudioContextBundle): Promise<AudioContextBundle> {
        console.log("Executing TranscriptionStep");
        
        const text = await this.transcribe(audioContextBundle.uploadedFile)
        audioContextBundle = {
            ...audioContextBundle,
            transcriptions: {"en" : text},
        }
        return audioContextBundle;
    }

    async transcribe(audioFile: UploadedFile): Promise<string> {
        try {
            const formData = new FormData();
            formData.append("model", "whisper-1");
            formData.append("file",
                new File(
                    [this.bufferToArrayBuffer(audioFile.buffer)],
                    audioFile.originalName,
                    { type: audioFile.mimeType }
                )
            );
            const response = await axios.post(
                this.tool.api_endpoint,
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${this.tool.api_key}`,
                    },
                }
            );
            return response.data.text;
        } catch (e: any) {
            throw new Error(`Error while transcribing and translating: ${e.message || e}`);
        }
    }

    private bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    }
}