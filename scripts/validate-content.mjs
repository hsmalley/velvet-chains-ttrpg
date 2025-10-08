#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { walkMarkdownFiles } from './utils.mjs';
import { ENTRY_TYPES as entryTypesArray } from '../src/entry-types.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(repoRoot, 'src', 'content', 'docs');

const ENTRY_TYPES = new Set(entryTypesArray);

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
    case 'document':
      // No specific attributes for 'document' type yet.
      break;
    case 'appendix':
      // No specific attributes for 'document' type yet.
      break;
    case 'codex':
      // No specific attributes for 'document' type yet.
      break;
    case 'character': {
      if (!isString(frontmatter.name)) errors.push('name is required for characters');
      if (!isString(frontmatter.system)) errors.push('system is required for characters');
      if (!isString(frontmatter.alignment)) errors.push('alignment is required for characters');
      if (
        !(
          isString(frontmatter.tier) ||
          isNumber(frontmatter.tier)
        )
      ) {
        errors.push('tier must be a string or number for characters');
      }
      if (!isString(frontmatter.arc)) errors.push('arc is required for characters');
      if (!isString(frontmatter.affiliation)) errors.push('affiliation is required for characters');
      if (!isString(frontmatter.archetype)) errors.push('archetype is required for characters');
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
    case 'artifact': {
      if (!isString(frontmatter.arc)) errors.push('arc is required for artifacts');
      if ('rarity' in frontmatter && !isString(frontmatter.rarity)) {
        errors.push('rarity must be a string when provided on artifacts');
      }
      if ('level' in frontmatter && !isNumber(frontmatter.level)) {
        errors.push('level must be numeric when provided on artifacts');
      }
      break;
    }
    case 'artifact-collection': {
      if (!isString(frontmatter.arc)) errors.push('arc is required for artifact collections');
      break;
    }
    case 'arc': {
      if (!isString(frontmatter.arc)) errors.push('arc is required for story arcs');
      break;
    }
    case 'ritual': {
      if (!isString(frontmatter.castingTime)) errors.push('castingTime is required for rituals');
      if (!isString(frontmatter.participants)) errors.push('participants is required for rituals');
      if ('level' in frontmatter && !isNumber(frontmatter.level)) {
        errors.push('level must be numeric when provided on rituals');
      }
      break;
    }
    case 'logbook': {
      if ('author' in frontmatter && !isString(frontmatter.author)) {
        errors.push('author must be a string when provided on logbooks');
      }
      break;
    }
    case 'ship': {
      if (!isString(frontmatter.arc)) errors.push('arc is required for ships');
      if (!isString(frontmatter.affiliation)) errors.push('affiliation is required for ships');
      if (!isString(frontmatter.captain)) errors.push('captain is required for ships');
      break;
    }
    case 'gm-guide': {
      if ('arc' in frontmatter && !isString(frontmatter.arc)) {
        errors.push('arc must be a string when provided on GM guides');
      }
      break;
    }
    default:
      break;
  }
}

const SAFE_WORD = 'fiction';

async function main() {
  let hasErrors = false;
  const warnings = [];
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

    if (!raw.toLowerCase().includes(SAFE_WORD)) {
      const warningMessage = `⚠️ ${relativePath}: safe word "${SAFE_WORD}" not found in content.`;
      console.warn(warningMessage);
      warnings.push(warningMessage);
    }

    if (errors.length > 0) {
      hasErrors = true;
      for (const message of errors) {
        console.error(`❌ ${relativePath}: ${message}`);
      }
    }
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️ Safe word audit: ${warnings.length} file(s) are missing the safe word "${SAFE_WORD}". Add it to stay in canon.`);
  } else {
    console.log('✅ Safe word audit: every document invokes the safe word "fiction".');
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
