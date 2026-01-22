
import { GoogleGenAI } from "@google/genai";

// Fix: Strictly follow initialization rules (named parameter, direct process.env.API_KEY access)
const getAIClient = () => {
  // Use named parameter as required
  return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

export const generateAIResponse = async (prompt: string, context?: string, modelType: 'flash' | 'pro' = 'flash') => {
  const ai = getAIClient();
  // Using correct model names: gemini-3-pro-preview for complex reasoning, gemini-3-flash-preview for basic tasks
  const modelName = modelType === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  
  const systemPrompt = `You are a helpful Chrome Extension AI Assistant. 
    Context from the current webpage: "${context || 'No context provided'}".
    Provide concise, useful responses optimized for a floating dashboard UI.`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });
    // Access response.text as a property, not a method, as per guidelines
    return response.text || "No response from AI.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`;
  }
};

export const summarizePage = async (pageContent: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following webpage content in 3-5 bullet points focusing key takeaways: \n\n${pageContent.substring(0, 15000)}`,
  });
  // Access response.text as a property
  return response.text;
};

export const searchGrounding = async (query: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  
  // Extract grounding information correctly following Search Grounding guidelines
  // Candidates and groundingMetadata are used to retrieve the web source links
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const sources = groundingChunks 
    ? groundingChunks.map((chunk: any) => chunk.web).filter(Boolean) 
    : [];

  return {
    text: response.text,
    sources: sources
  };
};
