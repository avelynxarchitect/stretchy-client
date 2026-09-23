import { StretchyClient } from '../src/index.js';

async function main() {
  console.log('--- Stretchy 3-Minute Quickstart Demo ---');
  const client = new StretchyClient();

  // 1. Generate a 14-day evaluation key
  console.log('Generating 14-day evaluation key...');
  const trial = await client.createTrialLicense('Acme Demo', 'quickstart@acme.com');
  console.log('Active Trial Key:', trial.license_key);
  console.log('Max Documents Allowed:', trial.max_docs);

  // 2. Ingest test items
  console.log('\nIndexing sample products...');
  const ingest = await client.indexDocs('products', [
    { id: 'sku-1', name: 'Ultra-Light Titanium Sunglasses', category: 'eyewear', price: 145.00 },
    { id: 'sku-2', name: 'Polarized Sport Sunglasses', category: 'eyewear', price: 89.99 },
    { id: 'sku-3', name: 'Leather Minimalist Cardholder', category: 'accessories', price: 45.00 }
  ]);
  console.log('Indexed documents count:', ingest.indexed_count);

  // 3. Search
  console.log('\nExecuting search for "Sunglasses"...');
  const search = await client.search('products', {
    query: 'Sunglasses',
    filters: { category: 'eyewear' },
    sort: 'price',
    sortOrder: 'asc'
  });

  console.log(`Search completed in ${search.took_ms}ms! Hits count: ${search.hits?.length || 0}`);
  console.log('License Tier:', client.lastLicenseStatus?.tier);
  console.log('Trial Days Remaining:', client.lastLicenseStatus?.daysRemaining);
}

main().catch(console.error);
