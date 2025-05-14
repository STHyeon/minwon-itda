export const ROUTES = {
  home: '/',
  complaintAsk: '/complaint/ask',
  complaintAskDetail: (complaintId: string) => `/complaint/${complaintId}`,
} as const;
