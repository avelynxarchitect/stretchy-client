use crate::error::{Result, StretchyError};
use base64::prelude::*;
use ed25519_dalek::{Signature, Verifier, VerifyingKey};
use serde::{Deserialize, Serialize};

pub const AVELYNX_MASTER_PUBLIC_KEY: &str = "MCowBQYDK2VwAyEA4Grx0j7ygP3oY6wS4Re4drCGoElCshoGiOWkyYB1WfU=";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LicensePayload {
    pub customer: String,
    pub license_id: String,
    pub tier: String,
    pub issued_at: u64,
    pub expires_at: u64,
    pub max_documents: u64,
    pub hardware_fingerprint: String,
    pub features: Vec<String>,
}

impl LicensePayload {
    pub fn is_expired(&self) -> bool {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis() as u64;
        now > self.expires_at
    }

    pub fn days_remaining(&self) -> i64 {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis() as u64;
        if self.expires_at > now {
            ((self.expires_at - now) / (1000 * 60 * 60 * 24)) as i64
        } else {
            0
        }
    }
}

pub struct LicenseVerifier;

impl LicenseVerifier {
    /// Validates an AveLynx signed air-gapped license string (payload.signature)
    pub fn verify(license_token: &str) -> Result<LicensePayload> {
        Self::verify_with_key(license_token, AVELYNX_MASTER_PUBLIC_KEY)
    }

    pub fn verify_with_key(license_token: &str, public_key_spki_b64: &str) -> Result<LicensePayload> {
        let parts: Vec<&str> = license_token.trim().split('.').collect();
        if parts.len() != 2 {
            return Err(StretchyError::LicenseError(
                "Invalid license token format. Expected [payload].[signature]".into(),
            ));
        }

        let payload_bytes = BASE64_URL_SAFE_NO_PAD
            .decode(parts[0])
            .map_err(|e| StretchyError::LicenseError(format!("Payload Base64 decode failed: {e}")))?;

        let signature_bytes = BASE64_URL_SAFE_NO_PAD
            .decode(parts[1])
            .map_err(|e| StretchyError::LicenseError(format!("Signature Base64 decode failed: {e}")))?;

        let pubkey_der = BASE64_STANDARD
            .decode(public_key_spki_b64)
            .map_err(|e| StretchyError::LicenseError(format!("Public key Base64 decode failed: {e}")))?;

        // SPKI DER format for Ed25519 has a 12-byte header, followed by the 32-byte raw public key
        if pubkey_der.len() < 32 {
            return Err(StretchyError::LicenseError("Invalid Ed25519 public key length".into()));
        }
        let raw_key_slice = if pubkey_der.len() == 44 {
            &pubkey_der[12..44]
        } else if pubkey_der.len() == 32 {
            &pubkey_der[..]
        } else {
            return Err(StretchyError::LicenseError("Unrecognized public key encoding".into()));
        };

        let raw_key: &[u8; 32] = raw_key_slice.try_into().map_err(|_| {
            StretchyError::LicenseError("Failed to extract 32-byte Ed25519 key".into())
        })?;

        let verifying_key = VerifyingKey::from_bytes(raw_key).map_err(|e| {
            StretchyError::LicenseError(format!("Invalid Ed25519 verifying key: {e}"))
        })?;

        let signature = Signature::from_slice(&signature_bytes).map_err(|e| {
            StretchyError::LicenseError(format!("Invalid Ed25519 signature: {e}"))
        })?;

        verifying_key
            .verify(&payload_bytes, &signature)
            .map_err(|e| StretchyError::LicenseError(format!("Cryptographic signature check failed: {e}")))?;

        let payload: LicensePayload = serde_json::from_slice(&payload_bytes)?;

        if payload.is_expired() {
            return Err(StretchyError::LicenseExpired(format!(
                "License expired at unix timestamp {}",
                payload.expires_at
            )));
        }

        Ok(payload)
    }
}
