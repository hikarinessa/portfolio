#!/usr/bin/env node
// Encrypt a media file for the passcode-gated card.
// Output layout: [ salt(16) | iv(12) | AES-256-GCM ciphertext+tag ]
// Browser (js/gate.js) derives the same key via PBKDF2-SHA256 and decrypts.
//
// Usage:  PASSCODE='your code' node tools/encrypt-asset.mjs <input> <output.enc>
//
// The passcode is never written anywhere — it is the decryption key.
// Only the encrypted blob is committed; the plaintext file stays local.

import { webcrypto as wc } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const ITER = 250000; // must match js/gate.js

const [, , inPath, outPath] = process.argv;
const pass = process.env.PASSCODE;

if (!inPath || !outPath || !pass) {
  console.error("Usage: PASSCODE='code' node tools/encrypt-asset.mjs <input> <output.enc>");
  process.exit(1);
}

const data = new Uint8Array(await readFile(inPath));
const salt = wc.getRandomValues(new Uint8Array(16));
const iv = wc.getRandomValues(new Uint8Array(12));

const baseKey = await wc.subtle.importKey(
  'raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']
);
const key = await wc.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
  baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
);
const ct = new Uint8Array(await wc.subtle.encrypt({ name: 'AES-GCM', iv }, key, data));

const out = new Uint8Array(salt.length + iv.length + ct.length);
out.set(salt, 0);
out.set(iv, 16);
out.set(ct, 28);
await writeFile(outPath, out);

console.log(`Encrypted ${data.length.toLocaleString()} B -> ${out.length.toLocaleString()} B  (${outPath})`);
