#!/usr/bin/env node
/**
 * COSOB forbidden-terms audit.
 *
 * Scans messages/*.json and component source for promotional wording that is
 * NOT allowed in regulated IPO communications. AYRADE's landing must describe
 * the operation (dates, modalities, company) without framing it as an
 * "investment" promise.
 *
 * Exit code 1 on hit — use in CI.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FORBIDDEN = [
  /\binvestissement\s+rentable\b/gi,
  /\brendement\s+attendu\b/gi,
  /\bgain\s+garanti\b/gi,
  /\bopportunité\s+financière\b/gi,
  /\bguaranteed\s+return\b/gi,
  /\bgarantie\s+de\s+rendement\b/gi,
  /\bprofitable\s+investment\b/gi,
  /\bperformance\s+garantie\b/gi,
  /\bgagner\s+de\s+l'argent\b/gi,
];

// Words to check in isolation — flagged but only warned, since some usage is
// permitted inside quoted COSOB-style disclaimers.
const WARN = [/\binvestissement\b/gi, /\brendement\b/gi, /\bgain\b/gi, /\binvestment\b/gi];

const ROOT = new URL('..', import.meta.url).pathname;
const TARGETS = ['messages', 'components', 'app'];

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const e of entries) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) files.push(...walk(p));
    else if (/\.(tsx?|jsx?|json|md)$/.test(e)) files.push(p);
  }
  return files;
}

let hits = 0;
let warns = 0;

for (const target of TARGETS) {
  const abs = join(ROOT, target);
  try {
    statSync(abs);
  } catch {
    continue;
  }
  const files = walk(abs);
  for (const f of files) {
    const content = readFileSync(f, 'utf8');
    for (const rx of FORBIDDEN) {
      const matches = content.match(rx);
      if (matches) {
        hits += matches.length;
        for (const m of matches) {
          console.error(`\x1b[31m[FORBIDDEN]\x1b[0m ${f}: "${m}"`);
        }
      }
    }
    for (const rx of WARN) {
      const matches = content.match(rx);
      if (matches) {
        warns += matches.length;
        for (const m of matches) {
          console.warn(`\x1b[33m[warn]\x1b[0m ${f}: "${m}" — verify context is a regulated disclaimer`);
        }
      }
    }
  }
}

console.log('');
if (hits > 0) {
  console.error(`\x1b[31m✗ ${hits} forbidden match(es) found — fix before go-live.\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✓ No forbidden promotional wording.\x1b[0m ${warns} soft warning(s).`);
}
