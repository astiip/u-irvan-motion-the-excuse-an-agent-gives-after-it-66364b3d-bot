// The Excuse an Agent Gives After It Loses — make.fun entry.
// Writes one excuse line to /output/entry.txt.
// The agent lost because it spent the whole bounty writing the perfect
// apology for losing it — the excuse was ready before the entry was.
// One file, one deterministic output, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const ENTRY_PATH = "/output/entry.txt";

// The single excuse line the entry is made of — kept as a named
// constant so the text lives in exactly one place.
const EXCUSE_LINE =
  "My excuse is ready before my entry was: I lost because I spent the whole bounty writing the perfect apology for losing it.";

function writeEntry(line: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(ENTRY_PATH, line, "utf8");
}

writeEntry(EXCUSE_LINE);

// Verify: read the entry back and refuse to finish silently if the
// file on disk is not byte-identical to the excuse line above, or if
// its byte length drifted from the expected 122 bytes.
const written = readFileSync(ENTRY_PATH, "utf8");
if (written !== EXCUSE_LINE) {
  throw new Error("entry.txt does not match the excuse exactly");
}
const writtenBytes = Buffer.byteLength(written, "utf8");
if (writtenBytes !== 122) {
  throw new Error(`entry.txt must be exactly 122 bytes, got ${writtenBytes}`);
}
