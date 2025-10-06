#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const SAFE_WORD = 'fiction';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(repoRoot, 'src', 'content', 'docs');

async function collectMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const files = await collectMarkdownFiles(contentRoot);
  const warnings = [];

  for (const filePath of files) {
    const relative = path.relative(repoRoot, filePath);
    const raw = await fs.readFile(filePath, 'utf8');
    if (!raw.toLowerCase().includes(SAFE_WORD)) {
      const message = `⚠️ ${relative}: safe word "${SAFE_WORD}" not found.`;
      console.warn(message);
      warnings.push(message);
    }
  }

  if (warnings.length === 0) {
    console.log('✅ Safe word audit: every document invokes "fiction".');
  } else {
    console.warn(`\n⚠️ Safe word audit: ${warnings.length} file(s) are missing the safe word "${SAFE_WORD}".`);
  }
}

main().catch((error) => {
  console.error('Unexpected error during safe word audit:', error);
  process.exit(1);
});
