use stretchy::{Result, StretchyClient};

#[tokio::main]
async fn main() -> Result<()> {
    println!("Connecting to AveLynx Stretchy Engine...");
    let client = StretchyClient::builder()
        .base_url("http://127.0.0.1:8080")
        .build()?;

    // 1. Check health & license
    let health = client.health().await?;
    println!("✅ Stretchy Engine: {} ({})", health.service, health.engine);

    let lic = client.license_status().await?;
    println!("🛡️ License Status: {} (Node: {})", lic.status, lic.node_fingerprint);

    // 2. Perform BM25 Search
    println!("\nSearching index 'news_articles' for 'cybersecurity AND zero-trust'...");
    let results = client.search("news_articles", "cybersecurity", 5).await?;
    println!("Found {} results in {:.2}ms", results.total_hits, results.took_ms);

    for (idx, hit) in results.hits.iter().enumerate() {
        println!("{}. [ID: {} | BM25 Score: {:.4}]", idx + 1, hit.id, hit.score);
    }

    Ok(())
}
