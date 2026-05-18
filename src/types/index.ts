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

export interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: string;
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  datasetCount: number;
  category: string;
  href: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
