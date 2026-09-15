// Lossless delivery encoding. No resize, crop, colour edit or source overwrite.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'image-provenance.json');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
(async () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  let sourceTotal = 0, deliveryTotal = 0;
  for (const asset of manifest.assets) {
    assert(/^[a-z]+$/.test(asset.name));
    assert.equal(asset.file, `assets/${asset.name}.png`);
    const source = fs.readFileSync(path.join(root, asset.file));
    assert.equal(sha(source), asset.sha256, `source changed: ${asset.name}`);
    const sourceRaw = await sharp(source).raw().toBuffer({ resolveWithObject: true });
    const encoded = await sharp(source).webp({ lossless: true, effort: 6 }).toBuffer();
    const decoded = await sharp(encoded).raw().toBuffer({ resolveWithObject: true });
    assert.equal(decoded.info.width, sourceRaw.info.width);
    assert.equal(decoded.info.height, sourceRaw.info.height);
    assert.equal(decoded.info.channels, sourceRaw.info.channels);
    assert(decoded.data.equals(sourceRaw.data), `decoded pixels changed: ${asset.name}`);
    assert(encoded.length < source.length, `no size reduction: ${asset.name}`);
    const file = `assets/${asset.name}.webp`;
    fs.writeFileSync(path.join(root, file), encoded);
    asset.delivery = {
      file, encoding: 'WebP lossless', sha256: sha(encoded),
      sourceBytes: source.length, deliveryBytes: encoded.length,
      width: decoded.info.width, height: decoded.info.height,
      decodedPixelSha256: sha(decoded.data), identicalDecodedPixels: true,
    };
    sourceTotal += source.length;
    deliveryTotal += encoded.length;
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ sourceTotal, deliveryTotal, savedBytes: sourceTotal - deliveryTotal,
    reductionPercent: Number((100 * (1 - deliveryTotal / sourceTotal)).toFixed(2)),
    identicalDecodedPixels: true }));
})().catch(error => { console.error(error); process.exitCode = 1; });
