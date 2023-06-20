import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { setupDatabase } from "@supunreal/database";
import dotenv from 'dotenv';
import conversationRouter from "./router/conversation.js";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

(async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }));
  app.use(cookieParser());
  app.use(cors());
  app.options('*', cors());

  const DATABASE_URL = process.env.DATABASE_URL;
  await setupDatabase(DATABASE_URL);

  app.use("/conversations", conversationRouter);

  const port = 3004;
  app.listen(port, () => {
    console.log(`API-CONVERSATIONS running on http://localhost:${port} !`);
  });
})();