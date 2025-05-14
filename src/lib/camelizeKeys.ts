import { camelCase } from 'lodash-es';

/**
 * 객체의 모든 키를 camelCase로 변환합니다.
 * 중첩된 객체와 배열도 재귀적으로 처리합니다.
 */
export const camelizeKeys = <T>(obj: unknown): T => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v)) as unknown as T;
  } else if (obj != null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (result: Record<string, unknown>, key: string) => ({
        ...result,
        [camelCase(key)]: camelizeKeys((obj as Record<string, unknown>)[key]),
      }),
      {} as Record<string, unknown>
    ) as unknown as T;
  }
  return obj as T;
};
