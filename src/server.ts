import {Server} from "http";
import app from "./app";

let server: Server;

async function main() {
  try {
    server = app.listen(5000, () => {
      console.log("App is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection is detected, shutting down .......", err);

  if (server) {
    server.close(() => process.exit(1));
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected, shutting down .......");
  process.exit(1);
});
