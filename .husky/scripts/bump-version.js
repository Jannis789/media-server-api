import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import translations from '../../src/assets/translations.json' with { type: 'json' };

// Prüfe, ob translations.json geändert wurde
const changedFiles = execSync('git diff --name-only HEAD~1 HEAD').toString().split('\n');
if (!changedFiles.includes('src/assets/translations.json')) {
  process.exit(0);
}

let version = translations.metadata.version || '00.00.00';
let lastUpdated = translations.metadata.lastUpdated;
lastUpdated = new Date().toISOString().split('T')[0];

let parts = version.split('.').map(Number);

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

version = parts.map(n => n.toString().padStart(2, '0')).join('.');

translations.metadata.version = version;

// Pfad zur JSON-Datei (relativ zum aktuellen Arbeitsverzeichnis)
const filePath = path.resolve('src/assets/translations.json');

fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));

console.log(`✅ Version updated to ${version}`);
