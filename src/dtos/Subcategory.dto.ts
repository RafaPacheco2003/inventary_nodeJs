import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";

/**
 * DTO para crear una nueva subcategoría
 * 
 * Contiene los campos necesarios para crear una subcategoría y
 * sus reglas de validación.
 */
export class CreateSubcategoryRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsOptional() // La imagen es opcional porque puede venir del middleware de carga
  @IsString()
  image?: string;

  @IsNotEmpty() // La categoría es obligatoria para una subcategoría
  @Transform(({ value }) => parseInt(value, 10)) // Convertir string a número
  @IsNumber({}, { message: "El categoryId debe ser un número" })
  categoryId!: number;
}

/**
 * DTO para actualizar una subcategoría existente
 * 
 * Similar a CreateSubcategoryRequest, pero todos los campos son opcionales
 * ya que en una actualización no es necesario proporcionar todos los campos.
 */
export class UpdateSubcategoryRequest {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsOptional() // La imagen es opcional en actualizaciones
  @IsString()
  image?: string;

  @IsOptional() // La categoría también es opcional en actualizaciones
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined) // Convertir string a número si existe
  @IsNumber({}, { message: "El categoryId debe ser un número" })
  categoryId?: number;
}

export class SubcategoryResponse {
  id!: number;
  name!: string;
  image!: string;
  categoryId!: number;
  categoryName!: string;
}
