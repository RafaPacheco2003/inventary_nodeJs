"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMapper = void 0;
const Product_dto_1 = require("../dtos/Product.dto");
const Product_1 = require("../entities/Product");
const base_mapper_1 = require("./base.mapper");
class ProductMapper extends base_mapper_1.BaseMapper {
    toEntity(createDto) {
        const entity = new Product_1.Product();
        entity.name = createDto.name;
        entity.description = createDto.description || "No description"; // Valor por defecto si no hay descripción
        entity.subcategoryId = createDto.subcategoryId;
        entity.image = createDto.image || "placeholder-image.jpg"; // Valor por defecto si no hay imagen
        entity.subcategoryId = createDto.subcategoryId;
        entity.stock = createDto.stock || 0;
        return entity;
    }
    toUpdateEntity(entity, updateDto) {
        throw new Error("Method not implemented.");
    }
    toResponseDto(entity) {
        const response = new Product_dto_1.ProductResponse();
        response.id = entity.id;
        response.name = entity.name;
        response.description = entity.description;
        response.status = entity.status;
        response.image = entity.image;
        response.subcategoryId = entity.subcategoryId;
        response.stock = entity.stock;
        response.stockBorrowed = entity.stockBorrowed;
        response.subcategoryId = entity.subcategory?.id ?? 0;
        response.subcategoryName = entity.subcategory?.name ?? "Sin subcategoria";
        return response;
    }
}
exports.ProductMapper = ProductMapper;
