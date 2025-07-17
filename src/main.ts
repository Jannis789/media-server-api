import resolver from './routes/resolver';

async function main() {

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    console.log(`Server läuft auf http://localhost:${port}`);

    Bun.serve({
        fetch: resolver.fetch,
        port,
    });
}

main();
