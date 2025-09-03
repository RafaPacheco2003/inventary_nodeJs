import {
  MinLength,
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

/**
 * DATA TRANSFER OBJECTS (DTOs) PARA CATEGORÍAS
 *
 * Los DTOs definen la estructura de los datos que se intercambian entre
 * la API y los clientes. Incluyen reglas de validación para garantizar
 * que los datos cumplan con los requisitos de la aplicación.
 *
 * Hay tres tipos principales de DTOs:
 * 1. CreateCategoryRequest: Para crear nuevas categorías
 * 2. UpdateCategoryRequest: Para actualizar categorías existentes
 * 3. CategoryResponse: Para devolver datos de categoría a los clientes
 *
 * Todos estos DTOs utilizan los decoradores de class-validator para definir
 * reglas de validación, lo que simplifica el proceso de validación de datos.
 */

/**
 * DTO para crear una nueva categoría
 *
 * Contiene los campos necesarios para crear una categoría y
 * sus reglas de validación.
 */
export class CreateCategoryRequest {
  @IsString() // Debe ser una cadena de texto
  @IsNotEmpty() // No puede estar vacío
  @MinLength(2) // Mínimo 2 caracteres
  @MaxLength(50) // Máximo 50 caracteres
  name!: string; // Nombre de la categoría (requerido)

  @IsOptional() // Este campo es opcional (puede no estar presente)
  @IsString() // Si está presente, debe ser una cadena de texto
  image?: string; // URL de la imagen (opcional, será manejada por el middleware)
}

/**
 * DTO para actualizar una categoría existente
 *
 * Similar a CreateCategoryRequest, pero todos los campos son opcionales
 * ya que en una actualización no es necesario proporcionar todos los campos.
 */
export class UpdateCategoryRequest {
  @IsString() // Debe ser una cadena de texto
  @MinLength(2) // Mínimo 2 caracteres
  @MaxLength(50) // Máximo 50 caracteres
  @IsOptional() // Este campo es opcional
  name?: string; // Nombre de la categoría (opcional)

  @IsString() // Debe ser una cadena de texto
  @IsOptional() // Este campo es opcional
  image?: string; // URL de la imagen (opcional)
}

/**
 * DTO para la respuesta de categoría
 *
 * Define la estructura de los datos que se envían al cliente
 * después de recuperar una categoría de la base de datos.
 */
export class CategoryResponse {
  id!: number; // ID único de la categoría
  name!: string; // Nombre de la categoría
  image!: string; // URL de la imagen de la categoría
}
