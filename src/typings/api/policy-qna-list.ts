import type { DutySctnNm } from '../enums';

//
//
//

export interface PolicyQnAListItem {
  dutySctnNm: DutySctnNm;
  ancCode: string;
  ancName: string;
  regDate: string;
  title: string;
  faqNo: string;
}

export interface PolicyQnAListResponse {
  resultCode: string;
  resultMessage: string;
  resultCount: string;
  resultList: PolicyQnAListItem[];
  resultDebug: string;
}
