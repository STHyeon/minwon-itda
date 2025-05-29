import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

//
//
//

const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? '';

//
//
//

export default function useKakaoMapLoader() {
  return useKakaoLoaderOrigin({
    appkey: KAKAO_MAP_APP_KEY,
    libraries: ['services'],
  });
}
