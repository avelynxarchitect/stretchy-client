use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchHit {
    pub id: String,
    pub score: f64,
    pub fields: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResponse {
    pub query: String,
    pub total_hits: u64,
    pub took_ms: f64,
    pub hits: Vec<SearchHit>,
    #[serde(default)]
    pub slices: Option<HashMap<String, usize>>,
    #[serde(default)]
    pub anomalies_detected: Option<usize>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthStatus {
    pub status: String,
    pub service: String,
    pub engine: String,
    pub indices_count: usize,
    pub host: String,
    pub port: u16,
    pub ssl_enabled: bool,
    #[serde(default)]
    pub license_status: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LicenseStatus {
    pub status: String,
    pub air_gapped_mode: bool,
    pub node_fingerprint: String,
    pub customer: Option<String>,
    pub tier: Option<String>,
    pub license_id: Option<String>,
    pub days_remaining: Option<i64>,
    pub max_documents: Option<u64>,
    pub features: Option<Vec<String>>,
}
