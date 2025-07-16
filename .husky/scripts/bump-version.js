import { execSync } from 'child_process';
import translations from './src/assets/translations.json' assert { type: "json" };

// Prüfe, ob translations.json geändert wurde
const changedFiles = execSync('git diff --name-only HEAD~1 HEAD').toString().split('\n');
if (!changedFiles.includes('src/assets/translations.json')) {
    process.exit(0);
}

var version = translations['metadata']['version'] || '00.00.00';

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