import { AudioContextBundle } from "../entities/AudioContextBundle";
import { ModerationStep } from "../entities/ModerationStep";
import { UploadedFile } from "../entities/UploadedFile";
import { v4 as uuid } from "uuid";

export class ModerationPipeline{
    private steps: ModerationStep[] = []
    private ctx: AudioContextBundle;

    constructor(audioFile: UploadedFile){
        this.ctx = {
                id: uuid(),
                name: `${uuid()}-${audioFile.originalName}`,
                uploadedFile: {
                    buffer: audioFile.buffer,
                    originalName: audioFile.originalName,
                    mimeType: audioFile.mimeType,
                }
        }
    }

    use(step: ModerationStep){
        this.steps.push(step);
        return this;
    }

    async run(): Promise<AudioContextBundle>{
        let resultCtx: AudioContextBundle = this.ctx;
        for(const step of this.steps){
            resultCtx = await step.execute(resultCtx);
        }
        return resultCtx;
    }

}

