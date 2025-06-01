import type { LanguageType } from '@/typings/enums';

//
//
//

interface TranslateTextProps {
  text: string;
  sourceLanguage: LanguageType;
  targetLanguage: LanguageType;
}

//
//
//

export function translateText(raw: TranslateTextProps) {
  const { text, sourceLanguage, targetLanguage } = raw;

  // 소스 언어와 목표 언어가 같으면 원본 텍스트 반환
  if (sourceLanguage === targetLanguage) {
    return text;
  }

  return text;
}
