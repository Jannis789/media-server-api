import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import translations from "../../src/assets/translations.json" with { type: "json" };

updateTranslationsVersion();
updateMetadata();

function updateTranslationsVersion() {
  // Prüfe, ob translations.json geändert wurde
  const changedFiles = execSync("git diff --name-only HEAD~1 HEAD")
    .toString()
    .split("\n");
  if (!changedFiles.includes("src/assets/translations.json")) {
    process.exit(0);
  }

  let version = translations.metadata.version || "00.00.00";
  translations.metadata.lastUpdated = new Date().toISOString();

  let parts = version.split(".").map(Number);

  if (parts[2] < 99) {
    parts[2]++;
  } else {
    parts[2] = 0;
    if (parts[1] < 99) {
      parts[1]++;
    } else {
      parts[1] = 0;
      if (parts[0] < 99) {
        parts[0]++;
      }
    }
  }

  version = parts.map((n) => n.toString().padStart(2, "0")).join(".");

  translations.metadata.version = version;

  // Pfad zur JSON-Datei (relativ zum aktuellen Arbeitsverzeichnis)
  const filePath = path.resolve("src/assets/translations.json");

  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));

  console.log(`✅ Version updated to ${version}`);
}

function updateMetadata() {
  const metadataPath = "../../metadata.json";
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));

  // Aktuelle Commit-Hashes und Branch holen
  const currentCommit = execSync("git rev-parse HEAD").toString().trim();
  let lastCommit;
  try {
    lastCommit = execSync("git rev-parse HEAD~1").toString().trim();
  } catch {
    lastCommit = currentCommit;
  }
  const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim();

  // Felder aktualisieren
  metadata.currentCommit = currentCommit;
  metadata.lastCommit = lastCommit;
  metadata.version = version;
  metadata.currentBranch = currentBranch;

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 4));
}