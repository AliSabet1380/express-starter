// 3rd-party lib
import morgan from "morgan";
import express, { json } from "express";

// local modules
import rootRouter from "@/routes";
import { globalErrorHandler } from "@middlewares/error/global-error-handler";

// app
const app = express();

// Global middlewares
app.use(json());
app.use(morgan("dev"));

// Routes
app.use("/api", rootRouter);

// Global Error Handler ------ Latest Middleware
app.use(globalErrorHandler);

export default app;
