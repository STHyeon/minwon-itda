import type {
  ComplaintApiResponse,
  SimilarInfoResponse,
} from '@/typings/complaint';

import { camelizeKeys } from '@/lib/camelize-keys';

//
//
//

interface FetchSimilarInfoParams {
  keyword: string;
  page: string;
}

//
//
//

const SERVER_BASE_URL = process.env.PUBLIC_DATA_SERVER_URL || '';
const SERVER_REQUEST_URL = '/1140100/minAnalsInfoView5/minSimilarInfo5';
const API_KEY = process.env.PUBLIC_DATA_API_KEY || '';

const RET_COUNT = '20';
const RET_TARGET = 'qna,qna_origin';
const RET_DATA_TYPE = 'json';

// 임시 샘플 데이터
const data = [
  {
    title: '우대용교통카드 발급 문의',
    content: '우대용교통카드는 어떻게 발급받을 수 있을까요?',
    create_date: '20240719205119',
    main_sub_name: '서울특별시 강동구',
    dep_name: '어르신복지과',
  },
  {
    title: '민원처리 현황 확인',
    content: '제가 신청한 민원은 언제 처리되나요?',
    create_date: '20240719204532',
    main_sub_name: '서울특별시 강남구',
    dep_name: '관리과',
  },
];

//
//
//

/**
 * 유사 사례 검색 API
 */
export async function fetchSimilarInfo({
  keyword,
  page,
}: FetchSimilarInfoParams): Promise<ComplaintApiResponse> {
  const requestURL = new URL(SERVER_REQUEST_URL, SERVER_BASE_URL);

  requestURL.searchParams.append('serviceKey', API_KEY);
  requestURL.searchParams.append('startPos', page);
  requestURL.searchParams.append('retCount', RET_COUNT);
  requestURL.searchParams.append('searchword', keyword);
  requestURL.searchParams.append('target', RET_TARGET);
  requestURL.searchParams.append('dataType', RET_DATA_TYPE);

  try {
    // TODO: 실제 API 호출로 대체
    // const response = await fetch(requestURL.toString());
    // const data = await response.json();

    const convertedData = camelizeKeys<SimilarInfoResponse[]>(data);
    const hasMore = convertedData.length >= parseInt(RET_COUNT);

    return {
      similarItems: convertedData,
      hasMore,
    };
  } catch (error) {
    console.error('Similar Info API 요청 오류:', error);
    throw error;
  }
}
