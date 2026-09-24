use thiserror::Error;

#[derive(Error, Debug)]
pub enum StretchyError {
    #[error("HTTP Request Error: {0}")]
    Http(#[from] reqwest::Error),

    #[error("JSON Serialization Error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("API Error (Status {status}): {message}")]
    Api {
        status: u16,
        message: String,
    },

    #[error("License Cryptographic Error: {0}")]
    LicenseError(String),

    #[error("License Expired on {0}")]
    LicenseExpired(String),

    #[error("Hardware Node Lock Mismatch (Licensed: {licensed}, Detected: {detected})")]
    NodeLockMismatch {
        licensed: String,
        detected: String,
    },
}

pub type Result<T> = std::result::Result<T, StretchyError>;
