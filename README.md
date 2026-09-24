# AveLynx Stretchy ⚡
### The Edge-Native Search & Intelligence Engine with Probabilistic Anomaly Detection

[![Live Playground](https://img.shields.io/badge/Live_Playground-client.avelynx.net-6366f1?style=flat-square&logo=cloudflare)](https://client.avelynx.net)
[![npm version](https://img.shields.io/npm/v/@avelynx/stretchy.svg?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@avelynx/stretchy)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)
[![Edge Network](https://img.shields.io/badge/Global_Edge-300+_Cities-f38020?style=flat-square)](https://search.avelynx.net)
[![Architecture](https://img.shields.io/badge/Engine-BM25_+_FTS-8b5cf6?style=flat-square)](https://search.avelynx.net)
[![Pricing](https://img.shields.io/badge/Zero_Cluster_Tax-90%25_Cost_Reduction-10b981?style=flat-square)](https://appmanagement.avelynx.net/store?app=stretchy)
[![Community](https://img.shields.io/badge/Community-AveLynx_Forum-3b82f6?style=flat-square)](https://community.avelynx.net)

**Stretchy** delivers enterprise full-text search precision and the relevance of **BM25 scoring** without the **$500/month cluster tax**, garbage collection pauses, or complex node management.

Engineered to run natively on a **Distributed Global Edge Network** with an ultra-fast local microservice deployment option, Stretchy is the first modern search engine with **native real-time probabilistic anomaly detection** and dynamic query slicing built directly into the client query path.

🔗 **Try the Interactive Web Client & Sandbox**: [https://client.avelynx.net](https://client.avelynx.net)

---

## ⚡ Why Stretchy vs. Traditional Systems?

| Feature / Metric | **Traditional Dedicated Clusters** | **Legacy Log Platforms** | **Proprietary SaaS Indexes** | **AveLynx Stretchy ⚡** |
|:---|:---|:---|:---|:---|
| **Base Infrastructure Cost** | **$200 – $1,200+/mo** just for idle nodes | **$2,000+/mo** (GB/day ingest tax) | **$1.50 per 1k searches** (scales exponentially) | **Near $0 at rest** (pennies per million queries on Distributed Edge) |
| **Idle Memory / CPU** | Heavy JVM, 4GB–32GB RAM minimum, GC pauses | Gigantic indexing daemons | Hosted SaaS | **Sub-100ms cold start**, zero idle cluster RAM |
| **Deployment & Ops** | Shard allocation, master nodes, zookeeper, reindexing pains | Complex forwarders, indexing tiers | Proprietary Cloud Only | **1-Command Edge Deploy** or single lightweight binary |
| **Global Edge Latency** | Centralized regional clusters (150ms+ round trips) | Centralized indexers | Proprietary edge CDN | **Native 300+ Edge POPs** (sub-15ms worldwide) |
| **Probabilistic Anomaly Detection** | Requires separate ML node or external Python/Spark job | Expensive premium Enterprise add-on | Not available | **Built-in natively** (real-time dynamic z-scores & distribution cuts) |
| **Visual Query Slicer** | Raw JSON or bulky Kibana dashboards | Complex SPL dashboards | Search UI widgets | **Built-in Dynamic Cut Gauge** (`250 total ➔ 42 matched (16.8%)`) |
| **Data Privacy & Multi-Tenancy** | Complex document-level security plugins | Role-based indexing tiers | Shared multitenant cloud | **HMAC-SHA256 Signed Tenant Isolation** & instant edge killswitches |

---

## 🚀 3-Minute Quickstart

### 1. Install the Client SDK
```bash
npm install @avelynx/stretchy
```
*(Or for Python: `pip install stretchy-client`)*

Or drop directly into any browser page via CDN:
```html
<script src="https://client.avelynx.net/assets/stretchy.min.js"></script>
```

### 2. Grab an Instant 14-Day Free Evaluation Key
You don't need to speak to sales or enter a credit card. Generate an authentic cryptographic 14-day trial key in one line:

```javascript
import { StretchyClient } from '@avelynx/stretchy';

const client = new StretchyClient({
  baseUrl: 'https://search.avelynx.net'
});

// Generates an instant cryptographic 14-day trial key (10,000 document capacity)
const trial = await client.createTrialLicense('Acme Corp', 'dev@acme.com');
console.log('Trial License Active:', trial.license_key);
```

### 3. Ingest Arbitrary JSON Documents
No schemas to define upfront. Strings are automatically dual-indexed for full-text and exact faceting; numbers map directly to high-speed range points:

```javascript
await client.indexDocs('products', [
  {
    id: 'sku-audio-900',
    name: 'Acoustic Pro Wireless Noise-Cancelling Headphones',
    category: 'electronics',
    price: 249.99,
    rating: 4.8,
    latency_ms: 12
  }
]);
```

### 4. Search with BM25 Scoring & Query Slicing
```javascript
const res = await client.search('products', {
  query: 'wireless headphones',
  limit: 10
});

// Slicer tells you exactly how much of the dataset was matched
const slice = client.querySlicer(res.hits.length, res.total);
console.log(slice.label); // "1 of 1 matched (100%)"
```

### 5. Detect Real-Time Statistical Anomalies
```javascript
const report = client.detectAnomalies(res.hits, {
  field: 'price',
  zThreshold: 2.5
});

if (report.anomalyCount > 0) {
  console.warn('Statistical Outliers Detected:', report.anomalies);
}
```

---

## 📦 Client Distribution Bundles

Pre-built bundles are provided in `dist/` and hosted directly on the [AveLynx GitHub Page](https://client.avelynx.net):

| Bundle | Path | Format | Use Case |
|:---|:---|:---|:---|
| **Universal UMD** | `dist/stretchy.umd.js` | UMD (Browser, CommonJS, AMD) | Direct `<script>` tags, Node.js `require()` |
| **Modern ESM** | `dist/stretchy.esm.js` | ES2022 Module | Vite, Next.js, Rollup, Webpack 5, native `import` |
| **Minified CDN** | `dist/stretchy.min.js` | Minified UMD (~17 KB) | High-throughput CDN production delivery |
| **TypeScript Types** | `dist/index.d.ts` | Declaration file | Autocomplete & type safety |

---

## 🌐 GitHub Pages Deployment

The repository includes automated GitHub Actions deployment.

To deploy to your GitHub Pages:
1. Push this repository to GitHub (`main` branch).
2. Go to **Settings** > **Pages** in your repository.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the site.
5. If using custom domain, enter `client.avelynx.net` under **Custom domain** (already configured in `docs/CNAME`).

---


---

## 🦀 Official Rust SDK (`stretchy-rs`)

For native Rust microservices, high-throughput backend services, and air-gapped defense applications, use the official Rust crate located in [`rust/`](rust/):

```toml
[dependencies]
stretchy = { git = "https://github.com/avelynxarchitect/stretchy-client", branch = "main" }
tokio = { version = "1.38", features = ["full"] }
```

### High-Speed BM25 Search Query (Async Tokio)
```rust
use stretchy::{StretchyClient, Result};

#[tokio::main]
async fn main() -> Result<()> {
    let client = StretchyClient::builder()
        .base_url("http://127.0.0.1:8080")
        .build()?;

    let res = client.search("news_articles", "cybersecurity AND incident", 10).await?;
    println!("Found {} results in {:.2}ms", res.total_hits, res.took_ms);
    for hit in res.hits {
        println!("- [{:.2}] ID: {}", hit.score, hit.id);
    }
    Ok(())
}
```

### Air-Gapped License Verification (Zero-Network)
```rust
use stretchy::license::LicenseVerifier;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let license_token = std::fs::read_to_string("/etc/stretchy/license.avx")?;
    let license = LicenseVerifier::verify(&license_token)?;
    println!("Valid license for: {} ({} days remaining)", license.customer, license.days_remaining());
    Ok(())
}
```

## 📄 License

Apache-2.0 © 2026 AveLynx (MYZBROS ENTERPRISES LLC).

**Headquarters:** AveLynx / MYZBROS ENTERPRISES LLC &bull; Regus Downtown, 225 Broadway, San Diego, CA 92101
**Contact:** support@avelynx.net | [https://avelynx.net](https://avelynx.net)
