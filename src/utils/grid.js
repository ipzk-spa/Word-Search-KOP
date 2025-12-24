export function posKey(r, c) {
  return `${r}:${c}`;
}

export function parseKey(key) {
  const [r, c] = key.split(":").map(Number);
  return { r, c };
}

export function directionOfPath(pathKeys) {
  if (pathKeys.length < 2) return null;

  const p0 = parseKey(pathKeys[0]);
  const p1 = parseKey(pathKeys[1]);
  const dr = Math.sign(p1.r - p0.r);
  const dc = Math.sign(p1.c - p0.c);

  if (dr === 0 && dc === 0) return null;

  for (let i = 1; i < pathKeys.length; i++) {
    const prev = parseKey(pathKeys[i - 1]);
    const cur = parseKey(pathKeys[i]);

    if (Math.sign(cur.r - prev.r) !== dr) return null;
    if (Math.sign(cur.c - prev.c) !== dc) return null;
    if (Math.abs(cur.r - prev.r) > 1) return null;
    if (Math.abs(cur.c - prev.c) > 1) return null;
  }

  return { dr, dc };
}

export function lettersFromPath(board, pathKeys) {
  return pathKeys
    .map((k) => {
      const { r, c } = parseKey(k);
      return board[r][c];
    })
    .join("");
}

export function normalizeWord(s) {
  return (s || "").toUpperCase().replace(/[^A-ZА-ЯІЇЄҐ]/g, "");
}
