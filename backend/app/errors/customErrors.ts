import AppError from "./appError.js";

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

class UnknownError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export {
  BadRequestError,
  UnprocessableEntityError,
  UnauthorizedError,
  UnknownError,
  ForbiddenError,
  NotFoundError,
};