//! # AveLynx Stretchy™ Rust SDK
//!
//! Official Rust client for the **AveLynx Stretchy™** search engine.
//! Engineered for sub-15ms BM25 edge search, real-time query slicing,
//! probabilistic anomaly detection, and air-gapped cryptographic validation.
//!
//! ## Quickstart
//!
//! ```no_run
//! use stretchy::{StretchyClient, Result};
//!
//! #[tokio::main]
//! async fn main() -> Result<()> {
//!     let client = StretchyClient::builder()
//!         .base_url("http://127.0.0.1:8080")
//!         .build()?;
//!
//!     let hits = client.search("news_articles", "cybersecurity AND incident", 10).await?;
//!     println!("Found {} results in {}ms", hits.total_hits, hits.took_ms);
//!     Ok(())
//! }
//! ```

pub mod client;
pub mod error;
pub mod license;
pub mod model;

pub use client::{StretchyBuilder, StretchyClient};
pub use error::{Result, StretchyError};
pub use license::{LicensePayload, LicenseVerifier};
pub use model::{HealthStatus, LicenseStatus, SearchHit, SearchResponse};
