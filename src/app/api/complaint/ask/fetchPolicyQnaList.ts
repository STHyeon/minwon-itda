import dayjs from 'dayjs';

import type { PolicyQnAListResponse } from '@/typings/api';

import { DutySctnNm } from '@/typings/enums';

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

const data: PolicyQnAListResponse = {
  resultCode: 'S00',
  resultMessage: '2(건) 조회되었습니다.',
  resultCount: '2',
  resultList: [
    {
      dutySctnNm: DutySctnNm.TQAPTTN,
      ancCode: '1270000',
      ancName: '법무부',
      regDate: '20250509140836',
      title: '모바일주민등록증(IC칩 주민등록증) 발급',
      faqNo: '6882723',
    },
    {
      dutySctnNm: DutySctnNm.TQAPTTN,
      ancCode: '3050000',
      ancName: '서울특별시 동대문구',
      regDate: '20240830165108',
      title: '주민등록증 분실신고 및 재발급',
      faqNo: '6876871',
    },
    {
      dutySctnNm: DutySctnNm.TQAPTTN,
      ancCode: '3050000',
      ancName: '서울특별시 동대문구',
      regDate: '20240830165108',
      title: '주소지가 아닌 곳에서 주민등록증 재발급을 할 수 있나요?',
      faqNo: '6876871',
    },
    {
      dutySctnNm: DutySctnNm.TQAPTTN,
      ancCode: '3050000',
      ancName: '서울특별시 동대문구',
      regDate: '20240830165108',
      title: '주민등록증재발급 대리수령 가능여부',
      faqNo: '6876871',
    },
  ],
  resultDebug: '2025-05-01 19:01:07, eapi22',
};

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
    // const response = await fetch(requestURL.toString());
    // const data = (await response.json()) as PolicyQnAListResponse;

    return data;
  } catch (error) {
    console.error('국민신문고 민원 리스트 조회 API 요청 오류:', error);

    throw error;
  }
}
