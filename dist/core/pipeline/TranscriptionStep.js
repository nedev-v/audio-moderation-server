import axios from "axios";
import { OPENAI_TRANSCRIPTION_API } from "../../seed/ai_tools";
export class TranscriptionStep {
    constructor(name, description, tool) {
        this.stepName = "Transcription Step";
        this.stepName = name;
        this.description = description;
        if (tool) {
            this.tool = tool;
        }
        else {
            this.tool = OPENAI_TRANSCRIPTION_API;
        }
    }
    async execute(audioContextBundle) {
        console.log("Executing TranscriptionStep");
        const text = await this.transcribe(audioContextBundle.uploadedFile);
        audioContextBundle = {
            ...audioContextBundle,
            transcriptions: { "en": text },
        };
        console.log("TranscriptionStep executed, result: ", audioContextBundle);
        return audioContextBundle;
    }
    async transcribe(audioFile) {
        try {
            const formData = new FormData();
            formData.append("model", "whisper-1");
            formData.append("file", new File([this.bufferToArrayBuffer(audioFile.buffer)], audioFile.originalName, { type: audioFile.mimeType }));
            //make request in a separate module
            const response = await axios.post(this.tool.api_endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${this.tool.api_key}`,
                },
            });
            return response.data.text;
        }
        catch (e) {
            throw new Error(`Error while transcribing and translating: ${e.message || e}`);
        }
    }
    bufferToArrayBuffer(buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
}
//# sourceMappingURL=TranscriptionStep.js.map