// src/types/global.d.ts

declare global {
  interface Window {
    Tmapv2: typeof Tmapv2;
  }

  namespace Tmapv2 {
    class Map {
      constructor(divId: string, options: MapOptions);
      setOptions(options: Partial<MapOptions>): void;
      setZoom(zoomLevel: number): void;
      setCenter(center: LatLng): void;
      getBounds(): LatLngBounds; 
      // 추가적인 메서드와 속성이 필요하다면 여기에 선언
    }

    interface MapOptions {
      center: LatLng;
      width: string;
      height: string;
      zoom: number;
      zoomControl?: boolean;
      bearing: number;
      mapType?: "ROAD" | "SATELLITE" | "HYBRID";
      viewMode?: "2D" | "3D";
      pitch: number;
      style?: {
        building?: boolean;
        infrastructure?: boolean;
        poi?: boolean;
        terrain?: boolean;
      };
      theme?: {
        [key: string]: boolean | string; // theme 옵션 추가
        "map.building"?: boolean;
        "map.poi.labelSize"?: string;
        "map.road.labelSize"?: string;
        "map.landmark.labelSize"?: string;
      };
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat: number;
      lng: number;
      // 추가적인 메서드와 속성이 필요하다면 여기에 선언
    }

    class Marker {
      constructor(options: MarkerOptions);
      // 추가적인 메서드와 속성이 필요하다면 여기에 선언
      getPosition(): LatLng;
    }

    interface MarkerOptions {
      position: LatLng;
      map: Map;
      title: string;
      // 추가적인 옵션이 필요하다면 여기에 선언
    }
  }
}

export {};
