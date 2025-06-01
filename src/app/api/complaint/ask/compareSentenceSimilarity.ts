interface TermFrequency {
  [term: string]: number;
}

interface InverseDocumentFrequency {
  [term: string]: number;
}

interface TermVector {
  [term: string]: number;
}

//
//
//

/**
 *
 */
function tokenize(text: string): string[] {
  return text
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
}

/**
 *
 */
function getTF(tokens: string[]): TermFrequency {
  const tf: TermFrequency = {};
  tokens.forEach((t: string) => {
    tf[t] = (tf[t] || 0) + 1;
  });
  const len = tokens.length;
  Object.keys(tf).forEach((t: string) => {
    tf[t] /= len;
  });
  return tf;
}

/**
 *
 */
function getIDF(docs: string[][]): InverseDocumentFrequency {
  const idf: InverseDocumentFrequency = {};
  const totalDocs = docs.length;
  const allTerms = [...new Set(docs.flat())];
  allTerms.forEach((term: string) => {
    const count = docs.filter(doc => doc.includes(term)).length;
    idf[term] = Math.log((totalDocs + 1) / (count + 1)) + 1;
  });
  return idf;
}

/**
 *
 */
function getVector(
  tf: TermFrequency,
  idf: InverseDocumentFrequency,
  terms: string[]
): TermVector {
  const vec: TermVector = {};
  terms.forEach((term: string) => {
    vec[term] = (tf[term] || 0) * (idf[term] || 0);
  });
  return vec;
}

/**
 *
 */
function cosineSimilarity(
  vecA: TermVector,
  vecB: TermVector,
  terms: string[]
): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  terms.forEach((t: string) => {
    dot += (vecA[t] || 0) * (vecB[t] || 0);
    normA += (vecA[t] || 0) ** 2;
    normB += (vecB[t] || 0) ** 2;
  });
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 *
 */
function wordOverlap(tokensA: string[], tokensB: string[]): number {
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  const common = [...setA].filter(t => setB.has(t));
  return common.length / Math.max(setA.size, setB.size);
}

/**
 * 두 문장의 유사도를 계산하여 0~1 사이 점수를 반환합니다.
 * @param base - 기준 문장
 * @param target - 비교 대상 문장
 * @returns 유사도 점수 (0.0 ~ 1.0)
 */
export function compareSentenceSimilarity(
  base: string,
  target: string
): number {
  const tokensBase = tokenize(base);
  const tokensTarget = tokenize(target);
  const docs = [tokensBase, tokensTarget];

  const idf = getIDF(docs);
  const allTerms = Object.keys(idf);

  const tfBase = getTF(tokensBase);
  const tfTarget = getTF(tokensTarget);

  const vecBase = getVector(tfBase, idf, allTerms);
  const vecTarget = getVector(tfTarget, idf, allTerms);

  const cosine = cosineSimilarity(vecBase, vecTarget, allTerms);
  const overlap = wordOverlap(tokensBase, tokensTarget);

  const score = 0.7 * cosine + 0.3 * overlap;

  return score;
}
