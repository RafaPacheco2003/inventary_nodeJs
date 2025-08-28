"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = exports.validateUserCreate = void 0;
exports.validateDto = validateDto;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const errorHandler_1 = require("./errorHandler");
const user_dto_1 = require("../dtos/user.dto");
/**
 * Middleware genérico para validar DTOs
 * @param dto - La clase DTO a validar
 * @param skipMissingProperties - Si se deben omitir las propiedades faltantes
 */
function validateDto(dto, skipMissingProperties = false) {
    return async (req, res, next) => {
        try {
            const dtoObject = (0, class_transformer_1.plainToInstance)(dto, req.body);
            const errors = await (0, class_validator_1.validate)(dtoObject, {
                skipMissingProperties,
                whitelist: true,
                forbidNonWhitelisted: true,
            });
            if (errors.length > 0) {
                const message = formatValidationErrors(errors);
                throw new errorHandler_1.BadRequestError(message);
            }
            req.body = dtoObject;
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
/**
 * Formatea los errores de validación en un mensaje legible
 */
function formatValidationErrors(errors) {
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
exports.validateUserCreate = validateDto(user_dto_1.CreateUserDto);
exports.validateUserUpdate = validateDto(user_dto_1.UpdateUserDto, true);
