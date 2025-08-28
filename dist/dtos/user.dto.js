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
exports.UserResponseDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El nombre es obligatorio" }),
    (0, class_validator_1.IsString)({ message: "El nombre debe ser una cadena de texto" }),
    (0, class_validator_1.MinLength)(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    (0, class_validator_1.MaxLength)(50, { message: "El nombre no puede tener más de 50 caracteres" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El email es obligatorio" }),
    (0, class_validator_1.IsEmail)({}, { message: "El email debe tener un formato válido" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "La contraseña es obligatoria" }),
    (0, class_validator_1.MinLength)(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La dirección debe ser una cadena de texto" }),
    (0, class_validator_1.MaxLength)(255, {
        message: "La dirección no puede tener más de 255 caracteres",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "El nombre debe ser una cadena de texto" }),
    (0, class_validator_1.MinLength)(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    (0, class_validator_1.MaxLength)(50, { message: "El nombre no puede tener más de 50 caracteres" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: "El email debe tener un formato válido" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La dirección debe ser una cadena de texto" }),
    (0, class_validator_1.MaxLength)(255, {
        message: "La dirección no puede tener más de 255 caracteres",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
class UserResponseDto {
}
exports.UserResponseDto = UserResponseDto;
