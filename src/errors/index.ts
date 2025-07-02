export const Errors = {
  NotFound: ["موردی یافت نشد.", 404] as const,
  BadRequest: ["درخواست نامعتبر است.", 400] as const,
  Unauthorized: ["برای دسترسی به این بخش باید وارد شوید.", 401] as const,
  Forbidden: ["شما اجازه دسترسی به این بخش را ندارید.", 403] as const,
  Internal: ["خطای داخلی سرور رخ داده است.", 500] as const,
  Conflict: ["درخواست با داده‌های موجود در تضاد است.", 409] as const,
  Validation: ["داده‌های وارد شده معتبر نیستند.", 400] as const,
  Timeout: ["درخواست بیش از حد طول کشید.", 408] as const,
  TooManyRequests: ["تعداد درخواست‌ها بیش از حد مجاز است.", 429] as const,
};
