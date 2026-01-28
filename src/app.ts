import express, {Application, NextFunction, Request, Response} from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({message: "Server is running"});
});

app.get("/error", (req, res) => {
  throw new Error("This is a forced error");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  res.status(500).json({message: err.message});
});

app.use((req: Request, res: Response) => {
  res.status(404).json({message: "Not Found"});
});

export default app;
