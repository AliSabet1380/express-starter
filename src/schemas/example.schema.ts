import { z } from "zod";

export const exampleSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "مقدار باید رشته ای باشد",
        required_error: "این فیلد اجباری است",
      })
      .min(1, "مقدار باید حداقل یک کاراکتر باشد"),
  })
  .strict();
