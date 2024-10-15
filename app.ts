import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";

import authRouter from "./routes/auth";

import error from "./controllers/error";

const app = express();
const server = createServer(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use(error);

export default server;
