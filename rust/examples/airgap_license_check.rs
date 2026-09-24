use stretchy::license::LicenseVerifier;
use std::fs;

fn main() {
    println!("============================================================");
    println!("🛡️  AVELYNX AIR-GAPPED LICENSE VERIFIER (RUST NATIVE)");
    println!("============================================================");

    let sample_license = match fs::read_to_string("stretchy.avx") {
        Ok(s) => s,
        Err(_) => {
            println!("Note: stretchy.avx not found in local dir. Pass a valid license file.");
            return;
        }
    };

    match LicenseVerifier::verify(&sample_license) {
        Ok(payload) => {
            println!("✅ Cryptographic Signature: VALID (Ed25519 Verified)");
            println!("   Customer:          {}", payload.customer);
            println!("   License ID:        {}", payload.license_id);
            println!("   Tier:              {}", payload.tier);
            println!("   Node Lock:         {}", payload.hardware_fingerprint);
            println!("   Days Remaining:    {} days", payload.days_remaining());
            println!("   Max Documents:     {}", payload.max_documents);
            println!("   Features:          {:?}", payload.features);
        }
        Err(e) => {
            println!("❌ License verification FAILED: {e}");
        }
    }
}
