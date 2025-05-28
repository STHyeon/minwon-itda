import { GoogleGenAI } from '@google/genai';

import jsonIncheonMinistry from '@/assets/etc/incheon-ministry.json';
import { extractJsonArray } from '@/lib/extract-json-array';

//
//
//

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 *
 */
export async function findRecommendMinistry(question: string) {
  try {
    const contents = `
    다음 민원 내용을 분석하여 해결할 수 있는 인천광역시 기관을 최대 10개 추천해주세요.
    민원 내용: ${question}
    다음 JSON 데이터에서 관련 기관을 찾아주세요:
    ${JSON.stringify(jsonIncheonMinistry)}

    응답은 다음 형식의 JSON 배열로 해주세요. 키값은 항상 camelCase로 해주세요. (예시):
    [
      {
        "ministry": "행정기관",
        "facility": "미추홀구청",
        "organizationName": "인천광역시 미추홀구 미추홀구청",
        "address": "인천광역시 미추홀구 독정이로 95",
        "tel": "032-887-1011"
      }
    ]
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
    });
    const jsonArray = extractJsonArray(response.text ?? '');

    return jsonArray;
  } catch (error) {
    console.error('기관 추천 API 요청 오류:', error);

    throw error;
  }
}
