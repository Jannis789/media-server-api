import { createApp } from './app';
import { ConfigObject } from './config/index';
import { Translation } from './db/entities';
import { TranslationService } from './services/Translation/TranslationService';
import { overrideTranslations } from './utils/overrideTranslations';

const args = process.argv.slice(2);

async function main() {
  const app = await createApp();
  const port = ConfigObject.port;
  const host = ConfigObject.host;

  if (args.includes('--delete-translations')) {
    console.log('Deleting all translations...');
    em.getRepository(Translation).nativeDelete({});
    process.exit(0);
  }
  
  if (args.includes('--override-translations')) {
    console.log('Overriding translations...');
    await overrideTranslations();
    process.exit(0);
  }

  const translationService = new TranslationService(global.em);

  translationService.cacheAllTranslations()

  app.listen(port, () => {
    console.log(`Server läuft auf http://${host}:${port}`);
  });

}

main().catch((err) => {
  console.error('Fehler beim Starten des Servers:', err);
  process.exit(1);
});
