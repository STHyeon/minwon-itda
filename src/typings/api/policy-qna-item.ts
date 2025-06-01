import type { DutySctnNm } from '../enums';

//
//
//

interface LawItem {
  fullName: string;
  lwrdNm: string;
  lwrdUrl: string;
}

export interface PolicyQnAItemData {
  faqNo: string;
  dutySctnNm: DutySctnNm;
  qnaTitl: string;
  qstnCntnCl: string;
  ansCntnCl: string;
  ancName: string;
  deptName: string;
  regDate: string;
  ancCode: string;
  deptCode: string;
  lawList: LawItem[];
}

export interface PolicyQnAItemResponse {
  resultCode: string;
  resultMessage: string;
  resultData: PolicyQnAItemData;
  resultDebug: string;
}
