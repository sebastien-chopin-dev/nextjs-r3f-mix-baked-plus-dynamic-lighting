// Next 16.4 static export writes route segment payloads nested
// (out/rover/__next.rover/__PAGE__.txt) while the client router requests them flat
// (out/rover/__next.rover.__PAGE__.txt), which 404s on a static host. Copy each one
// to the flat name. Runs after `next build`.
import { copyFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") walk(path);
      continue;
    }
    const parts = relative(OUT, path).split(sep);
    const first = parts.findIndex((part) => part.startsWith("__next."));
    if (first === -1 || first === parts.length - 1) continue;
    const flat = join(OUT, ...parts.slice(0, first), parts.slice(first).join("."));
    copyFileSync(path, flat);
    console.log(`flattened ${relative(OUT, flat)}`);
  }
}

walk(OUT);
