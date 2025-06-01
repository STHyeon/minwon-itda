import type { PolicyQnAItemResponse } from '@/typings/api';
import type { DutySctnNm } from '@/typings/enums';

//
//
//

interface FetchPolicyQnaItemProps {
  faqNo: string;
  dutySctnNm: DutySctnNm;
}

//
//
//

const SERVER_BASE_URL = process.env.PUBLIC_DATA_SERVER_URL || '';
const SERVER_REQUEST_URL = '/1140100/CivilPolicyQnaService/PolicyQnaItem';
const API_KEY = process.env.PUBLIC_DATA_API_KEY || '';

//
//
//

export async function fetchPolicyQnaItem({
  faqNo,
  dutySctnNm,
}: FetchPolicyQnaItemProps) {
  const requestURL = new URL(SERVER_REQUEST_URL, SERVER_BASE_URL);

  requestURL.searchParams.append('serviceKey', API_KEY);
  requestURL.searchParams.append('dutySctnNm', dutySctnNm);
  requestURL.searchParams.append('faqNo', faqNo);

  try {
    const response = await fetch(requestURL.toString());
    const data = (await response.json()) as PolicyQnAItemResponse;

    return data;
  } catch (error) {
    console.error('국민신문고 민원 아이템 조회 API 요청 오류:', error);

    throw error;
  }
}
