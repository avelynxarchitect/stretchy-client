/**
 * @avelynx/stretchy TypeScript Type Definitions
 */
export interface StretchyTimeBucketOptions {
  field?: string;
  interval?: string;
  from?: string;
  to?: string;
}

export interface StretchySearchOptions {
  query?: string;
  queryType?: 'match' | 'lucene';
  fields?: string[] | null;
  filters?: Record<string, any>;
  sort?: string | null;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  facets?: string[];
  timeBucket?: StretchyTimeBucketOptions;
  time_bucket?: StretchyTimeBucketOptions;
  fuzzy?: boolean;
  fuzziness?: string | number | boolean;
  bypassCache?: boolean;
}

export interface StretchyHit<T = any> {
  id: string;
  score: number;
  source: T;
}

export interface StretchySearchResponse<T = any> {
  total: number;
  hits: StretchyHit<T>[];
  facets?: Record<string, { term: string; count: number }[]>;
  time_buckets?: { key: string; timestamp: number; count: number }[];
  query_time_ms?: number;
  edge_cache?: 'HIT' | 'MISS' | 'BYPASS';
}

export interface AnomalyReport {
  stats: {
    count: number;
    mean: number;
    stdDev: number;
    variance: number;
    min: number;
    max: number;
    median: number;
    q1: number;
    q3: number;
    iqr: number;
    zThreshold: number;
  };
  anomalies: Array<{
    item: any;
    value: number;
    index: number;
    zScore: number;
    isHighAnomaly: boolean;
    severity: 'critical' | 'warning';
    pProbability: number;
  }>;
  totalChecked: number;
  anomalyCount: number;
  anomalyRatePercent: number;
  zScore: (val: number) => number;
}

export interface SlicerResult {
  matched: number;
  total: number;
  excluded: number;
  ratio: number;
  percent: number;
  label: string;
  gaugeColor: string;
}

export class StretchyClient {
  constructor(baseUrlOrOptions?: string | { baseUrl?: string; licenseKey?: string; apiKey?: string });
  baseUrl: string;
  licenseKey: string | null;
  apiKey: string | null;
  setLicenseKey(key: string): this;
  search<T = any>(indexName: string, options?: StretchySearchOptions): Promise<StretchySearchResponse<T>>;
  searchTimeBuckets<T = any>(indexName: string, query?: string, interval?: string, options?: any): Promise<StretchySearchResponse<T>>;
  indexDocs(indexName: string, docs: any[] | any): Promise<{ indexed: number; status: string }>;
  getDoc<T = any>(indexName: string, id: string): Promise<T | null>;
  deleteDoc(indexName: string, id: string): Promise<{ deleted: boolean }>;
  detectAnomalies(data: any[], fieldOrOptions?: string | { field?: string; zThreshold?: number }): AnomalyReport;
  querySlicer(matchedOrResults: number | any, totalOrIndex?: number | any): SlicerResult;
  createTrialLicense(companyName: string, email: string, tenantId?: string): Promise<{ license_key: string; tier: string; days_left: number }>;
  getLicenseStatus(): Promise<{ tier: string; days_remaining: number; quota: any }>;
  health(): Promise<{ status: string; engine: string; version: string }>;
  federatedSearch<T = any>(query: string, options?: any): Promise<{ results: Record<string, StretchySearchResponse<T>> }>;
  searchNL(naturalQuery: string, options?: any): Promise<{ success: boolean; interpretation: any; results: any; visual_spec?: any }>;
}

export default StretchyClient;
