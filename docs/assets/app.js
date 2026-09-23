/**
 * AveLynx Stretchy Client - GitHub Pages Interactive Application
 * (c) 2026 AveLynx (MYZBROS ENTERPRISES LLC)
 */

// 1. Built-in High-Fidelity Demo Datasets for Zero-Setup Offline Playground
const DEMO_DATASETS = {
  products: [
    { id: 'prod-001', name: 'Acoustic Pro Wireless Noise-Cancelling Headphones', category: 'electronics', price: 249.99, rating: 4.8, latency_ms: 12, sales_velocity: 840, description: 'Premium over-ear wireless headphones with active noise cancellation, transparency mode, and 40-hour battery life.' },
    { id: 'prod-002', name: 'UltraSlim Mechanical Gaming Keyboard RGB', category: 'electronics', price: 129.50, rating: 4.6, latency_ms: 8, sales_velocity: 512, description: 'Hot-swappable low profile mechanical switches with per-key RGB backlighting and Bluetooth 5.2.' },
    { id: 'prod-003', name: 'Ergonomic Mesh Office Chair with Lumbar Support', category: 'furniture', price: 349.00, rating: 4.7, latency_ms: 45, sales_velocity: 230, description: 'Breathable mesh executive office chair with adjustable 3D armrests and dynamic spinal alignment.' },
    { id: 'prod-004', name: 'Smart 4K Ultra HD Streaming Cinema Projector', category: 'electronics', price: 899.00, rating: 4.5, latency_ms: 28, sales_velocity: 120, description: 'Laser optical engine with 3000 ANSI lumens, HDR10+, autofocus, and built-in edge streaming apps.' },
    { id: 'prod-005', name: 'Stainless Steel Insulated Thermal Travel Mug 24oz', category: 'home', price: 34.95, rating: 4.9, latency_ms: 5, sales_velocity: 1450, description: 'Double-wall vacuum insulation keeps liquids icy cold for 24h or piping hot for 12h without condensation.' },
    { id: 'prod-006', name: 'Organic Cold-Pressed Matcha Ceremonial Grade', category: 'grocery', price: 28.00, rating: 4.9, latency_ms: 6, sales_velocity: 1890, description: 'First harvest stone-ground green tea leaves from Uji, Kyoto. Rich in L-theanine antioxidants.' },
    { id: 'prod-007', name: 'Quantum Core Supercomputing Dev Kit (Anomaly)', category: 'electronics', price: 14999.00, rating: 5.0, latency_ms: 480, sales_velocity: 2, description: 'Cryogenic qubit control board for quantum algorithm research. Rare high-value outlier document.' },
    { id: 'prod-008', name: 'Magnetic Wireless Power Bank 10,000mAh', category: 'electronics', price: 49.99, rating: 4.4, latency_ms: 14, sales_velocity: 960, description: 'Snap-on MagSafe compatible fast charger with foldable kickstand and dual USB-C Power Delivery.' },
    { id: 'prod-009', name: 'Solid Walnut Minimalist Desk Organizer Tray', category: 'office', price: 58.00, rating: 4.7, latency_ms: 18, sales_velocity: 310, description: 'CNC milled sustainably harvested American walnut with brass accents for stationery and EDC gear.' },
    { id: 'prod-010', name: 'Studio Monitor Audio Interface USB-C 192kHz', category: 'audio', price: 179.00, rating: 4.8, latency_ms: 11, sales_velocity: 420, description: 'Dual low-noise preamps with +48V phantom power, zero-latency direct monitoring, and MIDI I/O.' },
    { id: 'prod-011', name: 'Precision CNC Aluminum Laptop Stand Foldable', category: 'office', price: 42.50, rating: 4.6, latency_ms: 9, sales_velocity: 680, description: 'Anodized finish with rubberized grip pads, 6-level ergonomic elevation, and heat dissipation slots.' },
    { id: 'prod-012', name: 'Autonomous Robotic Vacuum & Sonic Mop LiDAR', category: 'home', price: 699.99, rating: 4.7, latency_ms: 32, sales_velocity: 280, description: 'Precision LDS laser navigation, 5000Pa cyclone suction, self-emptying base station, and carpet auto-boost.' }
  ],
  soc_logs: [
    { id: 'log-101', timestamp: '2026-09-23T10:15:20Z', service: 'iam-auth', action: 'login_success', user: 'admin@avelynx.net', latency_ms: 18, bytes_egress: 1420, ip: '192.168.1.10', threat_score: 0 },
    { id: 'log-102', timestamp: '2026-09-23T10:15:24Z', service: 'search-edge', action: 'query_execute', user: 'analyst@client.org', latency_ms: 12, bytes_egress: 8900, ip: '10.0.4.15', threat_score: 0 },
    { id: 'log-103', timestamp: '2026-09-23T10:15:29Z', service: 'stretchy-d1', action: 'bm25_index', user: 'system_daemon', latency_ms: 22, bytes_egress: 450, ip: '127.0.0.1', threat_score: 0 },
    { id: 'log-104', timestamp: '2026-09-23T10:15:35Z', service: 'crypto-vault', action: 'envelope_decrypt', user: 'finance@sdyama.org', latency_ms: 15, bytes_egress: 3100, ip: '192.168.1.42', threat_score: 0 },
    { id: 'log-105', timestamp: '2026-09-23T10:15:41Z', service: 'iam-auth', action: 'token_refresh', user: 'director@sdyama.org', latency_ms: 14, bytes_egress: 820, ip: '192.168.1.42', threat_score: 0 },
    { id: 'log-106', timestamp: '2026-09-23T10:15:50Z', service: 'gateway', action: 'exfiltration_probe_burst (Anomaly)', user: 'unknown_bot', latency_ms: 950, bytes_egress: 945000, ip: '45.134.22.9', threat_score: 98 },
    { id: 'log-107', timestamp: '2026-09-23T10:16:02Z', service: 'search-edge', action: 'facet_aggregation', user: 'manager@avelynx.net', latency_ms: 19, bytes_egress: 12400, ip: '10.0.4.18', threat_score: 0 },
    { id: 'log-108', timestamp: '2026-09-23T10:16:11Z', service: 'iam-auth', action: 'rbac_check', user: 'volunteer@sdyama.org', latency_ms: 11, bytes_egress: 540, ip: '192.168.1.88', threat_score: 0 }
  ],
  grants: [
    { id: 'grant-201', title: 'Youth Music Education & Instrument Access 2026', agency: 'California Arts Council', amount: 50000, status: 'approved', year: 2026, recipient: 'San Diego Young Artist Music Academy', summary: 'Operational funding to support after-school instrumentation and audio engineering programs.' },
    { id: 'grant-202', title: 'Community Arts Expansion & Digital Studio Upgrade', agency: 'Find Your Light Foundation', amount: 75000, status: 'in_review', year: 2026, recipient: 'San Diego Young Artist Music Academy', summary: 'Expansion of digital studio hardware, podcasting stations, and creative software licensing.' },
    { id: 'grant-203', title: 'Urban Youth Cultural Heritage Preservation', agency: 'National Endowment for the Arts', amount: 120000, status: 'approved', year: 2025, recipient: 'San Diego Young Artist Music Academy', summary: 'Documentation and performance series highlighting historic community jazz and rhythm legacies.' },
    { id: 'grant-204', title: 'Mega-Consortium Statewide Infrastructure Grant (Anomaly)', agency: 'Federal Cultural Endowment', amount: 3500000, status: 'draft', year: 2026, recipient: 'Multi-State Regional Coalition', summary: 'Statewide broadband and arts facility construction. Multi-million capital outlier.' }
  ]
};

// 2. Client Application Controller
class AveLynxPlaygroundApp {
  constructor() {
    this.client = null;
    this.activeSource = 'mock'; // 'mock' or 'live'
    this.activeDatasetKey = 'products';
    this.anomalyField = 'price';
    this.activeTab = 'cards';
    this.activeInstallTab = 'npm';

    this.initElements();
    this.initClient();
    this.initTheme();
    this.bindEvents();
    this.runSearch();
  }

  initElements() {
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.themeIcon = document.getElementById('themeIcon');
    this.sourceSelect = document.getElementById('sourceSelect');
    this.datasetSelect = document.getElementById('datasetSelect');
    this.queryInput = document.getElementById('queryInput');
    this.searchBtn = document.getElementById('searchBtn');

    this.slicerTrack = document.getElementById('slicerFill');
    this.slicerLabel = document.getElementById('slicerLabel');
    this.slicerStats = document.getElementById('slicerStats');

    this.anomalyPill = document.getElementById('anomalyPill');
    this.statMean = document.getElementById('statMean');
    this.statStdDev = document.getElementById('statStdDev');
    this.statMedian = document.getElementById('statMedian');
    this.statIQR = document.getElementById('statIQR');
    this.statOutliers = document.getElementById('statOutliers');

    this.resultsContainer = document.getElementById('resultsContainer');
    this.resultsCountLabel = document.getElementById('resultsCountLabel');
    this.codeSnippet = document.getElementById('codeSnippet');
    this.installCommand = document.getElementById('installCommand');
  }

  initClient() {
    // If StretchyClient is loaded via script tag (stretchy.umd.js)
    if (typeof window.StretchyClient === 'function') {
      this.client = new window.StretchyClient({
        baseUrl: 'https://search.avelynx.net'
      });
      console.log('[AveLynx] Initialized StretchyClient v1.0.0 (Endpoint: ' + this.client.baseUrl + ')');
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem('avelynx_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('avelynx_theme', next);
    this.updateThemeIcon(next);
  }

  updateThemeIcon(theme) {
    if (this.themeIcon) {
      this.themeIcon.innerHTML = theme === 'dark' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  }

  bindEvents() {
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', () => this.runSearch());
    }

    if (this.queryInput) {
      this.queryInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.runSearch();
      });
      this.queryInput.addEventListener('input', () => this.debounceSearch());
    }

    if (this.sourceSelect) {
      this.sourceSelect.addEventListener('change', (e) => {
        this.activeSource = e.target.value;
        this.runSearch();
      });
    }

    if (this.datasetSelect) {
      this.datasetSelect.addEventListener('change', (e) => {
        this.activeDatasetKey = e.target.value;
        this.anomalyField = this.activeDatasetKey === 'soc_logs' ? 'latency_ms' : 
                            (this.activeDatasetKey === 'grants' ? 'amount' : 'price');
        this.runSearch();
      });
    }

    // Install Tab Switchers
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.getAttribute('data-tab');
        this.switchInstallTab(target);
      });
    });

    // Copy Buttons
    document.querySelectorAll('.copy-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let text = '';
        if (btn.closest('.code-pane') && this.codeSnippet) {
          text = this.codeSnippet.textContent;
        } else if (btn.getAttribute('data-copy')) {
          text = btn.getAttribute('data-copy');
        } else if (this.installCommand) {
          text = this.installCommand.textContent;
        }
        navigator.clipboard.writeText(text).then(() => {
          const originalText = btn.innerHTML;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        }).catch(err => {
          console.warn('Clipboard write error:', err);
        });
      });
    });
  }

  debounceSearch() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.runSearch(), 250);
  }

  switchInstallTab(tab) {
    this.activeInstallTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tab);
    });

    const commands = {
      npm: 'npm install @avelynx/stretchy',
      yarn: 'yarn add @avelynx/stretchy',
      pnpm: 'pnpm add @avelynx/stretchy',
      cdn: '<script src="https://client.avelynx.net/assets/stretchy.min.js"></script>',
      pip: 'pip install stretchy-client'
    };
    if (this.installCommand) {
      this.installCommand.textContent = commands[tab] || commands.npm;
    }
  }

  async runSearch() {
    const query = (this.queryInput ? this.queryInput.value : '*').trim() || '*';
    let hits = [];
    let totalDocs = 0;
    let queryTimeMs = 8;

    if (this.activeSource === 'mock') {
      const fullList = DEMO_DATASETS[this.activeDatasetKey] || DEMO_DATASETS.products;
      totalDocs = fullList.length;

      // Filter in-memory
      if (query === '*' || query === '') {
        hits = fullList.map((doc, idx) => ({ id: doc.id, score: 1.0, source: doc }));
      } else {
        const terms = query.toLowerCase().split(/\s+/);
        hits = fullList
          .map(doc => {
            const str = JSON.stringify(doc).toLowerCase();
            let score = 0;
            terms.forEach(t => {
              if (str.includes(t)) score += 1.5;
            });
            return { id: doc.id, score: Math.round(score * 10) / 10, source: doc };
          })
          .filter(h => h.score > 0)
          .sort((a, b) => b.score - a.score);
      }
    } else {
      // Live Cloudflare Edge Worker Query
      try {
        const res = await this.client.search(this.activeDatasetKey, { query, limit: 30 });
        hits = res.hits || [];
        totalDocs = res.total || hits.length;
        queryTimeMs = res.query_time_ms || 14;
      } catch (err) {
        console.warn('Live search fallback to mock demo:', err.message);
        const fullList = DEMO_DATASETS[this.activeDatasetKey] || DEMO_DATASETS.products;
        totalDocs = fullList.length;
        hits = fullList.map(doc => ({ id: doc.id, score: 1.0, source: doc }));
      }
    }

    // 1. Process Slicer Gauge
    const slice = this.client ? this.client.querySlicer(hits.length, totalDocs) : {
      percent: Math.round((hits.length / (totalDocs || 1)) * 100),
      label: hits.length + ' of ' + totalDocs + ' matched'
    };

    if (this.slicerTrack) this.slicerTrack.style.width = Math.max(4, slice.percent) + '%';
    if (this.slicerLabel) this.slicerLabel.textContent = 'Slice: ' + slice.percent + '% of Dataset';
    if (this.slicerStats) this.slicerStats.textContent = hits.length + ' / ' + totalDocs + ' documents';

    // 2. Process Probabilistic Anomaly Detection
    const anomalyReport = this.client 
      ? this.client.detectAnomalies(hits, { field: this.anomalyField, zThreshold: 2.2 })
      : { stats: { mean: 0, stdDev: 0, median: 0, iqr: 0 }, anomalies: [] };

    this.renderAnomalyStats(anomalyReport);

    // 3. Render Results
    this.renderHits(hits, anomalyReport);

    // 4. Update Generated Code Snippet
    this.updateCodeSnippet(query, slice, anomalyReport);
  }

  renderAnomalyStats(report) {
    const s = report.stats || {};
    if (this.statMean) this.statMean.textContent = s.mean !== undefined ? s.mean.toLocaleString() : '--';
    if (this.statStdDev) this.statStdDev.textContent = s.stdDev !== undefined ? '± ' + s.stdDev.toLocaleString() : '--';
    if (this.statMedian) this.statMedian.textContent = s.median !== undefined ? s.median.toLocaleString() : '--';
    if (this.statIQR) this.statIQR.textContent = s.iqr !== undefined ? s.iqr.toLocaleString() : '--';
    if (this.statOutliers) this.statOutliers.textContent = report.anomalyCount || '0';

    if (this.anomalyPill) {
      if (report.anomalyCount > 0) {
        this.anomalyPill.className = 'anomaly-pill detected';
        this.anomalyPill.textContent = report.anomalyCount + ' Outlier(s) Detected';
      } else {
        this.anomalyPill.className = 'anomaly-pill clean';
        this.anomalyPill.textContent = 'Normal Distribution';
      }
    }
  }

  renderHits(hits, anomalyReport) {
    if (!this.resultsContainer) return;

    if (this.resultsCountLabel) {
      this.resultsCountLabel.textContent = hits.length + ' results matched';
    }

    if (hits.length === 0) {
      this.resultsContainer.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--text-muted);"><p>No documents matched your query.</p><p style="font-size: 0.85rem; margin-top: 6px;">Try searching for "*", "wireless", "audio", "grant", or "burst".</p></div>';
      return;
    }

    const anomalyIndices = new Set(anomalyReport.anomalies.map(a => a.index));

    this.resultsContainer.innerHTML = hits.map((hit, idx) => {
      const src = hit.source || {};
      const isAnomaly = anomalyIndices.has(idx);
      const title = src.name || src.title || src.action || hit.id;
      const snippet = src.description || src.summary || ('Service: ' + src.service + ' • IP: ' + src.ip);
      const metricLabel = this.anomalyField + ': ' + (src[this.anomalyField] !== undefined ? src[this.anomalyField] : '--');

      return `
        <div class="hit-card ${isAnomaly ? 'is-anomaly' : ''}">
          <div class="hit-title-row">
            <span class="hit-title">${title}</span>
            <span class="hit-score-badge">BM25: ${hit.score}</span>
          </div>
          <div class="hit-snippet">${snippet}</div>
          <div class="hit-meta-row">
            <span class="meta-tag">${metricLabel}</span>
            <span class="meta-tag">${src.category || src.agency || src.service || 'Document'}</span>
            ${isAnomaly ? '<span class="meta-tag" style="background: rgba(244, 63, 94, 0.15); color: var(--accent-rose); font-weight: 700;">Outlier (z > 2.2)</span>' : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  updateCodeSnippet(query, slice, anomalyReport) {
    if (!this.codeSnippet) return;

    const sliceLabel = (slice && slice.label) ? slice.label : (this.activeDatasetKey ? 'Matched results' : 'Matched');
    const anomalyCount = (anomalyReport && anomalyReport.anomalyCount !== undefined) ? anomalyReport.anomalyCount : 0;

    const jsCode = '// Live Stretchy Client Query Execution\n' +
      "import { StretchyClient } from '@avelynx/stretchy';\n\n" +
      'const client = new StretchyClient({\n' +
      "  baseUrl: 'https://search.avelynx.net'\n" +
      '});\n\n' +
      '// 1. Search with BM25 Relevance Scoring\n' +
      "const res = await client.search('" + this.activeDatasetKey + "', {\n" +
      "  query: '" + query + "',\n" +
      '  limit: 20\n' +
      '});\n\n' +
      '// 2. Dynamic Query Slicer & Cut Gauge\n' +
      'const slicer = client.querySlicer(res.hits.length, res.total);\n' +
      'console.log(slicer.label);\n' +
      '// => "' + sliceLabel + '"\n\n' +
      '// 3. Probabilistic Anomaly Detection\n' +
      "const audit = client.detectAnomalies(res.hits, '" + this.anomalyField + "');\n" +
      'if (audit.anomalyCount > 0) {\n' +
      "  console.warn('Detected outliers:', audit.anomalyCount);\n" +
      '  // => ' + anomalyCount + ' outlier(s) detected\n' +
      '}';

    this.codeSnippet.textContent = jsCode;
  }
}

// 3. Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AveLynxPlaygroundApp();
});
