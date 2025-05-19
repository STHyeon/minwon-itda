export interface SimilarInfoResponse {
  title: string;
  content: string;
  createDate: string;
  mainSubName?: string;
  depName?: string;
}

export interface ComplaintApiResponse {
  similarItems: SimilarInfoResponse[];
  hasMore: boolean;
}

export interface StorageItem {
  id: string;
  title: string;
  description: string;
  data: SimilarInfoResponse[];
}
