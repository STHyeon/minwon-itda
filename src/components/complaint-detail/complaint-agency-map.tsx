'use client';

import React from 'react';
import { StaticMap as KakaoStaticMap } from 'react-kakao-maps-sdk';

import { Skeleton } from '../ui/skeleton';

import useKakaoMapLoader from '@/hooks/useKakaoMapLoader';
import { geocodingCache } from '@/lib/geocoding-cache';
import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAgencyMapProps {
  facility: string;
  address: string;
}

//
//
//

const KAKAO_MAP_LEVEL = 3;
const KAKAO_MAP_DEFAULT_COORDS = {
  lat: 37.456004465652136,
  lng: 126.7052580700657,
};

//
//
//

const ComplaintAgencyMap = ({ facility, address }: ComplaintAgencyMapProps) => {
  const [isKakaoMapInitLoading] = useKakaoMapLoader();

  const [coords, setCoords] = React.useState(KAKAO_MAP_DEFAULT_COORDS);

  /**
   *
   */
  const renderMap = () => {
    if (isKakaoMapInitLoading) {
      return <Skeleton className={cn('h-full w-full')} />;
    }

    return (
      <KakaoStaticMap
        className={cn('h-full w-full')}
        center={coords}
        level={KAKAO_MAP_LEVEL}
        marker={{
          text: facility,
          position: coords,
        }}
      />
    );
  };

  //
  //
  //
  React.useEffect(() => {
    if (isKakaoMapInitLoading) {
      return;
    }

    // 1. 캐시에서 먼저 확인
    const cachedCoords = geocodingCache.get(address);

    if (cachedCoords) {
      setCoords(cachedCoords);
      return;
    }

    // 2. 캐시에 없으면 카카오 맵 API 호출
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const newCoords = {
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        };

        setCoords(newCoords);

        // 3. 결과를 캐시에 저장
        geocodingCache.set(address, newCoords.lat, newCoords.lng);
      }
    });
  }, [address, isKakaoMapInitLoading]);

  //
  //
  //

  return <div className={cn('h-96 w-full')}>{renderMap()}</div>;
};

export default ComplaintAgencyMap;
