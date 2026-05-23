import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContent(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a professional content writer and SEO expert.",
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text || '';
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
