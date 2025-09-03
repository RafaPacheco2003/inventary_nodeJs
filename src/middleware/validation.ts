import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestError } from "./errorHandler";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

/**
 * MIDDLEWARE DE VALIDACIÓN DE DATOS
 *
 * Este middleware genérico se utiliza para validar los datos de entrada
 * usando la biblioteca class-validator. Garantiza que todos los datos
 * cumplan con las reglas de validación definidas en los DTOs antes de
 * ser procesados por los controladores.
 *
 * Características importantes:
 * - Usa class-validator y class-transformer para validación basada en decoradores
 * - Maneja especialmente los archivos adjuntos para evitar conflictos con la validación
 * - Implementa whitelist y forbidNonWhitelisted para seguridad (evitar datos no autorizados)
 * - Formatea los errores de validación para hacerlos legibles
 */

/**
 * Middleware genérico para validar DTOs
 *
 * Esta función crea un middleware que valida los datos de la solicitud
 * contra un DTO específico usando los decoradores de class-validator.
 *
 * @param dto - La clase DTO a utilizar para validar (debe tener decoradores de class-validator)
 * @param skipMissingProperties - Si se deben ignorar propiedades faltantes (útil para actualizaciones parciales)
 * @returns Un middleware de Express que valida los datos de entrada
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
      // Detectar si hay archivos adjuntos en la solicitud
      // Esto es importante para manejar correctamente los campos de imagen
      const hasFile =
        req.file || (req.files && Object.keys(req.files).length > 0);

      // Guardar una copia del body original para restaurarlo después
      const originalBody = { ...req.body };

      // Si hay un archivo pero el campo image está vacío, omitimos la validación de ese campo
      // Esto es porque el campo image será procesado por el middleware de carga de archivos
      if (hasFile && (!req.body.image || req.body.image === "")) {
        delete req.body.image;
      }

      // Transformar los datos planos (de req.body) a una instancia del DTO
      const dtoObject = plainToInstance(dto, req.body);

      // Validar el objeto usando class-validator
      const errors = await validate(dtoObject, {
        skipMissingProperties, // Para actualizaciones parciales
        whitelist: true, // Solo permitir propiedades definidas en el DTO
        forbidNonWhitelisted: true, // Rechazar propiedades no definidas en el DTO (seguridad)
      });

      // Si hay errores de validación, lanzar un error con mensajes formatados
      if (errors.length > 0) {
        const message = formatValidationErrors(errors);
        throw new BadRequestError(message);
      }

      // Si la validación es exitosa, restaurar el body original (que puede incluir la URL de la imagen)
      req.body = originalBody;
      next();
    } catch (error) {
      // Pasar cualquier error al manejador de errores global
      next(error);
    }
  };
}

/**
 * Formatea los errores de validación en un mensaje legible
 *
 * Convierte los objetos de error de class-validator en un string legible
 * que se puede enviar al cliente en la respuesta HTTP.
 *
 * @param errors - Array de errores de validación de class-validator
 * @returns String formateado con todos los mensajes de error
 */
function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      if (error.constraints) {
        // Convertir el objeto constraints en un array de mensajes y unirlos
        return Object.values(error.constraints).join(", ");
      }
      return "";
    })
    .filter((message) => message !== "") // Eliminar mensajes vacíos
    .join("; "); // Unir todos los mensajes con punto y coma
}

// Middlewares específicos pre-configurados para validar usuarios
// Estos son atajos convenientes para los casos de uso más comunes
export const validateUserCreate = validateDto(CreateUserDto);
export const validateUserUpdate = validateDto(UpdateUserDto, true); // skipMissingProperties=true para actualizaciones parciales
