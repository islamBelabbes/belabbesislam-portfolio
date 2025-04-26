export class AppError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthError extends Error {
  statusCode: number;
  constructor() {
    super("You are not authorized to access this resource.");
    this.name = "AuthError";
    this.statusCode = 401;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor() {
    super("Resource not found.");
    this.name = "NotFoundError";
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}
