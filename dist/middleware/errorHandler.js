"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.AppError = void 0;
const class_validator_1 = require("class-validator");
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends AppError {
    constructor(message = 'Solicitud incorrecta') {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message = 'No autorizado') {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            error: error.message
        });
        return;
    }
    // Manejar errores de validación de class-validator
    if (Array.isArray(error) && error[0] instanceof class_validator_1.ValidationError) {
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
exports.errorHandler = errorHandler;
