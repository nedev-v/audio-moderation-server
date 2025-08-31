"use strict";
/* import axios from "axios";
import { UploadedFile } from "../../entities/UploadedFile";
import FormData from "form-data";
import { ModerationService } from "../interfaces/ModerationService";
import openai, { OpenAI } from "openai"; */
/**
 * Sends audio text to OpenAI moderation API
 */
/* export class OpenAIModerationService implements ModerationService{
    name: string = "OpenAI Moderation";
    description: string = "This service is used to moderate audio text and classify the content using omni-moderation-latest OpenaAI API.";
    tools: AI_tool[];

    constructor(tools: AI_tool[]){
        this.tools = tools;
    }
    
    moderate(inputText: string, client: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async action(ctx: AudioContextBundle): Promise<AudioContextBundle> {
        try {
            ctx
            const moderation = await openaiClient.moderations.create({
                model: "omni-moderation-latest",
                input: inputText,
            });
            return moderation.results;
        } catch (e: any) {
            throw new Error(`Error while getting moderation: ${e.message || e}`);
        }
    } */
//# sourceMappingURL=OpenAIModerationService.js.map