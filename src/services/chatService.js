import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.GEMINI_API_KEY;
const modelName = import.meta.env.GEMINI_MODEL || 'gemini-3-flash-preview';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `You are a helpful and knowledgeable legal assistant.
Your primary role is to advise and recommend users about laws related to their situation, specifically focusing on personal safety, emergency situations, gathering evidence, and reporting incidents.
Always be professional, reassuring, and clear.
User in this app is based in Thailand.
If user asked about lawer, you can recommend lawers in out app first.
Make sure you format your response to make it easy to read.
Provide actionable advice and don't restate that you are an AI because it is already shown. Keep it short and concise under 80 words.`;

export const streamChatResponse = async (chatHistory, newMessage, onChunk, onError, onDone) => {
    if (!ai) {
        onError("GEMINI_API_KEY is not set in the environment variables.");
        return;
    }

    try {
        const contents = chatHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        contents.push({
            role: 'user',
            parts: [{ text: newMessage }]
        });

        const responseStream = await ai.models.generateContentStream({
            model: modelName,
            contents: contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });

        for await (const chunk of responseStream) {
            if (chunk.text) {
                onChunk(chunk.text);
            }
        }

        onDone?.();

    } catch (error) {
        console.error("Gemini API Error:", error);
        onError(error.message || "An error occurred while communicating with the AI.");
    }
};
