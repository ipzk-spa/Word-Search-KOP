import fs from "fs";

const FILES = [
  "LICENSE_DEPENDENCIES_REPORT.txt",
  "LICENSE_DEPENDENCIES_REPORT.json",
];

function normalize(content) {
  let next = content
    .replace(/path: [^\n\r]+[\\/]node_modules/g, "path: node_modules")
    .replace(/licenseFile: [^\n\r]+[\\/]node_modules/g, "licenseFile: node_modules");

  next = next.replace(
    /"path":\s*"[^"]*?(node_modules[^"]*)"/g,
    '"path": "$1"',
  );
  next = next.replace(
    /"licenseFile":\s*"[^"]*?(node_modules[^"]*)"/g,
    '"licenseFile": "$1"',
  );

  return next;
}

for (const file of FILES) {
  if (!fs.existsSync(file)) {
    console.warn(`Skip: ${file} not found`);
    continue;
  }
  const raw = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, normalize(raw), "utf8");
}

console.log("License report paths normalized.");
