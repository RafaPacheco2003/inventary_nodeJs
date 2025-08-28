import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Solicitud incorrecta') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'No autorizado') {
    super(message, 401);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
    return;
  }

  // Manejar errores de validación de class-validator
  if (Array.isArray(error) && error[0] instanceof ValidationError) {
    const errorMessages = error.map(err => Object.values(err.constraints)).flat();
    res.status(400).json({
      success: false,
      error: errorMessages.join(', ')
    });
    return;
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
};