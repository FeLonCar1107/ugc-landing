/**
 * Fits each slug's offer_ebook_mockup.png into the canonical transparent canvas
 * (421×470) so every landing renders the book at the same visual scale.
 *
 * Usage: node scripts/normalize-offer-ebook-mockups.mjs
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "launch-assets");
const CANVAS = { width: 421, height: 470 };
const MOCKUP = "offer_ebook_mockup.png";

async function main() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory() && e.name !== "shared");

  for (const { name: slug } of slugs) {
    const file = path.join(ROOT, slug, MOCKUP);
    try {
      const before = await sharp(file).metadata();
      await sharp(file)
        .resize(CANVAS.width, CANVAS.height, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(`${file}.tmp`);

      const { rename, unlink } = await import("node:fs/promises");
      await unlink(file);
      await rename(`${file}.tmp`, file);

      const after = await sharp(file).metadata();
      console.log(
        `${slug}: ${before.width}x${before.height} → ${after.width}x${after.height}`,
      );
    } catch (err) {
      if (err && typeof err === "object" && "code" in err && err.code === "ENOENT") {
        console.warn(`${slug}: skip (no ${MOCKUP})`);
        continue;
      }
      throw err;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
