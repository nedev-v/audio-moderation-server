import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import OpenAI from "openai";
import { ModerationPipeline } from "./core/pipeline/ModerationPipeline.js";
import { TranscriptionStep } from "./core/pipeline/TranscriptionStep.js";
import { CategorisationStep } from "./core/pipeline/CategorisationStep.js";
import { OPENAI_MODERATION_API, OPENAI_TRANSCRIPTION_API } from "./seed/ai_tools.js";
// Load environment variables
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// Multer setup (in-memory)
const upload = multer({ storage: multer.memoryStorage() });
// OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
/**
 * POST /uploadAudio - Upload an audio file, transcribe and moderate it.
 */
app.post("/uploadAudio", upload.single("audioFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const file = {
        originalName: req.file.originalname,
        buffer: req.file.buffer,
        mimeType: req.file.mimetype,
    };
    try {
        const pipeline = new ModerationPipeline(file);
        const transcription = new TranscriptionStep("Transcription Step", "This is a step to request transcription of audio translating in English language from OpenAI Whisper API.", OPENAI_TRANSCRIPTION_API);
        const moderation = new CategorisationStep("Categorisation Step", "This step is used to moderate transcribed text from audio and classify the content using OpenaAI API.", OPENAI_MODERATION_API);
        const resultCtx = await pipeline
            .use(transcription)
            .use(moderation)
            .run();
        res.json(resultCtx);
    }
    catch (e) {
        console.error("Error:", e);
        res.status(500).send(`Error: ${e.message || e}`);
    }
});
// Start server
app.listen(PORT, () => {
    console.log("-----START------");
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map