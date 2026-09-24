use crate::error::{Result, StretchyError};
use crate::model::{HealthStatus, LicenseStatus, SearchResponse};
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION, CONTENT_TYPE};
use serde_json::json;

#[derive(Clone, Debug)]
pub struct StretchyClient {
    base_url: String,
    http_client: reqwest::Client,
    api_key: Option<String>,
}

pub struct StretchyBuilder {
    base_url: String,
    api_key: Option<String>,
    timeout_secs: u64,
}

impl StretchyBuilder {
    pub fn new() -> Self {
        Self {
            base_url: "http://127.0.0.1:8080".to_string(),
            api_key: None,
            timeout_secs: 10,
        }
    }

    pub fn base_url(mut self, url: impl Into<String>) -> Self {
        self.base_url = url.into().trim_end_matches('/').to_string();
        self
    }

    pub fn api_key(mut self, key: impl Into<String>) -> Self {
        self.api_key = Some(key.into());
        self
    }

    pub fn timeout(mut self, secs: u64) -> Self {
        self.timeout_secs = secs;
        self
    }

    pub fn build(self) -> Result<StretchyClient> {
        let mut headers = HeaderMap::new();
        headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
        if let Some(ref key) = self.api_key {
            let auth_val = format!("Bearer {key}");
            if let Ok(hv) = HeaderValue::from_str(&auth_val) {
                headers.insert(AUTHORIZATION, hv);
            }
        }

        let http_client = reqwest::Client::builder()
            .default_headers(headers)
            .timeout(std::time::Duration::from_secs(self.timeout_secs))
            .build()?;

        Ok(StretchyClient {
            base_url: self.base_url,
            http_client,
            api_key: self.api_key,
        })
    }
}

impl StretchyClient {
    pub fn builder() -> StretchyBuilder {
        StretchyBuilder::new()
    }

    pub fn api_key(&self) -> Option<&str> {
        self.api_key.as_deref()
    }

    pub fn new(base_url: impl Into<String>) -> Result<Self> {
        Self::builder().base_url(base_url).build()
    }

    /// Check engine health
    pub async fn health(&self) -> Result<HealthStatus> {
        let url = format!("{}/health", self.base_url);
        let res = self.http_client.get(&url).send().await?;
        if !res.status().is_success() {
            return Err(StretchyError::Api {
                status: res.status().as_u16(),
                message: res.text().await.unwrap_or_default(),
            });
        }
        Ok(res.json().await?)
    }

    /// Check license and node-locking status
    pub async fn license_status(&self) -> Result<LicenseStatus> {
        let url = format!("{}/api/v1/license", self.base_url);
        let res = self.http_client.get(&url).send().await?;
        if !res.status().is_success() {
            return Err(StretchyError::Api {
                status: res.status().as_u16(),
                message: res.text().await.unwrap_or_default(),
            });
        }
        Ok(res.json().await?)
    }

    /// Execute a BM25 relevance search query across an index
    pub async fn search(&self, index: &str, query: &str, limit: usize) -> Result<SearchResponse> {
        let url = format!("{}/api/v1/indices/{index}/search", self.base_url);
        let payload = json!({
            "query": query,
            "limit": limit
        });

        let res = self.http_client.post(&url).json(&payload).send().await?;
        if !res.status().is_success() {
            return Err(StretchyError::Api {
                status: res.status().as_u16(),
                message: res.text().await.unwrap_or_default(),
            });
        }
        Ok(res.json().await?)
    }

    /// Ingest or update a document in a Lucene index
    pub async fn index_document(&self, index: &str, doc_id: &str, fields: serde_json::Value) -> Result<serde_json::Value> {
        let url = format!("{}/api/v1/indices/{index}/documents", self.base_url);
        let mut body = fields;
        if let Some(obj) = body.as_object_mut() {
            obj.insert("id".to_string(), json!(doc_id));
        }

        let res = self.http_client.post(&url).json(&body).send().await?;
        if !res.status().is_success() {
            return Err(StretchyError::Api {
                status: res.status().as_u16(),
                message: res.text().await.unwrap_or_default(),
            });
        }
        Ok(res.json().await?)
    }
}
