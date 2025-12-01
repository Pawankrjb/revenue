import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY environment variable');
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDailyInsight = async (username: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, motivating, and professional daily business insight or productivity tip for a user named "${username}". Keep it under 2 sentences. Sound modern and encouraging.`,
    });

    return response.text ?? "Success is not final, failure is not fatal: it is the courage to continue that counts.";
  } catch (error) {
    console.error("Failed to generate insight:", error);
    // Fallback message if API key is invalid or request fails
    return "Focus on being productive instead of busy. You've got this!";
  }
};
