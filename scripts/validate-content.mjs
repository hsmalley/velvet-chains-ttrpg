#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(repoRoot, 'src', 'content', 'docs');

const ENTRY_TYPES = new Set(['page', 'character', 'companion', 'faction', 'adventure', 'place', 'map']);

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function asArray(value) {
  return Array.isArray(value) ? value : null;
}

function ensureArrayOfStrings(field, value, errors) {
  if (value === undefined) return;
  const arr = asArray(value);
  if (!arr || !arr.every((item) => typeof item === 'string')) {
    errors.push(`${field} must be an array of strings`);
  }
}

function extractFrontmatter(raw) {
  const matcher = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = raw.match(matcher);
  if (!match) {
    throw new Error('Missing frontmatter block (expected YAML frontmatter delimited by ---).');
  }
  try {
    const data = parseYaml(match[1]) ?? {};
    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Frontmatter must resolve to an object');
    }
    return data;
  } catch (error) {
    throw new Error(`Invalid YAML frontmatter: ${error.message}`);
  }
}

function validateAttributes(entryType, frontmatter, errors) {
  switch (entryType) {
    case 'character': {
      if (!isString(frontmatter.name)) errors.push('name is required for characters');
      if (!isString(frontmatter.class)) errors.push('class is required for characters');
      if (!isNumber(frontmatter.level)) errors.push('level must be a number for characters');
      if (!isString(frontmatter.system)) errors.push('system is required for characters');
      if ('alignment' in frontmatter && !isString(frontmatter.alignment)) errors.push('alignment must be a string when provided');
      break;
    }
    case 'companion': {
      if (!isString(frontmatter.name)) errors.push('name is required for companions');
      if (!isString(frontmatter.species)) errors.push('species is required for companions');
      if (!isString(frontmatter.bonded_to)) errors.push('bonded_to is required for companions');
      break;
    }
    case 'faction': {
      if (!isString(frontmatter.name)) errors.push('name is required for factions');
      if (!isString(frontmatter.alignment)) errors.push('alignment is required for factions');
      break;
    }
    case 'adventure': {
      if (!isString(frontmatter.name)) errors.push('name is required for adventures');
      const level = frontmatter.recommendedLevel;
      if (!(isString(level) || isNumber(level))) {
        errors.push('recommendedLevel must be a string or number for adventures');
      }
      if (!isString(frontmatter.duration)) errors.push('duration is required for adventures');
      if ('location' in frontmatter && !isString(frontmatter.location)) {
        errors.push('location must be a string when provided on adventures');
      }
      break;
    }
    case 'place': {
      if (!isString(frontmatter.name)) errors.push('name is required for places');
      if (!isString(frontmatter.location)) errors.push('location is required for places');
      break;
    }
    case 'map': {
      if (!isString(frontmatter.name)) errors.push('name is required for maps');
      if (!isString(frontmatter.mapScale)) errors.push('mapScale is required for maps');
      if ('mapDimensions' in frontmatter && !isString(frontmatter.mapDimensions)) {
        errors.push('mapDimensions must be a string when provided');
      }
      if ('location' in frontmatter && !isString(frontmatter.location)) {
        errors.push('location must be a string when provided on maps');
      }
      break;
    }
    default:
      break;
  }
}

async function walkMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkMarkdownFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  let hasErrors = false;
  const files = await walkMarkdownFiles(contentRoot);
  for (const filePath of files) {
    const relativePath = path.relative(repoRoot, filePath);
    let raw;
    try {
      raw = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error(`❌ ${relativePath}: unable to read file (${error.message})`);
      hasErrors = true;
      continue;
    }

    let frontmatter;
    try {
      frontmatter = extractFrontmatter(raw);
    } catch (error) {
      console.error(`❌ ${relativePath}: ${error.message}`);
      hasErrors = true;
      continue;
    }

    const errors = [];
    if (!isString(frontmatter.title)) {
      errors.push('title is required and must be a non-empty string');
    }
    if ('description' in frontmatter && !isString(frontmatter.description)) {
      errors.push('description must be a non-empty string when provided');
    }

    const entryType = frontmatter.entryType ?? 'page';
    if (!ENTRY_TYPES.has(entryType)) {
      errors.push(`entryType must be one of: ${Array.from(ENTRY_TYPES).join(', ')}`);
    }

    ensureArrayOfStrings('tags', frontmatter.tags, errors);

    if (ENTRY_TYPES.has(entryType)) {
      validateAttributes(entryType, frontmatter, errors);
    }

    if (errors.length > 0) {
      hasErrors = true;
      for (const message of errors) {
        console.error(`❌ ${relativePath}: ${message}`);
      }
    }
  }

  if (hasErrors) {
    console.error('\nFrontmatter validation failed.');
    process.exit(1);
  } else {
    console.log('✅ All content frontmatter passed validation.');
  }
}

main().catch((error) => {
  console.error('Unexpected error during validation:', error);
  process.exit(1);
});
