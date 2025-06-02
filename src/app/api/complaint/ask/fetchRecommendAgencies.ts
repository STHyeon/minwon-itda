import { GoogleGenAI } from '@google/genai';

import { extractJsonArray } from '../../_utils/extract-json-array';

import type { LanguageType } from '@/typings/enums';

import jsonIncheonAgencies from '@/assets/etc/incheon-agencies.json';

//
//
//

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? '';
const MAX_RECOMMEND_AGENCIES = 3;

//
//
//

const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 *
 */
export async function fetchRecommendAgencies(
  question: string,
  targetLanguage: LanguageType,
  location?: string
) {
  try {
    const contents = `
Please analyze the following complaint and recommend up to ${MAX_RECOMMEND_AGENCIES} organizations that can help resolve it.
Complaint: ${question}`;

    const SYSTEM_INSTRUCTION = `You are an assistant that analyzes complaints and recommends relevant government organizations. You receive a complaint and a list of government organizations, and respond with the most relevant organizations that can help resolve the complaint.

Please find relevant organizations from the following JSON data:
${JSON.stringify(
  location
    ? jsonIncheonAgencies.filter(agency => agency.LGs === location)
    : jsonIncheonAgencies
)}

Your response must be a JSON array containing up to ${MAX_RECOMMEND_AGENCIES} organizations. An organization object has the following schema:

* ministry: The translated name of the ministry/department
* facility: The translated name of the specific facility
* organizationName: The translated full name of the organization
* address: The translated address
* originalAddress: The original address in Korean (must be kept as is)
* tel: The original telephone number (must be kept as is)

Rules:
1. Translate all fields except 'originalAddress' and 'tel' into the target language (${targetLanguage})
2. Keep 'originalAddress' and 'tel' fields in their original Korean form
3. Use camelCase for all keys
4. Sort organizations by relevance to the complaint
5. Include only organizations that are directly related to the complaint

Example response for ${targetLanguage}:
[
  {
    "ministry": "[Translated ministry name in ${targetLanguage}]",
    "facility": "[Translated facility name in ${targetLanguage}]",
    "organizationName": "[Translated organization name in ${targetLanguage}]",
    "address": "[Translated address in ${targetLanguage}]",
    "originalAddress": "인천광역시 남동구 장승남로 47(만수동)",
    "tel": "032-453-5480"
  }
]`;

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    const jsonArray = extractJsonArray(response.text ?? '');

    return jsonArray;
  } catch (error) {
    console.error('기관 추천 API 요청 오류:', error);

    throw error;
  }
}
