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
export async function translateKoreanToTargetLanguage(
  text: string,
  targetLanguage: LanguageType
) {
  return await translateText({
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
  try {
    // ========== 민원 키워드 번역 ==========

    const translatedKeywordKorean = await translateText({
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
      const [
        translatedTitle,
        translatedQuestion,
        translatedAnswer,
        translatedDept,
        translatedLaws,
      ] = await Promise.all([
        translateKoreanToTargetLanguage(result.qnaTitl, reqLanguage),
        translateKoreanToTargetLanguage(result.qstnCntnCl, reqLanguage),
        translateKoreanToTargetLanguage(result.ansCntnCl, reqLanguage),
        translateKoreanToTargetLanguage(result.deptName, reqLanguage),
        Promise.all(
          result.lawList.map(item =>
            translateKoreanToTargetLanguage(item.fullName, reqLanguage)
          )
        ),
      ]);

      result = {
        ...result,
        qnaTitl: translatedTitle,
        qstnCntnCl: translatedQuestion,
        ansCntnCl: translatedAnswer,
        deptName: translatedDept,
        lawList: result.lawList.map((item, index) => ({
          ...item,
          fullName: translatedLaws[index],
        })),
      };
    }

    return result;
  } catch {
    return null;
  }
}
