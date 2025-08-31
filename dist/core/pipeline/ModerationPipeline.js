import { v4 as uuid } from "uuid";
export class ModerationPipeline {
    constructor(audioFile) {
        this.steps = [];
        this.ctx = {
            id: uuid(),
            name: `${uuid()}-${audioFile.originalName}`,
            uploadedFile: {
                buffer: audioFile.buffer,
                originalName: audioFile.originalName,
                mimeType: audioFile.mimeType,
            }
        };
    }
    use(step) {
        this.steps.push(step);
        return this;
    }
    async run() {
        let resultCtx = this.ctx;
        for (const step of this.steps) {
            resultCtx = await step.execute(resultCtx);
        }
        return resultCtx;
    }
}
//# sourceMappingURL=ModerationPipeline.js.map