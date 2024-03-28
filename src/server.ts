import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { getUserPayload } from './getUserPayload';
import { nextApp, nextHandler } from './next-utils';
import bodyParser from 'body-parser';
import nextBuild from 'next/dist/build';
const app = express();

app.use(express.json());
app.use(bodyParser.json());

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
const PORT = Number(process.env.PORT) || 3000;

// app.post('/api/signIn', (req: Request) => {
//   const body = req.body;

//   const text = JSON.parse(JSON.stringify(body));

//   return new Response(JSON.stringify({ email: text }));
// });

//自訂伺服器
const start = async () => {
  const payload = await getUserPayload({
    initialOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info('Next.js is building for production.');
      //@ts-expect-error
      await nextBuild(path.join(__dirname, '../'));
      process.exit();
    });
    return;
  }

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload?.logger?.info('Next.js started');

    app.listen(PORT, async () => {
      payload?.logger?.info(
        `Next.js App URL:${process.env.NEXT_PUBLIC_SERVER_URL} `
      );
    });
  });
};

start();
