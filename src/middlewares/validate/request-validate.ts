import { AppError } from "@/utils/errors/app-error";
import { catchAsync } from "@utils/catch-async";

import type { ZodError } from "zod";
import type { ValidateOptions } from "@middlewares/validate/request-validate-types";

function getUnrecognizedKeysMessage(error: ZodError): string | null {
  const extraKeys = error.issues
    .filter((issue) => issue.code === "unrecognized_keys")
    .flatMap((issue) => issue.keys ?? []);

  if (extraKeys.length > 0) {
    return `فیلد(های) نامعتبر ارسال شده‌اند: ${extraKeys.join("، ")}`;
  }

  return null;
}

export const validate = <TBody, TParams, TQuery>(
  validateOptions?: ValidateOptions<TBody, TParams, TQuery>
) =>
  catchAsync(async (req, res, next) => {
    if (validateOptions?.body) {
      const result = validateOptions.body.safeParse(req.body);

      if (!result.success) {
        const extraFieldMsg = getUnrecognizedKeysMessage(result.error);
        return next(
          new AppError(
            extraFieldMsg ??
              "خطا در اعتبارسنجی داده‌های ارسال‌شده در بدنه درخواست.",
            400,
            result.error.flatten().fieldErrors
          )
        );
      }
    }

    if (validateOptions?.params) {
      const result = validateOptions.params.safeParse(req.params);

      if (!result.success) {
        const extraFieldMsg = getUnrecognizedKeysMessage(result.error);
        return next(
          new AppError(
            extraFieldMsg ?? "پارامترهای آدرس به درستی وارد نشده‌اند.",
            400,
            result.error.flatten().fieldErrors
          )
        );
      }
    }

    if (validateOptions?.query) {
      const result = validateOptions.query.safeParse(req.query);

      if (!result.success) {
        const extraFieldMsg = getUnrecognizedKeysMessage(result.error);
        return next(
          new AppError(
            extraFieldMsg ?? "پارامترهای Query معتبر نیستند.",
            400,
            result.error.flatten().fieldErrors
          )
        );
      }
    }

    next();
  });
