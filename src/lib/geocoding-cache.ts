import { AGENCY_GEOCODER_CACHE_KEY } from '@/constants/complaint';

//
//
//

interface GeocodingCache {
  address: string;
  lat: number;
  lng: number;
  timestamp: number;
}

//
//
//

const MAX_CACHE_ITEMS = 100;

//
//
//

export const geocodingCache = {
  // 캐시에서 좌표 찾기
  get: (address: string) => {
    const cachedData = localStorage.getItem(AGENCY_GEOCODER_CACHE_KEY);

    if (!cachedData) {
      return null;
    }

    const cache: GeocodingCache[] = JSON.parse(cachedData);
    const cachedItem = cache.find(item => item.address === address);

    if (cachedItem) {
      // 찾은 항목의 타임스탬프 업데이트
      cachedItem.timestamp = Date.now();
      localStorage.setItem(AGENCY_GEOCODER_CACHE_KEY, JSON.stringify(cache));
      return { lat: cachedItem.lat, lng: cachedItem.lng };
    }

    return null;
  },

  // 캐시에 좌표 저장
  set: (address: string, lat: number, lng: number) => {
    const cachedData = localStorage.getItem(AGENCY_GEOCODER_CACHE_KEY);
    const cache: GeocodingCache[] = cachedData ? JSON.parse(cachedData) : [];

    // 이미 존재하는 주소면 업데이트
    const existingIndex = cache.findIndex(item => item.address === address);
    if (existingIndex !== -1) {
      cache[existingIndex] = { address, lat, lng, timestamp: Date.now() };
    } else {
      // 새로운 주소 추가
      cache.push({ address, lat, lng, timestamp: Date.now() });

      // 최대 개수 초과시 가장 오래된 항목 삭제
      if (cache.length > MAX_CACHE_ITEMS) {
        cache.sort((a, b) => a.timestamp - b.timestamp);
        cache.shift(); // 가장 오래된 항목 제거
      }
    }

    localStorage.setItem(AGENCY_GEOCODER_CACHE_KEY, JSON.stringify(cache));
  },
};
