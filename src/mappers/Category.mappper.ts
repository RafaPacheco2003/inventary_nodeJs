import { Category } from "../entities/Category";
import { BaseMapper } from "./base.mapper";
import {
  CreateCategoryRequest,
  CategoryResponse,
  UpdateCategoryRequest,
} from "../dtos/Category.dto";

export class CategoryMapper extends BaseMapper<
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryResponse
> {
  toEntity(createDto: CreateCategoryRequest): Category {
    const entity = new Category();
    entity.name = createDto.name;
    entity.image = createDto.image || "placeholder-image.jpg"; // Valor por defecto
    return entity;
  }

  toUpdateEntity(
    entity: Category,
    updateDto: UpdateCategoryRequest
  ): Partial<Category> {
    return {
      name: updateDto.name,
      image: updateDto.image,
    };
  }

  toResponseDto(entity: Category): CategoryResponse {
    const dto = new CategoryResponse();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.image = entity.image;
    return dto;
  }
}
