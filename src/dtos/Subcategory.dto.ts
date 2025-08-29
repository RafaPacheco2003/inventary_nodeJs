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

export class CreateSubcategoryRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export class UpdateSubcategoryRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export class SubcategoryResponse {
  id!: number;
  name!: string;
  image!: string;
  categoryId!: number;
  categoryName!: string;
}
