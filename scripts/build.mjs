import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src');
const output = resolve(root, 'public');
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

function cssFromSource(sourceCss) {
  return sourceCss
    .replace(/^\s*\/\/.*(?:\r?\n|$)/gm, '')
    .replaceAll('__VERSION__', packageJson.version);
}

async function replaceVersionMarkers(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await replaceVersionMarkers(path);
    if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      await writeFile(path, html.replaceAll('__VERSION__', packageJson.version));
    }
  }
}

function minifyCss(css) {
  let result = '';
  let quote = '';
  let pendingSpace = false;

  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    const next = css[index + 1];

    if (quote) {
      result += character;
      if (character === '\\') result += css[++index] ?? '';
      else if (character === quote) quote = '';
      continue;
    }

    if (character === '"' || character === "'") {
      if (pendingSpace && result && !/[{(:,;>+~]/.test(result.at(-1))) result += ' ';
      pendingSpace = false;
      quote = character;
      result += character;
      continue;
    }

    if (character === '/' && next === '*') {
      const end = css.indexOf('*/', index + 2);
      if (end === -1) throw new Error('Unterminated CSS comment');
      if (css[index + 2] === '!') result += css.slice(index, end + 2);
      index = end + 1;
      continue;
    }

    if (/\s/.test(character)) {
      pendingSpace = true;
      continue;
    }

    if (pendingSpace && result && !/[{(:,;>+~]/.test(result.at(-1)) && !/[}),:;>+~]/.test(character)) result += ' ';
    pendingSpace = false;
    result += character;
  }

  return result.replace(/;}/g, '}');
}

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });
await rm(resolve(output, 'sass'), { recursive: true, force: true });
await replaceVersionMarkers(output);

const css = cssFromSource(await readFile(resolve(source, 'sass/modesto.scss'), 'utf8'));
await mkdir(resolve(output, 'css'), { recursive: true });
await writeFile(resolve(output, 'css/modesto.css'), css);
await writeFile(resolve(output, 'css/modesto.min.css'), minifyCss(css));

const indexPath = resolve(output, 'index.html');
const index = await readFile(indexPath, 'utf8');
await writeFile(indexPath, index.replace('href="css/modesto.css"', 'href="css/modesto.min.css"'));
