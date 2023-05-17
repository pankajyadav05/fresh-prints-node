import express from "express";
import ExpressApp from "./express-app.js";
import { logger } from "./utils/index.js";

const PORT = 3000;

const StartServer = async () => {
  const app = express();

  await ExpressApp(app);

  app
    .listen(PORT, () => {
      logger.info(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      logger.error(err);
      process.exit();
    });
};

StartServer();
