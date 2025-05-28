export interface ComplaintApiResponse {
  ministry: string;
  facility: string;
  organizationName: string;
  address: string;
  tel: string;
}

export interface StorageItem {
  id: string;
  question: string;
  data: ComplaintApiResponse[];
}
