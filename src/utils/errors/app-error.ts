export class AppError extends Error {
  public statusCode: number;
  public details?: any;
  public status: string;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
