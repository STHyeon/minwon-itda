/**
 *
 */
export const extractJsonArray = (text: string): any[] => {
  // 정규식으로 JSON 배열 패턴 찾기
  const match = text.match(/\[\s*\{.*\}\s*\]/s);

  if (match) {
    try {
      // 찾은 배열 문자열을 JSON으로 파싱
      return JSON.parse(match[0]);
    } catch (e) {
      console.error('JSON 파싱 실패:', e);
      return [];
    }
  }

  return [];
};
