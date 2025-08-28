import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestError } from "./errorHandler";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

/**
 * Middleware genérico para validar DTOs
 * @param dto - La clase DTO a validar
 * @param skipMissingProperties - Si se deben omitir las propiedades faltantes
 */
export function validateDto<T extends object>(
  dto: new () => T,
  skipMissingProperties = false
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dtoObject = plainToInstance(dto, req.body);
      const errors = await validate(dtoObject, {
        skipMissingProperties,
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const message = formatValidationErrors(errors);
        throw new BadRequestError(message);
      }

      req.body = dtoObject;
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Formatea los errores de validación en un mensaje legible
 */
function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      if (error.constraints) {
        return Object.values(error.constraints).join(", ");
      }
      return "";
    })
    .filter((message) => message !== "")
    .join("; ");
}

// Middlewares específicos para validar usuarios
export const validateUserCreate = validateDto(CreateUserDto);
export const validateUserUpdate = validateDto(UpdateUserDto, true);
