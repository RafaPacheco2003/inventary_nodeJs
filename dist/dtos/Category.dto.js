"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResponse = exports.UpdateCategoryRequest = exports.CreateCategoryRequest = void 0;
const class_validator_1 = require("class-validator");
/**
 * DATA TRANSFER OBJECTS (DTOs) PARA CATEGORÍAS
 *
 * Los DTOs definen la estructura de los datos que se intercambian entre
 * la API y los clientes. Incluyen reglas de validación para garantizar
 * que los datos cumplan con los requisitos de la aplicación.
 *
 * Hay tres tipos principales de DTOs:
 * 1. CreateCategoryRequest: Para crear nuevas categorías
 * 2. UpdateCategoryRequest: Para actualizar categorías existentes
 * 3. CategoryResponse: Para devolver datos de categoría a los clientes
 *
 * Todos estos DTOs utilizan los decoradores de class-validator para definir
 * reglas de validación, lo que simplifica el proceso de validación de datos.
 */
/**
 * DTO para crear una nueva categoría
 *
 * Contiene los campos necesarios para crear una categoría y
 * sus reglas de validación.
 */
class CreateCategoryRequest {
}
exports.CreateCategoryRequest = CreateCategoryRequest;
__decorate([
    (0, class_validator_1.IsString)() // Debe ser una cadena de texto
    ,
    (0, class_validator_1.IsNotEmpty)() // No puede estar vacío
    ,
    (0, class_validator_1.MinLength)(2) // Mínimo 2 caracteres
    ,
    (0, class_validator_1.MaxLength)(50) // Máximo 50 caracteres
    ,
    __metadata("design:type", String)
], CreateCategoryRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)() // Este campo es opcional (puede no estar presente)
    ,
    (0, class_validator_1.IsString)() // Si está presente, debe ser una cadena de texto
    ,
    __metadata("design:type", String)
], CreateCategoryRequest.prototype, "image", void 0);
/**
 * DTO para actualizar una categoría existente
 *
 * Similar a CreateCategoryRequest, pero todos los campos son opcionales
 * ya que en una actualización no es necesario proporcionar todos los campos.
 */
class UpdateCategoryRequest {
}
exports.UpdateCategoryRequest = UpdateCategoryRequest;
__decorate([
    (0, class_validator_1.IsString)() // Debe ser una cadena de texto
    ,
    (0, class_validator_1.MinLength)(2) // Mínimo 2 caracteres
    ,
    (0, class_validator_1.MaxLength)(50) // Máximo 50 caracteres
    ,
    (0, class_validator_1.IsOptional)() // Este campo es opcional
    ,
    __metadata("design:type", String)
], UpdateCategoryRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)() // Debe ser una cadena de texto
    ,
    (0, class_validator_1.IsOptional)() // Este campo es opcional
    ,
    __metadata("design:type", String)
], UpdateCategoryRequest.prototype, "image", void 0);
/**
 * DTO para la respuesta de categoría
 *
 * Define la estructura de los datos que se envían al cliente
 * después de recuperar una categoría de la base de datos.
 */
class CategoryResponse {
}
exports.CategoryResponse = CategoryResponse;
