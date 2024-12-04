import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", routes);

export default app;
