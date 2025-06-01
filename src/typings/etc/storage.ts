import type { ComplaintApiResponse, PolicyQnAItemData } from '../api';

//
//
//

export interface SavingStorageData {
  policyQnaItem: PolicyQnAItemData | null;
  recommendAgencies: ComplaintApiResponse[];
}

export interface SavingStorage {
  id: string;
  question: string;
  data: SavingStorageData;
}
