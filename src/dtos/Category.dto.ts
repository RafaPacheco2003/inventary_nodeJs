import { MinLength, MaxLength, IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;
}

export class UpdateCategoryRequest {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsString()
  image?: string;
}

export class CategoryResponse {
  id!: number;
  name!: string;
  image!: string;
}
