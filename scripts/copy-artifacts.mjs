import { cpSync, mkdirSync } from "fs";

const dest = "artifacts/reich-elyra/dist/public";
mkdirSync(dest, { recursive: true });
cpSync("out", dest, { recursive: true });
console.log(`✓ Copied out/ → ${dest}`);
