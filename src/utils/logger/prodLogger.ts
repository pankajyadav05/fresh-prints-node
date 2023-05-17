import { createLogger, format, transports } from "winston";
import myFormat from "./format.js";
// import "winston-mongodb";

const { combine, timestamp, json, metadata } = format;

const ProdLogger = () => {
  return createLogger({
    level: "info",

    format: combine(timestamp(), json(), myFormat, metadata()),

    transports: [
      new transports.Console(),
      new transports.File({ filename: "error.log", level: "error" }),
    ],
  });

  // we should use below one if we are using real DB

  // return createLogger({
  //   level: "info",

  //   format: combine(timestamp(), json(), myFormat, metadata()),

  //   transports: [
  //     new transports.Console(),
  //     new transports.MongoDB({
  //       level: "error",
  //       db: DB_URL,
  //       options: { useUnifiedTopology: true },
  //       collection: "errorlogs",
  //     }),
  //   ],
  // });
};

export default ProdLogger;
