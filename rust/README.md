# AveLynx Stretchy™ &bull; Official Rust SDK (`stretchy-rs`)

[![Crates.io](https://img.shields.io/badge/crates.io-stretchy-red)](https://github.com/avelynxarchitect/stretchy-client)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Edition: 2021](https://img.shields.io/badge/edition-2021-orange.svg)](https://www.rust-lang.org/)

Official Rust client crate for the **AveLynx Stretchy™** search engine. Engineered for sub-15ms BM25 edge search, real-time query slicing, probabilistic anomaly detection, and air-gapped cryptographic validation.

---

## 📦 Installation

Add this to your `Cargo.toml`:

```toml
[dependencies]
stretchy = { version = "1.0.0", git = "https://github.com/avelynxarchitect/stretchy-client", branch = "main" }
tokio = { version = "1.38", features = ["full"] }
```

---

## 🚀 Quickstart

```rust
use stretchy::{StretchyClient, Result};

#[tokio::main]
async fn main() -> Result<()> {
    // Connect to Stretchy (Localhost sidecar or remote intranet)
    let client = StretchyClient::builder()
        .base_url("http://127.0.0.1:8080")
        .api_key("your-secret-api-key")
        .build()?;

    // 1. Health & Cluster Check
    let health = client.health().await?;
    println!("Stretchy Engine: {} ({})", health.service, health.engine);

    // 2. High-Speed BM25 Search
    let res = client.search("news_articles", "cybersecurity AND incident", 10).await?;
    println!("Found {} results in {:.2}ms", res.total_hits, res.took_ms);

    for hit in res.hits {
        println!("- [{:.2}] ID: {}", hit.score, hit.id);
    }

    Ok(())
}
```

---

## 🛡️ Air-Gapped License Verification (Zero-Network)

For air-gapped SCIFs, defense grids, and banking networks, you can verify AveLynx digital license tokens (`license.avx`) directly inside your Rust application in pure memory without any network connectivity:

```rust
use stretchy::license::LicenseVerifier;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let license_token = std::fs::read_to_string("/etc/stretchy/license.avx")?;
    
    // Cryptographically checks Ed25519 signature & expiry in < 1ms
    let license = LicenseVerifier::verify(&license_token)?;
    
    println!("Licensed to: {}", license.customer);
    println!("Days remaining: {} days", license.days_remaining());
    println!("Allowed docs: {}", license.max_documents);
    
    Ok(())
}
```

---

## 📄 License

Apache-2.0 &copy; 2026 AveLynx (MYZBROS ENTERPRISES LLC).
Headquarters: Regus Downtown &bull; 225 Broadway, San Diego, CA 92101.
Contact: [support@avelynx.net](mailto:support@avelynx.net) | [https://avelynx.net](https://avelynx.net)
