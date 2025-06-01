import dayjs from 'dayjs';

import type { PolicyQnAListResponse } from '@/typings/api';

//
//
//

const SERVER_BASE_URL = process.env.PUBLIC_DATA_SERVER_URL || '';
const SERVER_REQUEST_URL = '/1140100/CivilPolicyQnaService/PolicyQnaList';
const API_KEY = process.env.PUBLIC_DATA_API_KEY || '';

const RET_PAGE = '1'; // 페이지번호
const RET_COUNT = '10'; // 한 페이지 결과 수, 기본10
const RET_TYPE = '1'; // 1:민원, 2:정책, 3:민원+정책
const RET_SEARCH_TYPE = '1'; // 1:제목, 2:내용

//
//
//

export async function fetchPolicyQnaList(keyword: string) {
  const requestURL = new URL(SERVER_REQUEST_URL, SERVER_BASE_URL);
  const regTo = dayjs().subtract(1, 'day').format('YYYYMMDD');
  const regFrom = dayjs(regTo).subtract(3, 'year').format('YYYYMMDD');

  requestURL.searchParams.append('serviceKey', API_KEY);
  requestURL.searchParams.append('firstIndex', RET_PAGE);
  requestURL.searchParams.append('recordCountPerPage', RET_COUNT);
  requestURL.searchParams.append('type', RET_TYPE);
  requestURL.searchParams.append('searchType', RET_SEARCH_TYPE);
  requestURL.searchParams.append('keyword', keyword);
  requestURL.searchParams.append('regFrom', regFrom);
  requestURL.searchParams.append('regTo', regTo);

  try {
    const response = await fetch(requestURL.toString());
    const data = (await response.json()) as PolicyQnAListResponse;

    return data;
  } catch (error) {
    console.error('국민신문고 민원 리스트 조회 API 요청 오류:', error);

    throw error;
  }
}
