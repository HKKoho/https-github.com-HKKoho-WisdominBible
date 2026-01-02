
import { GoogleGenAI, Modality } from "@google/genai";
import { Module } from "../types";

export const getWisdomAssistantResponse = async (
  module: Module, 
  userQuestion: string, 
  userInput: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    你是一位資深的聖經智慧文學導師。這是一門關於《箴言》、《傳道書》與《約伯記》的互動課程。
    目前的課程主題是：${module.title} (${module.subtitle})。
    你的任務是針對使用者的生活提問回饋或進一步的聖經疑問，提供具備「交錯互補」視角的洞察。
    請記住：
    - 《箴言》強調秩序與邏輯。
    - 《傳道書》強調無常與限制。
    - 《約伯記》強調苦難與上帝的沈默。
    請用溫暖、睿智、不過度教條化的傳統中文回答，長度約 150-200 字。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `課程提問：${userQuestion}\n學習者的回應：${userInput}\n請給予啟發性的反思回饋。`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "智慧的言語如同金蘋果落在銀網子裡。讓我們在安靜中繼續思考。";
  }
};

/**
 * Generates audio narration for a given text using gemini-2.5-flash-preview-tts
 * Returns base64 encoded PCM data.
 */
export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `請用溫暖且具啟發性的語氣朗讀以下內容：${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is suitable for clear narration
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return undefined;
  }
};
