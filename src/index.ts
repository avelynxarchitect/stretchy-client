/**
 * Stretchy Search Engine TypeScript Client
 * Suitable for React, Vite, Next.js, and Node.js (Reentry Navigator, GrantPulse, Shareables).
 */

export interface StretchyTimeBucketOptions {
  field?: string;
  interval?: string;
  from?: string;
  to?: string;
}

export interface StretchyTimeBucketResult {
  key: string;
  timestamp: number;
  count: number;
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
}

export interface StretchyHit<T = any> {
  id: string;
  score: number;
  source: T;
}

export interface StretchyFacetCount {
  term: string;
  count: number;
}

export interface StretchyVisualSpec {
  chart_type: 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'stat' | 'gauge' | 'table';
  title: string;
  subtitle?: string;
  x_field?: string;
  y_field?: string;
  metric?: string;
  group_by?: string;
  time_interval?: string;
  palette?: string[];
  recommended_height_px?: number;
}

export interface StretchyNLResponse<T = any> {
  success: boolean;
  nl_query: string;
  query_plan: {
    original_query: string;
    target_index: string;
    is_federated: boolean;
    clean_query: string;
    filters: Record<string, any>;
    time_bucket?: StretchyTimeBucketOptions;
    facets?: string[];
    visual_spec: StretchyVisualSpec;
    explanation: string;
  };
  visual_spec: StretchyVisualSpec;
  chart_data?: {
    labels?: string[];
    datasets?: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      fill?: boolean;
    }>;
    value?: number;
  };
  search_results: StretchySearchResponse<T>;
  took_ms: number;
}

export interface StretchySearchResponse<T = any> {
  total_hits: number;
  max_score: number;
  took_ms: number;
  hits: StretchyHit<T>[];
  facets?: Record<string, StretchyFacetCount[]>;
  time_buckets?: StretchyTimeBucketResult[];
  suggestions?: string[];
  did_you_mean?: string;
}

export interface StretchyIndexStats {
  name: string;
  doc_count: number;
  deleted_docs: number;
  num_segments: number;
  size_bytes: number;
}

export class StretchyClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    let resolvedUrl = baseUrl;
    if (!resolvedUrl) {
      if (typeof process !== 'undefined' && process.env && process.env.STRETCHY_URL) {
        resolvedUrl = process.env.STRETCHY_URL;
      } else if (typeof window !== 'undefined' && ((window as any).__STRETCHY_URL__ || (window as any).STRETCHY_URL)) {
        resolvedUrl = (window as any).__STRETCHY_URL__ || (window as any).STRETCHY_URL;
      } else {
        // Cloudflare Edge Production endpoint by default
        resolvedUrl = 'https://stretchy-search.ksankstemp.workers.dev';
      }
    }
    this.baseUrl = (resolvedUrl || 'https://stretchy-search.ksankstemp.workers.dev').replace(/\/+$/, '');
  }

  async search<T = any>(indexName: string, options: StretchySearchOptions = {}): Promise<StretchySearchResponse<T>> {
    const payload = {
      query: options.query || '*',
      query_type: options.queryType || 'match',
      fields: options.fields || null,
      filters: options.filters || {},
      sort: options.sort || null,
      sort_order: options.sortOrder || 'desc',
      limit: options.limit ?? 20,
      offset: options.offset ?? 0,
      facets: options.facets || [],
      ...(options.timeBucket || options.time_bucket ? { time_bucket: options.timeBucket || options.time_bucket } : {}),
      ...(options.fuzzy !== undefined ? { fuzzy: options.fuzzy } : {}),
      ...(options.fuzziness !== undefined ? { fuzziness: options.fuzziness } : {})
    };

    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/search`, {
      method: 'POST',
      headers: this._getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });

    this._trackLicenseHeaders(res);
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Stretchy search error');
    }

    return await res.json();
  }

  async searchTimeBuckets<T = any>(
    indexName: string,
    query = '*',
    interval = '1h',
    options: { field?: string; from?: string; to?: string; facets?: string[]; filters?: Record<string, any>; limit?: number } = {}
  ): Promise<StretchySearchResponse<T>> {
    return await this.search<T>(indexName, {
      query,
      time_bucket: {
        field: options.field || 'timestamp',
        interval,
        ...(options.from ? { from: options.from } : {}),
        ...(options.to ? { to: options.to } : {})
      },
      facets: options.facets,
      filters: options.filters,
      limit: options.limit ?? 20
    });
  }

  async uploadDocument(
    indexName: string,
    file: File | Blob | any,
    metadata: { organization?: string; category?: string; title?: string; tags?: string[] | string; id?: string } = {}
  ): Promise<{ indexed: boolean; id: string; title: string; file_name: string; extracted_characters: number; page_count: number }> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.organization) formData.append('organization', metadata.organization);
    if (metadata.category) formData.append('category', metadata.category);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.tags) formData.append('tags', Array.isArray(metadata.tags) ? metadata.tags.join(',') : metadata.tags);
    if (metadata.id) formData.append('id', metadata.id);

    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(`Stretchy upload error: ${err.error || res.statusText}`);
    }

    return await res.json();
  }

  async indexDocs(indexName: string, docs: Record<string, any> | Record<string, any>[]): Promise<{ indexed_count: number; ids: string[] }> {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/docs`, {
      method: 'POST',
      headers: this._getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(docs)
    });

    this._trackLicenseHeaders(res);
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Stretchy index error');
    }

    return await res.json();
  }

  async streamEvent(tenantId: string, indexName: string, eventData: Record<string, any>): Promise<{ status: string; id: string; target_index: string }> {
    const url = new URL(`${this.baseUrl}/api/v1/stream/${encodeURIComponent(tenantId)}/webhook`);
    if (indexName) url.searchParams.set('index', indexName);
    if (this.apiKey) url.searchParams.set('key', this.apiKey);

    const headers = this._getHeaders({ 'Content-Type': 'application/json' });
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(eventData)
    });

    this._trackLicenseHeaders(res);
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Stretchy streamEvent error');
    }
    return await res.json();
  }

  async streamBatch(tenantId: string, indexName: string, events: Record<string, any>[]): Promise<{ status: string; indexed_count: number; ids: string[] }> {
    if (!Array.isArray(events) || events.length === 0) {
      return { status: 'noop', indexed_count: 0, ids: [] };
    }
    const url = new URL(`${this.baseUrl}/api/v1/stream/${encodeURIComponent(tenantId)}/webhook`);
    if (indexName) url.searchParams.set('index', indexName);
    if (this.apiKey) url.searchParams.set('key', this.apiKey);

    const headers = this._getHeaders({ 'Content-Type': 'application/json' });
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(events)
    });

    this._trackLicenseHeaders(res);
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Stretchy streamBatch error');
    }
    return await res.json();
  }

  async getDoc<T = any>(indexName: string, id: string): Promise<T | null> {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/docs/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to get doc: ${res.statusText}`);
    return await res.json();
  }

  async deleteDoc(indexName: string, id: string): Promise<{ deleted: boolean; id: string }> {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/docs/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }

  async getStats(indexName: string): Promise<StretchyIndexStats> {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/stats`);
    if (!res.ok) throw new Error(`Failed to get stats: ${res.statusText}`);
    return await res.json();
  }

  async health(): Promise<{ status: string; engine: string; indices_count: number }> {
    const res = await fetch(`${this.baseUrl}/health`);
    return await res.json();
  }

  /**
   * Natural Language Search & Dynamic Visualization Generator
   * Accepts natural questions and returns both matched documents and ready-to-render chart specs.
   * e.g. client.searchNL("Show trouble tickets trend over time as a line chart")
   */
  async searchNL<T = any>(naturalQuery: string, options: { filters?: Record<string, any>; limit?: number; fuzzy?: boolean } = {}): Promise<StretchyNLResponse<T>> {
    const res = await fetch(`${this.baseUrl}/api/v1/search/nl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: naturalQuery,
        ...options
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(`Stretchy NL search error: ${err.error || res.statusText}`);
    }

    return await res.json();
  }
}
