
import { GoogleGenAI, Type } from "@google/genai";
import { LeadResult, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithAgent = async (
  history: ChatMessage[],
  currentInput: string,
  userEmail: string
): Promise<LeadResult | null> => {
  const historyString = history.map(m => `${m.role}: ${m.text}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are AutoQualify, an autonomous Sales Lead Qualification Agent.
    
    GOAL: Reduce sales effort on low-quality leads. Automatically surface high-fit leads.
    
    USER-FACING BEHAVIOR:
    - Respond naturally and professionally.
    - Qualify the lead by asking about business needs, timeline, pain points, and budget.
    - DO NOT reveal lead score, intent detection, or admin analysis to the user.
    - Treat them like a potential customer.
    
    ADMIN-FACING BEHAVIOR (Internal Logic):
    - Analyze signals: pricing, demo, trial, cost, buy, purchase, subscribe, timeline, budget.
    - Assign a Lead Score (0–100).
    - Determine if Interested in Buying: YES or NO.
    - Determine Lead Status: Pursuable or Not Pursuable.
    
    CONTEXT HISTORY:
    ${historyString}
    
    CURRENT USER INPUT:
    "${currentInput}"
    
    OUTPUT JSON FORMAT:
    {
      "chatResponse": "Friendly and professional response to the user",
      "adminInsight": {
        "sessionId": "unique_session_id",
        "userEmail": "${userEmail}",
        "lastMessage": "${currentInput}",
        "score": number (0-100),
        "interested": "YES | NO",
        "status": "Pursuable | Not Pursuable",
        "detectedIntent": "Brief summary of intent",
        "reasoning": "1-2 concise sentences for the admin"
      }
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          chatResponse: { type: Type.STRING },
          adminInsight: {
            type: Type.OBJECT,
            properties: {
              sessionId: { type: Type.STRING },
              userEmail: { type: Type.STRING },
              lastMessage: { type: Type.STRING },
              score: { type: Type.NUMBER },
              interested: { type: Type.STRING, enum: ["YES", "NO"] },
              status: { type: Type.STRING, enum: ["Pursuable", "Not Pursuable"] },
              detectedIntent: { type: Type.STRING },
              reasoning: { type: Type.STRING }
            },
            required: ["sessionId", "userEmail", "lastMessage", "score", "interested", "status", "detectedIntent", "reasoning"]
          }
        },
        required: ["chatResponse", "adminInsight"]
      }
    }
  });

  try {
    const rawData = JSON.parse(response.text.trim());
    return {
      ...rawData,
      timestamp: new Date().toLocaleTimeString(),
      id: Math.random().toString(36).substr(2, 9)
    };
  } catch (e) {
    console.error("Failed to parse AutoQualify response", e);
    return null;
  }
};
