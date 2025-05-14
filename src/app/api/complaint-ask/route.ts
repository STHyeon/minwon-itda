import type { NextRequest } from 'next/server';
import type {
  ComplaintApiResponse,
  SimilarInfoResponse,
} from '@/typings/complaint-ask';

import { camelizeKeys } from '@/lib/camelizeKeys';

//
//
//

const SERVER_URL = process.env.PUBLIC_DATA_SERVER_URL || '';
const API_KEY = process.env.PUBLIC_DATA_API_KEY || '';

const PAGE_COUNT = '20';
const MIN_RESPONSE_TIME_MS = 5000; // 최소 5초 응답 시간

/**
 * 주어진 시간만큼 대기하는 유틸리티 함수
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 유사 사례 검색 API 요청
 */
export async function GET(request: NextRequest) {
  // 시작 시간 기록
  const startTime = Date.now();

  const searchParams = request.nextUrl.searchParams;
  const reqKeyword = searchParams.get('keyword') || '';
  const reqPage = searchParams.get('page') || '1';

  const requestURL = new URL(SERVER_URL);
  requestURL.searchParams.append('serviceKey', API_KEY);
  requestURL.searchParams.append('startPos', reqPage);
  requestURL.searchParams.append('retCount', PAGE_COUNT);
  requestURL.searchParams.append('searchword', reqKeyword);
  requestURL.searchParams.append('target', 'qna,qna_origin');

  try {
    // const response = await fetch(requestURL.toString());
    // const data = await response.json();

    // 임시 샘플 데이터 (실제로는 API 응답 사용)
    const data = [
      {
        title: '우대용교통카드 발급 문의',
        content: '우대용교통카드는 어떻게 발급받을 수 있을까요?',
        create_date: '20240719205119',
        main_sub_name: '서울특별시 강동구',
        dep_name: '암사1동',
      },
      {
        title: '민원처리 현황 확인',
        content: '제가 신청한 민원은 언제 처리되나요?',
        create_date: '20240719204532',
        main_sub_name: '서울특별시 강남구',
        dep_name: '역삼2동',
      },
    ];

    // camelizeKeys 함수를 사용하여 키를 camelCase로 변환
    const convertedData = camelizeKeys<SimilarInfoResponse[]>(data);

    // 페이지 크기보다 데이터가 적으면 hasMore = false
    const hasMore = convertedData.length >= parseInt(PAGE_COUNT);

    // 응답 객체 생성
    const responseData: ComplaintApiResponse = {
      data: convertedData,
      hasMore,
    };

    // 경과 시간 계산 및 필요한 지연 시간 계산
    const elapsedTime = Date.now() - startTime;
    const remainingTime = MIN_RESPONSE_TIME_MS - elapsedTime;

    // 최소 10초가 되지 않았다면 지연 적용
    if (remainingTime > 0) {
      await delay(remainingTime);
    }

    // 캐싱 설정 (24시간)
    return new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control':
          'max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API 요청 오류:', error);

    // 에러가 발생해도 최소 10초 응답 시간 유지
    const elapsedTime = Date.now() - startTime;
    const remainingTime = MIN_RESPONSE_TIME_MS - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }

    return Response.json(
      { error: '데이터를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
