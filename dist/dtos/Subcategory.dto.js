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
exports.SubcategoryResponse = exports.UpdateSubcategoryRequest = exports.CreateSubcategoryRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
/**
 * DTO para crear una nueva subcategoría
 *
 * Contiene los campos necesarios para crear una subcategoría y
 * sus reglas de validación.
 */
class CreateSubcategoryRequest {
}
exports.CreateSubcategoryRequest = CreateSubcategoryRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateSubcategoryRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)() // La imagen es opcional porque puede venir del middleware de carga
    ,
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubcategoryRequest.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)() // La categoría es obligatoria para una subcategoría
    ,
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)) // Convertir string a número
    ,
    (0, class_validator_1.IsNumber)({}, { message: "El categoryId debe ser un número" }),
    __metadata("design:type", Number)
], CreateSubcategoryRequest.prototype, "categoryId", void 0);
/**
 * DTO para actualizar una subcategoría existente
 *
 * Similar a CreateSubcategoryRequest, pero todos los campos son opcionales
 * ya que en una actualización no es necesario proporcionar todos los campos.
 */
class UpdateSubcategoryRequest {
}
exports.UpdateSubcategoryRequest = UpdateSubcategoryRequest;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateSubcategoryRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)() // La imagen es opcional en actualizaciones
    ,
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSubcategoryRequest.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)() // La categoría también es opcional en actualizaciones
    ,
    (0, class_transformer_1.Transform)(({ value }) => (value ? parseInt(value, 10) : undefined)) // Convertir string a número si existe
    ,
    (0, class_validator_1.IsNumber)({}, { message: "El categoryId debe ser un número" }),
    __metadata("design:type", Number)
], UpdateSubcategoryRequest.prototype, "categoryId", void 0);
class SubcategoryResponse {
}
exports.SubcategoryResponse = SubcategoryResponse;
