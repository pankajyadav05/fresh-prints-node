import { AppError, logger } from "../utils/index.js";
import { Request, Response, NextFunction } from "express";

const ErrorHandler = (
  error: { message: any; errorCode: any; statusCode: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    ErrorLogger(error.message, req, error.errorCode);

    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  ErrorLogger(`${error}`, req, 500);

  return res.status(500).json({ message: `${error}` });
};

async function ErrorLogger(message: string, req: Request, errorCode: number) {
  logger.error(message, {
    errorCode,
    body: req.body,
  });
}

export default ErrorHandler;
