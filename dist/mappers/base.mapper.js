"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMapper = void 0;
/**
 * Clase base para todos los mappers
 */
class BaseMapper {
    /**
     * Convierte una lista de entidades a una lista de DTOs de respuesta
     */
    toResponseDtoList(entities) {
        return entities.map((entity) => this.toResponseDto(entity));
    }
}
exports.BaseMapper = BaseMapper;
