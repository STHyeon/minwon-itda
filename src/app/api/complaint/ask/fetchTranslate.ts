import { GoogleGenAI } from '@google/genai';

//
//
//

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * 번역 API
 */
export async function fetchTranslate(keyword: string) {
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Translate this text to Korean. Return only the translation without any explanations or notes:
${keyword}`,
    });

    return response.text ?? '';
  } catch (error) {
    console.error('번역 API 요청 오류:', error);

    return '';
  }
}
