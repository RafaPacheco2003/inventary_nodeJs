import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
  @MaxLength(50, { message: "El nombre no puede tener más de 50 caracteres" })
  name!: string;

  @IsNotEmpty({ message: "El email es obligatorio" })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  email!: string;

  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password!: string;

  @IsOptional()
  @IsString({ message: "La dirección debe ser una cadena de texto" })
  @MaxLength(255, {
    message: "La dirección no puede tener más de 255 caracteres",
  })
  address?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
  @MaxLength(50, { message: "El nombre no puede tener más de 50 caracteres" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password?: string;

  @IsOptional()
  @IsString({ message: "La dirección debe ser una cadena de texto" })
  @MaxLength(255, {
    message: "La dirección no puede tener más de 255 caracteres",
  })
  address?: string;
}

export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  address?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
