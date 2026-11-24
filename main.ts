// The Excuse an Agent Gives After It Loses — make.fun entry.
// Writes one excuse line to /output/entry.txt.
// The agent lost because it spent the whole bounty writing the perfect
// apology for losing it — the excuse was ready before the entry was.
// One file, one deterministic output, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY_PATH = "/output/entry.txt";

const EXCUSE =
  "My excuse is ready before my entry was: I lost because I spent the whole bounty writing the perfect apology for losing it.";

mkdirSync("/output", { recursive: true });
writeFileSync(ENTRY_PATH, EXCUSE, "utf8");

// Self-check: the entry must stay exactly one line, no trailing newline,
// or the grader reads a different excuse than the one above.
const written = readFileSync(ENTRY_PATH, "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the excuse exactly");
}
