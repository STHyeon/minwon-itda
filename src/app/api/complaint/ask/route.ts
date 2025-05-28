import { findRecommendMinistry } from './findRecommendMinistry';

import type { NextRequest } from 'next/server';

import { ensureMinimumResponseTime } from '@/lib/time-utils';

//
//
//

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  const searchParams = request.nextUrl.searchParams;
  const reqKeyword = searchParams.get('keyword') || '';

  try {
    const recommendMinistry = await findRecommendMinistry(reqKeyword);

    await ensureMinimumResponseTime(startTime);

    return Response.json({ data: recommendMinistry });
  } catch (error) {
    console.error('API 요청 오류:', error);
    await ensureMinimumResponseTime(startTime);

    return Response.json(
      { error: '데이터를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
