import { createApp } from './app';
import { ConfigObject } from './config/index';

async function main() {
  const app = await createApp();
  const port = ConfigObject.port;
  const host = ConfigObject.host;

  app.listen(port, () => {
    console.log(`Server läuft auf http://${host}:${port}`);
  });
}

main().catch((err) => {
  console.error('Fehler beim Starten des Servers:', err);
  process.exit(1);
});
