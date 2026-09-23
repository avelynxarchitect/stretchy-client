/**
 * @avelynx/stretchy v1.0.0
 * Modern ES Module Bundle
 * Official client for Stretchy - Edge-Native Search & BM25 with Probabilistic Anomaly Detection
 * (c) 2026 AveLynx (MYZBROS ENTERPRISES LLC) - Apache 2.0
 */
/**
 * Stretchy Search Engine Client SDK
 * Drop-in client for Reentry Navigator, GrantPulse, and Shareables.
 */
class StretchyClient {
  constructor(baseUrlOrOptions, maybeOptions = {}) {
    let baseUrl = typeof baseUrlOrOptions === 'string' ? baseUrlOrOptions : null;
    const options = typeof baseUrlOrOptions === 'object' && baseUrlOrOptions !== null ? baseUrlOrOptions : maybeOptions;

    if (!baseUrl) {
      if (options.baseUrl) {
        baseUrl = options.baseUrl;
      } else if (typeof process !== 'undefined' && process.env && process.env.STRETCHY_URL) {
        baseUrl = process.env.STRETCHY_URL;
      } else if (typeof window !== 'undefined' && (window.__STRETCHY_URL__ || window.STRETCHY_URL)) {
        baseUrl = window.__STRETCHY_URL__ || window.STRETCHY_URL;
      } else {
        baseUrl = 'https://search.avelynx.net';
      }
    }
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.licenseKey = options.licenseKey ||
      (typeof process !== 'undefined' && process.env && (process.env.STRETCHY_LICENSE_KEY || process.env.STRETCHY_LICENSE)) ||
      (typeof window !== 'undefined' && (window.__STRETCHY_LICENSE_KEY__ || window.STRETCHY_LICENSE_KEY || window.__STRETCHY_LICENSE__ || window.STRETCHY_LICENSE)) ||
      null;
    this.apiKey = options.apiKey || null;
    this.lastLicenseStatus = null;
  }

  setLicenseKey(key) {
    this.licenseKey = key ? key.trim() : null;
    return this;
  }

  _getHeaders(customHeaders = {}) {
    const headers = { ...customHeaders };
    if (this.licenseKey) {
      headers['X-License-Key'] = this.licenseKey;
    }
    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }
    return headers;
  }

  _trackLicenseHeaders(res) {
    const tier = res.headers.get('x-license-tier');
    const daysLeft = res.headers.get('x-license-days-left');
    if (tier || daysLeft !== null) {
      this.lastLicenseStatus = {
        tier: tier || 'trial',
        daysRemaining: daysLeft ? parseInt(daysLeft, 10) : 0
      };
    }
  }

  async _handleErrorResponse(res, defaultMsg) {
    let errBody = null;
    try {
      errBody = await res.json();
    } catch {
      errBody = { error: res.statusText };
    }

    if (res.status === 402) {
      throw new Error(`[Stretchy License Error: ${errBody.code || 'EXPIRED'}] ${errBody.error || errBody.reason || 'Payment Required'}. Solution: ${errBody.solution || 'https://appmanagement.avelynx.net/store?app=stretchy'}`);
    }
    if (res.status === 403) {
      throw new Error(`[Stretchy Quota Error: ${errBody.code || 'FORBIDDEN'}] ${errBody.error || 'Access denied'}. Details: ${errBody.solution || 'https://appmanagement.avelynx.net/store?app=stretchy'}`);
    }
    throw new Error(`${defaultMsg}: ${errBody.error || res.statusText}`);
  }

  /**
   * Search an index with full-text query, filters, sorting, and facets.
   */
  async search(indexName, options = {}) {
    const {
      query = '*',
      queryType = 'match',
      fields = null,
      filters = {},
      sort = null,
      sortOrder = 'desc',
      limit = 20,
      offset = 0,
      facets = [],
      timeBucket = null,
      time_bucket = null,
      fuzzy = false,
      fuzziness = null
    } = options;

    const payload = {
      query: query || '*',
      query_type: queryType,
      fields,
      filters,
      sort,
      sort_order: sortOrder,
      limit,
      offset,
      facets
    };

    if (fuzzy) {
      payload.fuzzy = fuzzy;
    }
    if (fuzziness !== null && fuzziness !== undefined) {
      payload.fuzziness = fuzziness;
    }

    if (timeBucket || time_bucket) {
      payload.time_bucket = timeBucket || time_bucket;
    }

    const headers = { 'Content-Type': 'application/json' };
    if (options.bypassCache) {
      headers['Cache-Control'] = 'no-cache';
    }

    const url = new URL(`${this.baseUrl}/api/v1/indices/${indexName}/search`);
    if (options.bypassCache) {
      url.searchParams.set('bypass_cache', 'true');
    }

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    this._trackLicenseHeaders(res);
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Stretchy search error');
    }

    return await res.json();
  }

  /**
   * Execute a time-bucketed search query for histogram visualizations.
   * @param {string} indexName 
   * @param {string} query 
   * @param {string} interval - e.g. "1m", "5m", "15m", "1h", "6h", "1d", "7d", "30d"
   * @param {object} options - extra search filters, facets, field, from, to
   */
  async searchTimeBuckets(indexName, query = '*', interval = '1h', options = {}) {
    const { field = 'timestamp', from = null, to = null, facets = [], filters = {} } = options;
    return await this.search(indexName, {
      query,
      time_bucket: {
        field,
        interval,
        ...(from ? { from } : {}),
        ...(to ? { to } : {})
      },
      facets,
      filters,
      limit: options.limit !== undefined ? options.limit : 20,
      bypassCache: options.bypassCache
    });
  }

  /**
   * Index a single document or batch array of documents.
   */
  async indexDocs(indexName, docs) {
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

  /**
   * Stream a single event or document directly into a tenant's index via the Stream Webhook pipeline.
   * Auto-tags tenant_id, stream_source, and timestamp.
   * @param {string} tenantId - Tenant identifier (e.g. "ecosystem")
   * @param {string} indexName - Target index (e.g. "soc_logs", "soc_probes", "telemetry_events")
   * @param {object} eventData - JSON payload
   */
  async streamEvent(tenantId, indexName, eventData, options = {}) {
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

  /**
   * Stream a batch of events or documents directly into a tenant's index via the Stream Webhook pipeline.
   * @param {string} tenantId - Tenant identifier
   * @param {string} indexName - Target index
   * @param {Array<object>} events - Batch array of events
   */
  async streamBatch(tenantId, indexName, events, options = {}) {
    if (!Array.isArray(events) || events.length === 0) {
      return { status: 'noop', indexed_count: 0 };
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

  /**
   * Get a document directly by ID.
   */
  async getDoc(indexName, id) {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/docs/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to get doc: ${res.statusText}`);
    return await res.json();
  }

  /**
   * Upload and extract text from binary documents (PDF, DOCX, TXT, etc.).
   */
  async uploadDocument(indexName, file, metadata = {}) {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.organization) formData.append('organization', metadata.organization);
    if (metadata.category) formData.append('category', metadata.category);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.tags) formData.append('tags', Array.isArray(metadata.tags) ? metadata.tags.join(',') : metadata.tags);
    if (metadata.id) formData.append('id', metadata.id);
    if (metadata.preventDuplicates) formData.append('prevent_duplicates', 'true');

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

  /**
   * Pre-upload duplicate check for existing content or revisions.
   */
  async checkDuplicate(indexName, documentInfo = {}) {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/check-duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documentInfo)
    });
    if (!res.ok) throw new Error(`Check duplicate error: ${res.statusText}`);
    return await res.json();
  }

  /**
   * Delete a document by ID.
   */
  async deleteDoc(indexName, id) {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/docs/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }

  /**
   * Fetch index metrics (total docs, segments, disk size).
   */
  async getStats(indexName) {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/stats`);
    if (!res.ok) throw new Error(`Failed to get stats: ${res.statusText}`);
    return await res.json();
  }

  /**
   * Check health liveness probe.
   */
  async health() {
    const res = await fetch(`${this.baseUrl}/health`);
    return await res.json();
  }

  /**
   * Deep readiness probe checking database, FTS5 inverted index, and schema health.
   */
  async checkReadiness() {
    const res = await fetch(`${this.baseUrl}/ready`);
    return await res.json();
  }

  /**
   * Manually purge/invalidate Edge Cache for a specific index.
   */
  async purgeCache(indexName) {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/purge-cache`, {
      method: 'POST'
    });
    return await res.json();
  }

  /**
   * Automated reindex and self-healing: rebuilds search index from authoritative store.
   */
  async reindex(indexName) {
    const res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/reindex`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error(`Reindex failed: ${res.statusText}`);
    return await res.json();
  }

  /**
   * Attach/store scanned business card image.
   */
  async uploadCardImage(indexName, cardId, imageBlobOrData, mimeType = 'image/jpeg') {
    let res;
    if (typeof imageBlobOrData === 'string') {
      res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/cards/${cardId}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: imageBlobOrData, mime_type: mimeType })
      });
    } else {
      const formData = new FormData();
      formData.append('image', imageBlobOrData);
      res = await fetch(`${this.baseUrl}/api/v1/indices/${indexName}/cards/${cardId}/image`, {
        method: 'POST',
        body: formData
      });
    }
    if (!res.ok) throw new Error(`Failed to upload card image: ${res.statusText}`);
    return await res.json();
  }

  /**
   * Get URL for business card image attachment.
   */
  getCardImageUrl(indexName, cardId) {
    return `${this.baseUrl}/api/v1/indices/${indexName}/cards/${cardId}/image`;
  }

  /**
   * Global federated search across all or selected ecosystem indices.
   */
  async federatedSearch(query, options = {}) {
    const {
      indices = [],
      limit = 20,
      perIndexLimit = 10,
      bypassCache = false,
      fuzzy = false,
      fuzziness = null
    } = options;

    const payload = {
      query: query || '*',
      indices,
      limit,
      per_index_limit: perIndexLimit
    };

    if (fuzzy) {
      payload.fuzzy = fuzzy;
    }
    if (fuzziness !== null && fuzziness !== undefined) {
      payload.fuzziness = fuzziness;
    }

    const headers = { 'Content-Type': 'application/json' };
    if (bypassCache) {
      headers['Cache-Control'] = 'no-cache';
    }

    const url = new URL(`${this.baseUrl}/api/v1/search/federated`);
    if (bypassCache) {
      url.searchParams.set('bypass_cache', 'true');
    }

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(`Federated search error: ${err.error || res.statusText}`);
    }

    return await res.json();
  }

  /**
   * Run deep integrity check on a single index (verifies full-text inverted index, JSON, and SHA-256 hashes).
   * Optionally auto-repairs detected corruptions with repair=true.
   */
  async checkIntegrity(indexName, repair = false) {
    const url = new URL(`${this.baseUrl}/api/v1/indices/${indexName}/check`);
    if (repair) {
      url.searchParams.set('repair', 'true');
    }
    const res = await fetch(url.toString());
    return await res.json();
  }

  /**
   * Fleet-wide integrity and corruption diagnostic across all ecosystem indices.
   */
  async diagnoseFleet(repair = false) {
    const url = new URL(`${this.baseUrl}/api/v1/diagnostics/indices`);
    if (repair) {
      url.searchParams.set('repair', 'true');
    }
    const res = await fetch(url.toString());
    return await res.json();
  }

  /**
   * Natural Language Search & Dynamic Visualization Generator
   * Accepts natural questions and returns both matched documents and ready-to-render chart specs.
   * e.g. client.searchNL("Show trouble tickets trend over time as a line chart")
   */

  /**
   * Get current license status and active quota limits.
   */
  async getLicenseStatus() {
    const res = await fetch(`${this.baseUrl}/api/v1/license/status`, {
      headers: this._getHeaders()
    });
    this._trackLicenseHeaders(res);
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Failed to fetch license status');
    }
    return await res.json();
  }

  /**
   * Generate an instant 14-day evaluation trial license key.
   */
  async createTrialLicense(companyName, email, tenantId) {
    const res = await fetch(`${this.baseUrl}/api/v1/license/trial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: companyName,
        email: email,
        tenant_id: tenantId
      })
    });
    if (!res.ok) {
      return await this._handleErrorResponse(res, 'Failed to generate trial license');
    }
    const data = await res.json();
    if (data.license_key) {
      this.setLicenseKey(data.license_key);
    }
    return data;
  }


  /**
   * Enterprise Probabilistic Anomaly Detection & Statistical Profiling Engine.
   * Analyzes an array of numbers or an array of search hit objects for outliers.
   * @param {Array<number|object>} data - Values or document objects
   * @param {string|object} fieldOrOptions - Field name (if objects) or options
   * @returns {object} Statistical distribution, anomalies, and helper functions
   */
  detectAnomalies(data, fieldOrOptions = {}) {
    const options = typeof fieldOrOptions === 'string' ? { field: fieldOrOptions } : (fieldOrOptions || {});
    const field = options.field || null;
    const zThreshold = options.zThreshold || 2.5; // standard 2.5-sigma cut

    if (!Array.isArray(data) || data.length === 0) {
      return {
        stats: { count: 0, mean: 0, stdDev: 0, min: 0, max: 0, iqr: 0 },
        anomalies: [],
        totalChecked: 0
      };
    }

    // Extract numbers
    const values = [];
    const items = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let val = null;
      if (typeof item === 'number') {
        val = item;
      } else if (item && typeof item === 'object') {
        if (field && item[field] !== undefined) {
          val = Number(item[field]);
        } else if (field && item.source && item.source[field] !== undefined) {
          val = Number(item.source[field]);
        } else if (item.score !== undefined) {
          val = Number(item.score);
        }
      }
      if (val !== null && !isNaN(val) && isFinite(val)) {
        values.push(val);
        items.push({ original: item, value: val, index: i });
      }
    }

    const n = values.length;
    if (n === 0) {
      return { stats: { count: 0, mean: 0, stdDev: 0 }, anomalies: [], totalChecked: 0 };
    }

    const sum = values.reduce((acc, v) => acc + v, 0);
    const mean = sum / n;
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const stdDev = Math.sqrt(variance);

    // Quartiles & IQR
    const sorted = [...values].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const median = sorted[Math.floor(sorted.length / 2)];
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const tukeyUpper = q3 + 1.5 * iqr;
    const tukeyLower = q1 - 1.5 * iqr;

    const stats = {
      count: n,
      mean: Math.round(mean * 1000) / 1000,
      stdDev: Math.round(stdDev * 1000) / 1000,
      variance: Math.round(variance * 1000) / 1000,
      min,
      max,
      median,
      q1,
      q3,
      iqr: Math.round(iqr * 1000) / 1000,
      zThreshold
    };

    const anomalies = [];
    for (const entry of items) {
      const zScore = stdDev > 0 ? (entry.value - mean) / stdDev : 0;
      const isZAnomaly = Math.abs(zScore) >= zThreshold;
      const isTukeyOutlier = entry.value > tukeyUpper || entry.value < tukeyLower;

      if (isZAnomaly || isTukeyOutlier) {
        anomalies.push({
          item: entry.original,
          value: entry.value,
          index: entry.index,
          zScore: Math.round(zScore * 1000) / 1000,
          isHighAnomaly: entry.value > mean,
          severity: Math.abs(zScore) >= 3.0 ? 'critical' : 'warning',
          pProbability: Math.round((1 - Math.min(1, Math.abs(zScore) / 4)) * 100) / 100
        });
      }
    }

    return {
      stats,
      anomalies,
      totalChecked: n,
      anomalyCount: anomalies.length,
      anomalyRatePercent: Math.round((anomalies.length / n) * 1000) / 10,
      zScore(val) {
        return stdDev > 0 ? (val - mean) / stdDev : 0;
      }
    };
  }

  /**
   * Dynamic Query Slicer & Cut Gauge.
   * Computes slice ratio, match percentages, and structured UI gauge data.
   */
  querySlicer(matchedOrResults, totalOrIndex, options = {}) {
    let matched = 0;
    let total = 0;

    if (typeof matchedOrResults === 'number') {
      matched = matchedOrResults;
      total = Number(totalOrIndex) || matched;
    } else if (matchedOrResults && typeof matchedOrResults === 'object') {
      matched = matchedOrResults.total !== undefined ? matchedOrResults.total :
                (Array.isArray(matchedOrResults.hits) ? matchedOrResults.hits.length : 0);
      total = Number(totalOrIndex) || (matchedOrResults.total_docs || matchedOrResults.total || matched);
    }

    if (total <= 0) total = matched > 0 ? matched : 1;
    const ratio = Math.min(1, Math.max(0, matched / total));
    const percent = Math.round(ratio * 1000) / 10;

    return {
      matched,
      total,
      excluded: Math.max(0, total - matched),
      ratio,
      percent,
      label: `${matched.toLocaleString()} of ${total.toLocaleString()} matched (${percent}%)`,
      gaugeColor: percent > 75 ? '#10b981' : (percent > 25 ? '#6366f1' : '#f59e0b')
    };
  }

  async searchNL(naturalQuery, options = {}) {
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

export { StretchyClient };
export default StretchyClient;
