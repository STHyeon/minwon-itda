import { TfIdf } from 'natural';

import { fetchPolicyQnaItem } from './fetchPolicyQnaItem';
import { fetchPolicyQnaList } from './fetchPolicyQnaList';

import type { LanguageType } from '@/typings/enums';

import { translateText } from '@/lib/translateText';
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
 * 두 문자열의 유사도를 계산
 */
function calculateSimilarity(base: string, target: string[]) {
  const tfidf = new TfIdf();
  let similarity = 0;

  tfidf.addDocument(base);
  target.map(item => tfidf.addDocument(item));

  console.log('base', base);
  tfidf.tfidfs(base, function (i, measure) {
    console.log('document #' + i + ' is ' + measure);
    if (i === 1) {
      similarity = measure;
    }
  });

  // tfidf.addDocument('this document is about node.');
  // tfidf.addDocument('this document is about ruby.');
  // tfidf.addDocument('this document is about ruby and node.');

  // tfidf.tfidfs('node ruby', function (i, measure) {
  //   console.log('document #' + i + ' is ' + measure);
  // });

  return similarity;
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

  // const rawPolicyQnaList = await fetchPolicyQnaList(translatedKeywordKorean);
  const rawPolicyQnaList = {
    resultCode: 'S00',
    resultMessage: '2(건) 조회되었습니다.',
    resultCount: '2',
    resultList: [
      {
        dutySctnNm: 'tqapttn',
        ancCode: '1270000',
        ancName: '법무부',
        regDate: '20250509140836',
        title: '외국인등록증 갱신 서류 및 방문예약 문의',
        faqNo: '6882723',
      },
      {
        dutySctnNm: 'tqapttn',
        ancCode: '3050000',
        ancName: '서울특별시 동대문구',
        regDate: '20240830165108',
        title: '외국인등록증이 없는 외국인은 임대차신고를 할 수 없나요?',
        faqNo: '6876871',
      },
    ],
    resultDebug: '2025-05-01 19:01:07, eapi22',
  };

  // console.log('rawPolicyQnaList', rawPolicyQnaList);

  if (rawPolicyQnaList.resultCount === '0') {
    return null;
  }

  // 제목에서 질문과 유사도가 높은 민원 3개 조회
  const policyQnaList = rawPolicyQnaList.resultList
    .map(item => ({
      ...item,
      similarity: calculateSimilarity(translatedKeywordKorean, [item.title]),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  // console.log('policyQnaList', policyQnaList);

  // ========== 유사도 높은 민원 3가지 상세 데이터 조회 ==========

  // const rawPolicyQnaItemList = await Promise.all(
  //   policyQnaList.map(item =>
  //     fetchPolicyQnaItem({
  //       faqNo: item.faqNo,
  //       dutySctnNm: item.dutySctnNm,
  //     })
  //   )
  // );
  const rawPolicyQnaItemList = [
    {
      resultCode: 'S00',
      resultMessage: '1(건) 조회되었습니다.',
      resultData: {
        faqNo: '6882723',
        dutySctnNm: 'tqapttn',
        qnaTitl: '외국인등록증 갱신 서류 및 방문예약 문의',
        qstnCntnCl:
          '장모님이 아이돌봄 으로 외국인 등록증을 발급받아서\n' +
          '체류 중인데 올해 3월 갱신을 해야 합니다.\n' +
          '갱신에 필요한 서류가 어떻게 되나요?\n' +
          '장모님이 직접 방문하지 않고 제가 대리해서 갱신 할 수 있다는 는데\n' +
          '맞나요?? 위임장 서류는 어디서 다운받을수 있나요?\n' +
          '하이코리아 예약자를 저로 해야 하나요? 아니면 장모님으로 해야 하나요?',
        ansCntnCl:
          '1. 안녕하십니까 ?&lt;br /&gt;\n' +
          '먼저, 귀하의 소중한 민원제보와 출입국관리 업무에 대한 관심에 감사드립니다.&lt;br /&gt;\n' +
          '&lt;br /&gt;\n' +
          '2. 귀하의 민원요지는 ①국내에 체류 중인 장모님의 비자연장 구 비서류, ②위임신청시 하이코리아 예약자 지정에 대한 문의로 이해되며, 귀하의 민원에 대한 검토 결과를 다음과 같이 답변드립니다.&lt;br /&gt;\n' +
          '&lt;br /&gt;\n' +
          '3. 상기 ①번 질의 F-1-5(결혼이민자의 가족)비자 연장에 필요한 서류입니다.&lt;br /&gt;\n' +
          '① 통합신청서(별지 34호)&lt;br /&gt;\n' +
          '② 여권 및 외국인등록증 원본&lt;br /&gt;\n' +
          '③ 수수료(기간연장 6만원)&lt;br /&gt;\n' +
          '④ 비취업서약서(별도 서식)&lt;br /&gt;\n' +
          '⑤ 체류지 입증서류 : 초청인 또는 양육지원 대상 자녀의 주민등 록표(등본)으로 대체 가능&lt;br /&gt;\n' +
          '⑥ 초청인(한국인) 관련 서류 : 3개월 이내 발급된 서류 제출(상 세증명서 발급 권장)- 한국인 배우자의 기본증명서, 가족관계증명서, 혼인관계증명서, 주민등록표(등본)- 자녀명의 가족관계증명서(임신한 경우 임 신진단서 또는 산모수첩)※ 자녀가 2명 이상일 경우에는 모든 자녀의 가족 관계증명서 제출※ 자녀가 양자인 경우 초청인의 입양관계증명서 추가 제출&lt;br /&gt;\n' +
          '⑦ 초청인이 한부모 가족인 경우(해당자만 준비)- 자녀명의 기본 증명서, 가족관계증명서, 주민등록표(등본), (전)배우자와의 혼인관계증명서 ※ 자녀가 2명 이상일 경우에는 모든 자녀의 가족관계증명서 제출※ 자녀가 양자인 경우 초청인의 입양관계증명서 추가 제출&lt;br /&gt;\n' +
          '※ 필요시 자녀 양육 소명 자료(예, 협의 이혼 시 자녀의 양육권 관련 협의서,재판이혼 시 법원의 판결문 또는 조정조서 등)를 추가 요구할 수 있음.&lt;br /&gt;\n' +
          '⑧인도적 사정이 있는 결혼이민 가정 지원 목적인 경우 추가서류&lt;br /&gt;\n' +
          '㉠중증질환인 경우 : 중증질환(중증난치질환) 또는 산정특례사실이 기재된 진료비 영수증&lt;br /&gt;\n' +
          '㉡중증장애인 경우 : 장애인증명서 등- 장애인증명서의 종합 장 애 정도란에 중증장애 또는 장애 정도가 심한 장애로 기재- 장애인증명서 등 (장애인증명서의 종합 장애 정도란에 중증장애 또는 장애정도가 심한  장애로 기재되어 있을 경우 중증장애로 인정)&lt;br /&gt;\n' +
          '&lt;br /&gt;\n' +
          '4. 상기 ②번 질의에 대한 답변입니다.&lt;br /&gt;\n' +
          '장모님이 직접 방문하지 못하시는 경우에는 대리신청이 가능하나 위임장, 가족관계증명서를 지참하셔야 하며 위임장 서식은 하이코리아(네이버검색 조회) - 민원서식에서 다운받아 사용&lt;br /&gt;\n' +
          '하실 수 있습니다. 또한, 대리신청 시에는 하이코리아 예약자를 민원업무 처리대상인 외국인을 실명으로 지정하셔야 함을 알려드립니다.&lt;br /&gt;\n' +
          '&lt;br /&gt;\n' +
          '5.&nbsp;귀하의 질문에 만족스러운 답변이 되었기를 바랍니다.  감사합니다.',
        ancName: '법무부',
        deptName: '법무부 대전출입국.외국인사무소 관리과',
        regDate: '20250509',
        ancCode: '1270000',
        deptCode: '1272523',
        lawList: [],
        subjList: [],
      },
      resultDebug: '2025-05-01 19:01:07, eapi11',
    },
    {
      resultCode: 'S00',
      resultMessage: '1(건) 조회되었습니다.',
      resultData: {
        faqNo: '6876871',
        dutySctnNm: 'tqapttn',
        qnaTitl: '외국인등록증이 없는 외국인은 임대차신고를 할 수 없나 요?',
        qstnCntnCl:
          '외국인등록증 만드는 데 시간이 오래 걸려요. 계약서 쓰고 30일 안에 임대차 신고할 수 없어요. 외국인등록번호없는데 신고를  어떻게 하나요?',
        ansCntnCl:
          '- 임대차 신고는 내외국인을 구분하지 않습니다. 내외 국인 모두 임대차 신고의무자입니다. (부동산 거래신고 등에 관한 법률 제2조제3호의2)&lt;br /&gt;\n' +
          '&lt;br /&gt;\n' +
          '- 임대차 계약서에 임차인의 외국인등록번호가 없어 기재할 수  없는 경우, 임차인의 생년월일과 여권번호를 기재하여 작성하고, 외국인  본인이 계약서와 여권을 가지고 계약물건지 관할 읍/면/동 주민센터에 방 문하시면 외국인등록증이 없더라도 임대차신고가 가능합니다.&nbsp;&nbsp;',
        ancName: '서울특별시 동대문구',
        deptName: '서울특별시 동대문구 휘경1동',
        regDate: '20240830',
        ancCode: '3050000',
        deptCode: '3050061',
        lawList: [],
        subjList: [],
      },
      resultDebug: '2025-05-01 19:01:07, eapi21',
    },
  ];

  const policyQnaItemList = rawPolicyQnaItemList
    .map(item => ({
      ...item,
      similarity: calculateSimilarity(translatedKeywordKorean, [
        item.resultData.qnaTitl,
        item.resultData.qstnCntnCl,
        item.resultData.ansCntnCl,
      ]),
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
      // lawList: result.lawList.map(item => ({
      //   ...item,
      //   fullName: translateKoreanToTargetLanguage(item.fullName, reqLanguage),
      // })),
    };
  }

  return result;
}
