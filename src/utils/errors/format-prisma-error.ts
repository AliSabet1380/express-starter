import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from "@prisma/client/runtime/library";

import { AppError } from "@utils/errors/app-error";

export function formatPrismaError(error: unknown): AppError {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const targets = error.meta?.target;
        const fields = Array.isArray(targets)
          ? targets.join("، ")
          : "فیلد نامشخص";
        return new AppError(
          `مقداری که وارد کردید در فیلد(های) ${fields} تکراری است. لطفاً مقدار متفاوتی وارد کنید.`,
          400
        );
      }
      case "P2025":
        return new AppError(
          `رکورد مورد نظر یافت نشد. احتمالاً این داده قبلاً حذف شده یا اصلاً وجود نداشته است.`,
          404
        );
      case "P2003":
        return new AppError(
          `عملیات انجام نشد چون به داده‌ای اشاره شده که وجود ندارد. لطفاً داده‌های وابسته را بررسی کنید.`,
          400
        );
      default:
        return new AppError(
          `خطایی در پایگاه داده رخ داده است (کد خطا: ${error.code}). لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.`,
          500
        );
    }
  }

  if (error instanceof PrismaClientValidationError) {
    return new AppError(
      `اطلاعات وارد شده معتبر نیستند. لطفاً داده‌ها را بررسی و اصلاح کنید. جزئیات: ${error.message}`,
      400
    );
  }

  if (error instanceof PrismaClientInitializationError) {
    return new AppError(
      `ارتباط با پایگاه داده برقرار نشد. لطفاً اتصال سرور را بررسی کنید یا بعداً تلاش کنید.`,
      500
    );
  }

  if (error instanceof PrismaClientRustPanicError) {
    return new AppError(
      `خطای جدی در پایگاه داده رخ داده است. لطفاً با پشتیبانی تماس بگیرید.`,
      500
    );
  }

  if (error instanceof Error) {
    return new AppError(`خطایی رخ داده است: ${error.message}`, 500);
  }

  return new AppError(
    "خطای ناشناخته‌ای رخ داده است. لطفاً دوباره تلاش کنید.",
    500,
    error
  );
}
