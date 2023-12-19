import { Request, Response, NextFunction } from 'express';
import { isAxiosError } from 'axios';
import { HttpError } from '../helpers/httpError.helper';

export const handleHttpErrors = (
  error: Error & Partial<HttpError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAxiosError(error)) {
    if (error.response?.status) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data });
    }

    return res.status(500).json({ message: 'Erro interno do servidor.' });
  } else {
    const statusCode = error.statusCode || 500;

    const message = error.statusCode
      ? error.message
      : 'Erro interno do servidor.';

    return res.status(statusCode).json({ message });
  }
};
