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

export class CreateProductRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  @IsNumber({}, { message: "El stock debe ser un número" })
  @Min(0, { message: "El stock no puede ser negativo" })
  stock!: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : 0))
  @IsNumber({}, { message: "La cantidad prestada debe ser un número" })
  @Min(0, { message: "La cantidad prestada no puede ser negativa" })
  stockBorrowed: number = 0;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  @IsNumber({}, { message: "El subcategoryId debe ser un número" })
  subcategoryId?: number;
}

export class ProductResponse {
  id!: number;
  name!: string;
  description!: string;
  stock!: number;
  stockBorrowed!: number;
  image!: string;
  status!: string;
  subcategoryId?: number;
  subcategoryName?: string;
}
