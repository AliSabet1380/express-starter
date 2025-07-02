import { Router } from "express";

import { exampleController } from "@controllers/example.controller";
import { validate } from "@middlewares/validate/request-validate";
import { exampleSchema } from "@schemas/example.schema";

const router = Router();

router.get("/", exampleController.exmaple);
router.post(
  "/",
  validate({
    body: exampleSchema,
  }),
  exampleController.postExample
);

export default router;
