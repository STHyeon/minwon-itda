import { GoogleGenAI } from '@google/genai';

import jsonIncheonMinistry from '@/assets/etc/incheon-ministry.json';
import { extractJsonArray } from '@/lib/extract-json-array';

//
//
//

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are an assistant that analyzes complaints and recommends relevant government organizations. You receive a complaint and a list of government organizations, and respond with the most relevant organizations that can help resolve the complaint.

Your response must be a JSON array containing up to 10 organizations. An organization object has the following schema:

* ministry: The translated name of the ministry/department
* facility: The translated name of the specific facility
* organizationName: The translated full name of the organization
* address: The translated address
* originalAddress: The original address in Korean (must be kept as is)
* tel: The original telephone number (must be kept as is)

Rules:
1. Detect the language of the input complaint and translate all fields except 'originalAddress' and 'tel' into that same language
   - If the complaint is in English, translate to English
   - If the complaint is in Japanese, translate to Japanese
   - If the complaint is in Thai, translate to Thai
   - And so on for other languages
2. Keep 'originalAddress' and 'tel' fields in their original Korean form
3. Use camelCase for all keys
4. Sort organizations by relevance to the complaint
5. Include only organizations that are directly related to the complaint

Example responses:

For English input:
[
  {
    "ministry": "Administrative Agency",
    "facility": "Mansu 6-dong Administrative Welfare Center",
    "organizationName": "Incheon Metropolitan City Namdong-gu Mansu 6-dong Administrative Welfare Center",
    "address": "47, Jangseungnam-ro, Namdong-gu, Incheon (Mansu-dong)",
    "originalAddress": "인천광역시 남동구 장승남로 47(만수동)",
    "tel": "032-453-5480"
  }
]

For Japanese input:
[
  {
    "ministry": "行政機関",
    "facility": "万寿6洞行政福祉センター",
    "organizationName": "仁川広域市南洞区万寿6洞行政福祉センター",
    "address": "仁川広域市南洞区長承南路47(万寿洞)",
    "originalAddress": "인천광역시 남동구 장승남로 47(만수동)",
    "tel": "032-453-5480"
  }
]`;

/**
 *
 */
export async function findRecommendMinistry(question: string) {
  try {
    const contents = `
Please analyze the following complaint and recommend up to 10 organizations that can help resolve it.
Complaint: ${question}

Please find relevant organizations from the following JSON data:
${JSON.stringify(jsonIncheonMinistry)}`;

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
