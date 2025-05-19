// Constants
const MIN_RESPONSE_TIME_MS = 5000;

//
//
//

/**
 * 주어진 시간만큼 대기하는 유틸리티 함수
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 최소 응답 시간을 보장하는 유틸리티 함수
 */
export async function ensureMinimumResponseTime(
  startTime: number,
  minResponseTimeMs = MIN_RESPONSE_TIME_MS
): Promise<void> {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = minResponseTimeMs - elapsedTime;

  if (remainingTime > 0) {
    await delay(remainingTime);
  }
}
