"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMapper = void 0;
const Category_1 = require("../entities/Category");
const base_mapper_1 = require("./base.mapper");
const Category_dto_1 = require("../dtos/Category.dto");
class CategoryMapper extends base_mapper_1.BaseMapper {
    toEntity(createDto) {
        const entity = new Category_1.Category();
        entity.name = createDto.name;
        entity.image = createDto.image || "placeholder-image.jpg"; // Valor por defecto
        return entity;
    }
    toUpdateEntity(entity, updateDto) {
        return {
            name: updateDto.name,
            image: updateDto.image,
        };
    }
    toResponseDto(entity) {
        const dto = new Category_dto_1.CategoryResponse();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.image = entity.image;
        return dto;
    }
}
exports.CategoryMapper = CategoryMapper;
