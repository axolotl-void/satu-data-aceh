// ============================================================
// SATU DATA ACEH — Core Type Definitions
// ============================================================

// Navigation
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

// Dataset
export interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  organization: string;
  tags: string[];
  format: string[];
  lastUpdated: string;
  downloads: number;
  views: number;
  license: string;
  coverageArea?: string;
  thumbnail?: string;
}

// Statistics
export interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: string;
}

// Institution
export interface Institution {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  datasetCount: number;
  category: string;
  href: string;
}

// Topic / Category
export interface Topic {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
  description?: string;
}

// Insight / News
export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  thumbnail?: string;
  readTime?: number;
  href: string;
}

// Chart data
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Map feature
export interface MapFeature {
  id: string;
  name: string;
  coordinates: [number, number];
  properties: Record<string, string | number>;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
  error?: string;
}

// Theme
export type Theme = "light" | "dark" | "system";

// Component base props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
