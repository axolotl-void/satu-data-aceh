/**
 * Application-wide constants for Satu Data Aceh
 */

export const APP_NAME = "Satu Data Aceh";
export const APP_DESCRIPTION = "Portal Data Terbuka Pemerintah Aceh";
export const APP_URL = "https://data.acehprov.go.id";

export const ACEH_DISTRICTS_COUNT = 23;
export const ACEH_CENTER_COORDS: [number, number] = [4.695135, 96.749397];
export const ACEH_BOUNDS = {
  north: 5.9,
  south: 2.0,
  east: 98.3,
  west: 94.9,
};

export const DATASET_FORMATS = ["CSV", "XLSX", "JSON", "XML", "PDF", "SHP", "GeoJSON"] as const;
export const DATASET_LICENSES = ["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "ODbL"] as const;

export const PAGINATION_DEFAULT = 12;
export const SEARCH_DEBOUNCE_MS = 300;

export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  cinematic: 0.8,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
