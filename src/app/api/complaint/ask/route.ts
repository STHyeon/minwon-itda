import { getSimilarPolicy } from './getSimilarPolicy';

import type { NextRequest } from 'next/server';
import type { LanguageType } from '@/typings/enums';

import { ensureMinimumResponseTime } from '@/lib/time-utils';
import { LANGUAGE } from '@/typings/enums';

//
//
//

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  const searchParams = request.nextUrl.searchParams;
  const reqKeyword = searchParams.get('keyword') || '';
  const reqLanguage = (searchParams.get('language') ||
    LANGUAGE.KO) as LanguageType;

  try {
    // 인천광역시내 민원과 관련된 기관 추천
    // const recommendAgencies = await fetchRecommendAgencies(reqKeyword);
    const recommendAgencies: any[] = [];

    // 국민신문고 민원 목록 중 질문과 가장 유사한 민원 아이템 조회
    const policyQnaItem = await getSimilarPolicy(reqKeyword, reqLanguage);

    await ensureMinimumResponseTime(startTime);

    return Response.json({ data: { recommendAgencies, policyQnaItem } });
  } catch (error) {
    console.error('API 요청 오류:', error);
    await ensureMinimumResponseTime(startTime);

    return Response.json(
      { error: '데이터를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
