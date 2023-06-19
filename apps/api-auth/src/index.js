import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {setupDatabase} from "@supunreal/database";
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

(async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cookieParser());

  const DATABASE_URL = process.env.DATABASE_URL;
  await setupDatabase(DATABASE_URL);

  app.get('/auth', (req, res) => {
    return res.json({message: 'Welcome to API-AUTH !'});
  });

  const port = 3001;
  app.listen(port, () => {
    console.log(`API-AUTH running on http://localhost:${port} !`);
  });
})();