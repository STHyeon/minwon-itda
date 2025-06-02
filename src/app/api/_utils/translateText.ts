import * as deepl from 'deepl-node';

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

const DEEPL_API_KEY = process.env.DEEPL_API_KEY ?? '';

//
//
//

const deeplClient = new deepl.DeepLClient(DEEPL_API_KEY);

//
//
//

export async function translateText(raw: TranslateTextProps) {
  const { text, sourceLanguage, targetLanguage } = raw;

  // 소스 언어와 목표 언어가 같으면 원본 텍스트 반환
  if (sourceLanguage === targetLanguage) {
    return text;
  }

  try {
    const translation = await deeplClient.translateText(
      text,
      null,
      targetLanguage as deepl.TargetLanguageCode
    );

    return translation.text;
  } catch {
    return text;
  }
}
