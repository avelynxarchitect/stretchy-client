import fs from 'fs';
import path from 'path';

const clientRoot = path.resolve('../stretchy-client');
const distDir = path.join(clientRoot, 'dist');
const docsDir = path.join(clientRoot, 'docs');
const docsAssetsDir = path.join(docsDir, 'assets');
const srcFile = path.join(clientRoot, 'src', 'index.js');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
if (!fs.existsSync(docsAssetsDir)) fs.mkdirSync(docsAssetsDir, { recursive: true });

const rawCode = fs.readFileSync(srcFile, 'utf8');

// Extract the class definition (remove bottom exports)
const classEndMatch = rawCode.lastIndexOf('// Export for ES modules and browser window');
const classCode = classEndMatch !== -1 ? rawCode.slice(0, classEndMatch).trim() : rawCode.trim();

// 1. Build UMD Bundle (stretchy.umd.js)
const umdBundle = `/**
 * @avelynx/stretchy v1.0.0
 * Universal UMD Bundle for Browsers & Node.js
 * Official client for Stretchy - Edge-Native Lucene & BM25 with Probabilistic Anomaly Detection
 * (c) 2026 AveLynx (MYZBROS ENTERPRISES LLC) - Apache 2.0
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.StretchyClient = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
${classCode}
  return StretchyClient;
}));
`;

// 2. Build ESM Bundle (stretchy.esm.js)
const esmBundle = `/**
 * @avelynx/stretchy v1.0.0
 * Modern ES Module Bundle
 * Official client for Stretchy - Edge-Native Lucene & BM25 with Probabilistic Anomaly Detection
 * (c) 2026 AveLynx (MYZBROS ENTERPRISES LLC) - Apache 2.0
 */
${classCode}

export { StretchyClient };
export default StretchyClient;
`;

// 3. Simple Safe Minifier for Production (stretchy.min.js)
function safeMinify(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
    .replace(/^\s*\/\/.*$/gm, '')      // remove line comments
    .replace(/\n\s*\n/g, '\n')         // remove empty lines
    .trim();
}

const minBundle = `/*! @avelynx/stretchy v1.0.0 | (c) 2026 AveLynx | Apache-2.0 */\n` + safeMinify(umdBundle);

// 4. Generate TypeScript Declaration file (index.d.ts)
const dtsContent = `/**
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
`;

// Write to dist/
fs.writeFileSync(path.join(distDir, 'stretchy.umd.js'), umdBundle, 'utf8');
fs.writeFileSync(path.join(distDir, 'stretchy.esm.js'), esmBundle, 'utf8');
fs.writeFileSync(path.join(distDir, 'stretchy.min.js'), minBundle, 'utf8');
fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent, 'utf8');

// Copy to docs/assets for direct GitHub Pages access
fs.writeFileSync(path.join(docsAssetsDir, 'stretchy.umd.js'), umdBundle, 'utf8');
fs.writeFileSync(path.join(docsAssetsDir, 'stretchy.esm.js'), esmBundle, 'utf8');
fs.writeFileSync(path.join(docsAssetsDir, 'stretchy.min.js'), minBundle, 'utf8');

// Also save copy of build-client.mjs in stretchy-client/scripts
fs.writeFileSync(path.join(clientRoot, 'scripts', 'build-client.mjs'), fs.readFileSync(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), 'utf8'), 'utf8');

console.log('[BUILD SUCCESS]');
console.log(' - dist/stretchy.umd.js (' + Buffer.byteLength(umdBundle) + ' bytes)');
console.log(' - dist/stretchy.esm.js (' + Buffer.byteLength(esmBundle) + ' bytes)');
console.log(' - dist/stretchy.min.js (' + Buffer.byteLength(minBundle) + ' bytes)');
console.log(' - dist/index.d.ts (' + Buffer.byteLength(dtsContent) + ' bytes)');
console.log(' - Synced bundles to docs/assets/');
