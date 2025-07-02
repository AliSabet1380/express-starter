// 3rd-party lib
import { Router } from "express";

// local modules
import exampleRoutes from "@routes/example/example.route";

// Root Router
const rootRouter = Router();

// Routes
rootRouter.use("/example", exampleRoutes);

// Export
export default rootRouter;
