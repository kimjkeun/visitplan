'use client';

import { useEffect, useRef, useState } from 'react';
import { DaySchedule } from '@/types';

interface Props {
    schedule: DaySchedule;
}

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}

export default function DayRouteMap({ schedule }: Props) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        if (!showMap) return;

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey || apiKey === 'your_api_key_here') {
            setError('Google Maps API 키가 필요합니다. .env.local 파일에 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 설정해주세요.');
            setIsLoading(false);
            return;
        }

        // 위치 정보가 있는 타임라인 아이템만 필터링
        const locationsWithTime = schedule.timeline
            .filter(item => item.location)
            .map(item => ({
                location: item.location!,
                time: item.time,
                title: item.title
            }));

        if (locationsWithTime.length < 2) {
            setError('경로를 표시하려면 최소 2개 이상의 위치가 필요합니다.');
            setIsLoading(false);
            return;
        }

        // 타임아웃 설정 (10초)
        const loadingTimeout = setTimeout(() => {
            if (isLoading) {
                setError('지도 로딩 시간이 초과되었습니다. 페이지를 새로고침해주세요.');
                setIsLoading(false);
            }
        }, 10000);

        // Google Maps API 스크립트 로드
        const loadGoogleMapsScript = () => {
            // 이미 로드되어 있으면 바로 초기화
            if (window.google && window.google.maps) {
                console.log('Google Maps already loaded');
                initializeMap();
                clearTimeout(loadingTimeout);
                return;
            }

            // 이미 스크립트 태그가 있는지 확인
            const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
            if (existingScript) {
                console.log('Google Maps script tag exists, waiting for load...');
                // 스크립트가 로드될 때까지 대기
                const checkInterval = setInterval(() => {
                    if (window.google && window.google.maps) {
                        clearInterval(checkInterval);
                        clearTimeout(loadingTimeout);
                        initializeMap();
                    }
                }, 100);

                // 5초 후에도 로드 안되면 에러
                setTimeout(() => {
                    clearInterval(checkInterval);
                    if (!window.google || !window.google.maps) {
                        setError('Google Maps 로딩에 실패했습니다. API 키를 확인해주세요.');
                        setIsLoading(false);
                    }
                }, 5000);
                return;
            }

            console.log('Loading Google Maps script...');
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=ko`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                console.log('Google Maps script loaded successfully');
                clearTimeout(loadingTimeout);
                initializeMap();
            };
            script.onerror = (error) => {
                console.error('Google Maps script loading error:', error);
                clearTimeout(loadingTimeout);
                setError('Google Maps를 로드하는 중 오류가 발생했습니다. API 키를 확인해주세요.');
                setIsLoading(false);
            };
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (!mapRef.current) return;

            try {
                const google = window.google;

                // 지도 중심점 계산 (모든 위치의 평균)
                const avgLat = locationsWithTime.reduce((sum, loc) => sum + loc.location.lat, 0) / locationsWithTime.length;
                const avgLng = locationsWithTime.reduce((sum, loc) => sum + loc.location.lng, 0) / locationsWithTime.length;

                // 지도 생성
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: avgLat, lng: avgLng },
                    zoom: 12,
                    mapTypeControl: true,
                    fullscreenControl: true,
                    streetViewControl: false,
                });

                // DirectionsService와 DirectionsRenderer 생성
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: false, // 기본 마커 표시
                    polylineOptions: {
                        strokeColor: '#EC4899', // 핑크색 경로
                        strokeWeight: 4,
                        strokeOpacity: 0.8,
                    },
                });

                // 경로 요청 생성
                const origin = { lat: locationsWithTime[0].location.lat, lng: locationsWithTime[0].location.lng };
                const destination = {
                    lat: locationsWithTime[locationsWithTime.length - 1].location.lat,
                    lng: locationsWithTime[locationsWithTime.length - 1].location.lng
                };

                // 중간 경유지 (최대 25개까지 가능)
                const waypoints = locationsWithTime.slice(1, -1).map(loc => ({
                    location: { lat: loc.location.lat, lng: loc.location.lng },
                    stopover: true,
                }));

                // Directions API 요청 (TRANSIT 시도 후 실패하면 DRIVING으로 재시도)
                const requestDirections = (travelMode: any) => {
                    const request: any = {
                        origin: origin,
                        destination: destination,
                        waypoints: waypoints,
                        travelMode: travelMode,
                    };

                    // TRANSIT 모드일 때만 transitOptions 추가
                    if (travelMode === google.maps.TravelMode.TRANSIT) {
                        request.transitOptions = {
                            modes: ['BUS', 'RAIL', 'SUBWAY'],
                        };
                    }

                    directionsService.route(request, (result: any, status: any) => {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);

                            // 각 위치에 커스텀 정보 추가
                            locationsWithTime.forEach((loc, index) => {
                                const marker = new google.maps.Marker({
                                    position: { lat: loc.location.lat, lng: loc.location.lng },
                                    map: map,
                                    label: {
                                        text: `${index + 1}`,
                                        color: 'white',
                                        fontWeight: 'bold',
                                    },
                                    icon: {
                                        path: google.maps.SymbolPath.CIRCLE,
                                        scale: 12,
                                        fillColor: index === 0 ? '#10B981' : index === locationsWithTime.length - 1 ? '#EF4444' : '#EC4899',
                                        fillOpacity: 1,
                                        strokeColor: 'white',
                                        strokeWeight: 2,
                                    },
                                });

                                const infoWindow = new google.maps.InfoWindow({
                                    content: `
                    <div style="padding: 8px; max-width: 200px;">
                      <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #EC4899;">${index + 1}. ${loc.title}</h3>
                      <p style="margin: 0; font-size: 12px; color: #666;">${loc.time}</p>
                      <p style="margin: 4px 0 0 0; font-size: 13px;">${loc.location.name}</p>
                    </div>
                  `,
                                });

                                marker.addListener('click', () => {
                                    infoWindow.open(map, marker);
                                });
                            });

                            setIsLoading(false);
                        } else {
                            // TRANSIT 실패 시 DRIVING으로 재시도
                            if (travelMode === google.maps.TravelMode.TRANSIT) {
                                console.warn('TRANSIT mode failed, trying DRIVING mode:', status);
                                requestDirections(google.maps.TravelMode.DRIVING);
                            } else {
                                // DRIVING도 실패하면 마커만 표시
                                console.warn('Directions request failed:', status);

                                locationsWithTime.forEach((loc, index) => {
                                    const marker = new google.maps.Marker({
                                        position: { lat: loc.location.lat, lng: loc.location.lng },
                                        map: map,
                                        label: `${index + 1}`,
                                        title: loc.location.name,
                                    });

                                    const infoWindow = new google.maps.InfoWindow({
                                        content: `
                    <div style="padding: 8px;">
                      <h3 style="margin: 0 0 4px 0; font-weight: bold;">${index + 1}. ${loc.title}</h3>
                      <p style="margin: 0; font-size: 12px;">${loc.time}</p>
                      <p style="margin: 4px 0 0 0;">${loc.location.name}</p>
                    </div>
                  `,
                                    });

                                    marker.addListener('click', () => {
                                        infoWindow.open(map, marker);
                                    });
                                });

                                setError('경로를 표시할 수 없어 마커만 표시합니다.');
                                setIsLoading(false);
                            }
                        }
                    });
                };

                // TRANSIT 모드로 먼저 시도
                requestDirections(google.maps.TravelMode.TRANSIT);
            } catch (err) {
                console.error('Map initialization error:', err);
                setError('지도를 초기화하는 중 오류가 발생했습니다.');
                setIsLoading(false);
            }
        };

        loadGoogleMapsScript();

        // Cleanup function
        return () => {
            clearTimeout(loadingTimeout);
        };
    }, [schedule, showMap, isLoading]);

    // 위치 정보가 있는 아이템 개수 확인
    const locationCount = schedule.timeline.filter(item => item.location).length;

    if (locationCount < 2) {
        return null; // 위치가 2개 미만이면 버튼 자체를 표시하지 않음
    }

    return (
        <div className="mb-6">
            <button
                onClick={() => setShowMap(!showMap)}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
                <span>🗺️</span>
                <span>{showMap ? '동선 지도 숨기기' : `오늘의 동선 보기 (${locationCount}개 장소)`}</span>
            </button>

            {showMap && (
                <div className="mt-4 bg-white rounded-xl overflow-hidden shadow-xl">
                    {isLoading && (
                        <div className="h-96 flex items-center justify-center bg-gray-100">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">지도를 불러오는 중...</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                            <p className="text-yellow-800 text-sm">{error}</p>
                        </div>
                    )}

                    <div
                        ref={mapRef}
                        className="w-full h-96"
                        style={{ display: isLoading ? 'none' : 'block' }}
                    />

                    {/* 경로 정보 */}
                    <div className="p-4 bg-gray-50 border-t">
                        <h4 className="font-bold text-gray-800 mb-2">📍 방문 순서</h4>
                        <ol className="space-y-2">
                            {schedule.timeline
                                .filter(item => item.location)
                                .map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-800">{item.title}</span>
                                            <span className="text-gray-500 ml-2">({item.time})</span>
                                        </div>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}
