import { NextFunction, Response, Request } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

export function errorBoundary(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (e) {
      next(e)
    }
  };
}

export async function errorMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
  const isInstanceOfError = error instanceof Error;

  if (!isInstanceOfError) {
    console.error("[ Unknown error ]", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }

  if (error instanceof yup.ValidationError) {
    console.error("[ Validation error ]", error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }

  console.error("[ Unhandled error ]", error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}