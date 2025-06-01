import { fetchPolicyQnaItem } from '../complaint/ask/fetchPolicyQnaItem';
import { fetchPolicyQnaList } from '../complaint/ask/fetchPolicyQnaList';
import { compareSentenceSimilarity } from './compareSentenceSimilarity';
import { translateText } from './translateText';

import type { LanguageType } from '@/typings/enums';

import { LANGUAGE } from '@/typings/enums';

//
//
//

/**
 *
 */
function translateKoreanToTargetLanguage(
  text: string,
  targetLanguage: LanguageType
) {
  return translateText({
    text,
    sourceLanguage: LANGUAGE.KO,
    targetLanguage,
  });
}

/**
 *
 */
export async function getSimilarPolicy(
  reqKeyword: string,
  reqLanguage: (typeof LANGUAGE)[keyof typeof LANGUAGE]
) {
  // ========== 민원 키워드 번역 ==========

  const translatedKeywordKorean = translateText({
    text: reqKeyword,
    sourceLanguage: reqLanguage,
    targetLanguage: LANGUAGE.KO,
  });

  // ========== 국민신문고 민원 목록 조회 ==========

  const rawPolicyQnaList = await fetchPolicyQnaList(translatedKeywordKorean);

  if (rawPolicyQnaList.resultCount === '0') {
    return null;
  }

  // 제목에서 질문과 유사도가 높은 민원 3개 조회
  const policyQnaList = rawPolicyQnaList.resultList
    .map(item => ({
      ...item,
      similarity: compareSentenceSimilarity(
        translatedKeywordKorean,
        item.title
      ),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  // ========== 유사도 높은 민원 3가지 상세 데이터 조회 ==========

  const rawPolicyQnaItemList = await Promise.all(
    policyQnaList.map(item =>
      fetchPolicyQnaItem({
        faqNo: item.faqNo,
        dutySctnNm: item.dutySctnNm,
      })
    )
  );

  const policyQnaItemList = rawPolicyQnaItemList
    .flat()
    .map(item => ({
      ...item,
      similarity: compareSentenceSimilarity(
        translatedKeywordKorean,
        [
          item.resultData.qnaTitl,
          item.resultData.qstnCntnCl,
          item.resultData.ansCntnCl,
        ].join(' ')
      ),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  let result = policyQnaItemList?.[0]?.resultData ?? null;

  // ========== 민원 데이터 번역 ==========

  if (result) {
    result = {
      ...result,
      qnaTitl: translateKoreanToTargetLanguage(result.qnaTitl, reqLanguage),
      qstnCntnCl: translateKoreanToTargetLanguage(
        result.qstnCntnCl,
        reqLanguage
      ),
      ansCntnCl: translateKoreanToTargetLanguage(result.ansCntnCl, reqLanguage),
      deptName: translateKoreanToTargetLanguage(result.deptName, reqLanguage),
      lawList: result.lawList.map(item => ({
        ...item,
        fullName: translateKoreanToTargetLanguage(item.fullName, reqLanguage),
      })),
    };
  }

  return result;
}
