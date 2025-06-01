import type { PolicyQnAItemResponse } from '@/typings/api';

import { DutySctnNm } from '@/typings/enums';

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

const data: PolicyQnAItemResponse[] = [
  {
    resultCode: 'S00',
    resultMessage: '1(건) 조회되었습니다.',
    resultData: {
      faqNo: '6882723',
      dutySctnNm: DutySctnNm.TQAPTTN,
      qnaTitl: '주민등록증재발급 대리수령 가능여부',
      qstnCntnCl: '주민등록증 대리수령이 가능한가요?',
      ansCntnCl:
        '1. 본인이 방문하여 발급신청한 경우에는 17세 이상의 동일 세대원, 배우자, 직계혈족이 대리수령 할 수 있습니다.' +
        '2. 단, 정부24를 통해 신청한 경우, 반드시 본인 수령만 가능합니다.',
      ancName: '법무부',
      deptName: '법무부 대전출입국.외국인사무소 관리과',
      regDate: '20250509',
      ancCode: '1270000',
      deptCode: '1272523',
      lawList: [],
    },
    resultDebug: '2025-05-01 19:01:07, eapi11',
  },
  {
    resultCode: 'S00',
    resultMessage: '1(건) 조회되었습니다.',
    resultData: {
      faqNo: '6882723',
      dutySctnNm: DutySctnNm.TQAPTTN,
      qnaTitl: '주소지가 아닌 곳에서 주민등록증 재발급을 할 수 있나요?',
      qstnCntnCl: '주소지가 아닌 곳에서 주민등록증 재발급을 할 수 있나요?',
      ansCntnCl:
        '1. 귀하의 민원내용은 "주민등록증 재발급 신청기관"에 관한 것으로 이해됩니다.' +
        '2. 귀하의 질의사항에 대해 검토한 의견은 다음과 같습니다.' +
        '가. 주민등록증 재발급은 전국 어디서나 가까운 행정복지센터를 방문하여 신청하시거나, 정부24 홈페이지를 통해 방문 없이 온라인으로도 신청하실 수 있습니다.' +
        '나. 또한 주민등록증 수령의 경우, 수령기관을 신청기관과 다른 행정복지센터로 신청 하실 수 있고, 우편 수수료를 납부하시면 등기로 증 수령이 가능합니다.' +
        '3. 답변 내용에 대한 추가 설명이 필요한 경우 고덕면 민원팀(☏041-339-8822)으로 연락주시면 친절히 안내해드리도록 하겠습니다. 감사합니다.',
      ancName: '법무부',
      deptName: '법무부 대전출입국.외국인사무소 관리과',
      regDate: '20250509',
      ancCode: '1270000',
      deptCode: '1272523',
      lawList: [],
    },
    resultDebug: '2025-05-01 19:01:07, eapi11',
  },
  {
    resultCode: 'S00',
    resultMessage: '1(건) 조회되었습니다.',
    resultData: {
      faqNo: '6882723',
      dutySctnNm: DutySctnNm.TQAPTTN,
      qnaTitl: '주민등록증 재발급 방법',
      qstnCntnCl: '주민등록증을 분실했습니다. 어떻게 재발급 받을 수 있나요?',
      ansCntnCl:
        '○ 귀하의 가정에 행복을 기원합니다.' +
        '○ 귀하께서 국민신문고를 통해 접수한 민원 내용은 ‘주민등록증 재발급’인 것으로 판단됩니다.' +
        '○ 주민등록증 분실, 훼손 등의 사유로 주민등록증을 재발급 받고자 할 경우,' +
        '본인이 직접 사진 1매(6개월 이내에 촬영한 가로 3.5센티미터, 세로 4.5센티미터의 모자 등을 쓰지 않은 상반신 사진)를 지참하시어 인근 주민센터에 방문하여 별지 제32호서식에 따라 주민등록증 재발급 신청서를 작성합니다. 단, 중증장애인은 본인, 법정대리인, 보호자가 신청할 수 있습니다.' +
        "○ 이 때, '발급신청 확인서 신청'에 체크하시면 재발급되는 기간 동안 신분증으로 사용하실 수 있는 발급신청 확인서가 교부됩니다." +
        '○ 신청한 주민등록증은 방문· 등기 수령(본인 수령만 가능) 선택이 가능하며, 평일 기준 21~28일 정도 소요됩니다.' +
        '○ 수수료는 IC칩 미포함: 5,000원 / IC칩 포함: 10,000원 이며, 등기 수령의 경우 추가 수수료가 부과됩니다.' +
        '○ 기타 궁금하신 사항은 교현2동주민센터 민원실 (043-850-2458, 2455)로 연락주시면 성심껏 답변해 드리겠습니다. 감사합니다.' +
        '○ 민원행정의 개선을 위해 처리결과에 대한 만족도 평가에 참여 부탁드립니다. ',
      ancName: '법무부',
      deptName: '법무부 대전출입국.외국인사무소 관리과',
      regDate: '20250509',
      ancCode: '1270000',
      deptCode: '1272523',
      lawList: [],
    },
    resultDebug: '2025-05-01 19:01:07, eapi11',
  },
  {
    resultCode: 'S00',
    resultMessage: '1(건) 조회되었습니다.',
    resultData: {
      faqNo: '6876871',
      dutySctnNm: DutySctnNm.TQAPTTN,
      qnaTitl: '모바일주민등록증(IC칩 주민등록증) 발급',
      qstnCntnCl: '모바일 주민등록증 신청 대상 및 발급 비용 문의',
      ansCntnCl:
        '○신청대상 : 주민등록증을 발급받은 17세 이상 국민이면 누구나 신청' +
        '※17세(2025년 기준 2008년 출생자)가 되는 주민등록증 최초 발급자는 ' +
        'IC칩 내장된 주민등록증 무료 발급 가능' +
        '※이미 주민등록증을 발급받은 사람은 주민등록증 재발급 비용 5천원 +  IC칩 내장칩 비용 5천원 = 1만원 수수료  비용 발생되어 발급' +
        '※2006년 11월 이전 주민등록 소지자는 재발급 비용 무료+ IC칩 내장칩 비용 5천원 = 5천원 수수료 발생' +
        '※QR발급 무료',
      ancName: '서울특별시 동대문구',
      deptName: '서울특별시 동대문구 휘경1동',
      regDate: '20240830',
      ancCode: '3050000',
      deptCode: '3050061',
      lawList: [],
    },
    resultDebug: '2025-05-01 19:01:07, eapi21',
  },
];

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
    // const response = await fetch(requestURL.toString());
    // const data = (await response.json()) as PolicyQnAItemResponse;

    return data;
  } catch (error) {
    console.error('국민신문고 민원 아이템 조회 API 요청 오류:', error);

    throw error;
  }
}
