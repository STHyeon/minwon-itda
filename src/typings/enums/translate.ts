export const LANGUAGE = {
  KO: 'ko',
  EN: 'en',
  JA: 'ja',
  ZH: 'zh',
} as const;

export type LanguageType = (typeof LANGUAGE)[keyof typeof LANGUAGE];
