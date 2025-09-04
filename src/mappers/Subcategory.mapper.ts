import { response } from "express";
import {
  CreateSubcategoryRequest,
  SubcategoryResponse,
  UpdateSubcategoryRequest,
} from "../dtos/Subcategory.dto";
import { Category } from "../entities/Category";
import { Subcategory } from "../entities/Subcategory";
import { BaseMapper } from "./base.mapper";

/**
 * Mapper simple para convertir entre entidad Subcategory y sus DTOs
 */
export class SubcategoryMapper extends BaseMapper<
  Subcategory,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
  SubcategoryResponse
> {
  /**
   * Convierte un DTO de creación a entidad
   */
  toEntity(createDto: CreateSubcategoryRequest): Subcategory {
    const entity = new Subcategory();
    entity.name = createDto.name;
    entity.image = createDto.image || "placeholder-image.jpg"; // Valor por defecto si no hay imagen
    entity.categoryId = createDto.categoryId;

    return entity;
  }

  /**
   * Genera objeto con los cambios a aplicar en una entidad
   */
  toUpdateEntity(
    entity: Subcategory,
    updateDto: UpdateSubcategoryRequest
  ): Partial<Subcategory> {
    const updates: Partial<Subcategory> = {};

    if (updateDto.name !== undefined) {
      updates.name = updateDto.name;
    }

    if (updateDto.image !== undefined) {
      updates.image = updateDto.image;
    }

    if (updateDto.categoryId !== undefined) {
      updates.categoryId = updateDto.categoryId;
    }

    return updates;
  }

  /**
   * Convierte una entidad a DTO de respuesta
   */
  toResponseDto(entity: Subcategory): SubcategoryResponse {
    const response = new SubcategoryResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.image = entity.image;

    response.categoryId = entity.category?.id ?? 0;
    response.categoryName = entity.category?.name ?? "Sin categoria";

    return response;
  }
}
