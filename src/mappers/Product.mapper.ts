import { CreateProductRequest, ProductResponse } from "../dtos/Product.dto";
import { Product } from "../entities/Product";
import { BaseMapper } from "./base.mapper";

export class ProductMapper extends BaseMapper<
  Product,
  CreateProductRequest,
  CreateProductRequest,
  ProductResponse
> {
  toEntity(createDto: CreateProductRequest): Product {
    const entity = new Product();
    entity.name = createDto.name;
    entity.description = createDto.description || "No description"; // Valor por defecto si no hay descripción
    entity.subcategoryId = createDto.subcategoryId;
    entity.image = createDto.image || "placeholder-image.jpg"; // Valor por defecto si no hay imagen
    entity.subcategoryId = createDto.subcategoryId;
    entity.stock = createDto.stock || 0;
    return entity;
  }
  toUpdateEntity(
    entity: Product,
    updateDto: CreateProductRequest
  ): Partial<Product> {
    throw new Error("Method not implemented.");
  }

  toResponseDto(entity: Product): ProductResponse {
    const response = new ProductResponse();
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
