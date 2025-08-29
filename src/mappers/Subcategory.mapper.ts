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
    entity.image = createDto.image;

    if (createDto.categoryId) {
      entity.category = { id: createDto.categoryId } as Category;
    }

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

    updates.name = updateDto.name;
    updates.image = updateDto.image;

    if (updateDto.categoryId) {
      updates.category = { id: updateDto.categoryId } as Category;
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

    if (entity.category) {
      response.categoryId = entity.category.id;
      response.categoryName = entity.category.name || "Sin categoria";
    } else {
      response.categoryId = 0;
      response.categoryName = "Sin categoria";
    }

    return response;
  }
}
