import {Server} from "http";
import app from "./app";
import {errorLogger, logger} from "./app/src/shared/logger";
import mongoose from "mongoose";
import config from "./app/config";
import { Pool } from "pg";

let server: Server;

// PostgreSQL connection pool
 const pgPool = new Pool({ connectionString: config.postgres_database_url});

async function main() {
  try {
    // Connect MongoDB
    await mongoose.connect(config.mongo_container_database_url as string);
    logger.info("✅ Connected to MongoDB");

    // Connect PostgreSQL
    // await pgPool.connect();
    //  logger.info("✅ Connected to PostgreSQL");

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
      logger.info(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
    errorLogger.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  errorLogger.error(err);
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  errorLogger.error("uncaughtException is detected");
  process.exit(1);
});
