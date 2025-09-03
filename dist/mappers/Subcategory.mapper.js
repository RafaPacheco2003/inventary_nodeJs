"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryMapper = void 0;
const Subcategory_dto_1 = require("../dtos/Subcategory.dto");
const Subcategory_1 = require("../entities/Subcategory");
const base_mapper_1 = require("./base.mapper");
/**
 * Mapper simple para convertir entre entidad Subcategory y sus DTOs
 */
class SubcategoryMapper extends base_mapper_1.BaseMapper {
    /**
     * Convierte un DTO de creación a entidad
     */
    toEntity(createDto) {
        const entity = new Subcategory_1.Subcategory();
        entity.name = createDto.name;
        entity.image = createDto.image;
        if (createDto.categoryId) {
            entity.category = { id: createDto.categoryId };
        }
        return entity;
    }
    /**
     * Genera objeto con los cambios a aplicar en una entidad
     */
    toUpdateEntity(entity, updateDto) {
        const updates = {};
        updates.name = updateDto.name;
        updates.image = updateDto.image;
        if (updateDto.categoryId) {
            updates.category = { id: updateDto.categoryId };
        }
        return updates;
    }
    /**
     * Convierte una entidad a DTO de respuesta
     */
    toResponseDto(entity) {
        const response = new Subcategory_dto_1.SubcategoryResponse();
        response.id = entity.id;
        response.name = entity.name;
        response.image = entity.image;
        if (entity.category) {
            response.categoryId = entity.category.id;
            response.categoryName = entity.category.name || "Sin categoria";
        }
        else {
            response.categoryId = 0;
            response.categoryName = "Sin categoria";
        }
        return response;
    }
}
exports.SubcategoryMapper = SubcategoryMapper;
