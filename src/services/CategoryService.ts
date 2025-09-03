import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../dtos/Category.dto";
import { CategoryMapper } from "../mappers/Category.mappper";
import { AppDataSource } from "../config/database";

/**
 * SERVICIO DE CATEGORÍAS
 *
 * Esta clase encapsula toda la lógica de negocio relacionada con las categorías.
 * Actúa como una capa intermedia entre el controlador y el repositorio de datos.
 *
 * Responsabilidades:
 * - Interactuar con la base de datos a través del repositorio
 * - Transformar entidades a DTOs y viceversa usando mappers
 * - Implementar reglas de negocio específicas
 * - Manejar errores de nivel de dominio
 */
export class CategoryService {
  private categoryRepository: Repository<Category>;
  private categoryMapper: CategoryMapper;

  /**
   * Constructor del servicio de categorías
   *
   * Inicializa el repositorio y el mapper necesarios para las operaciones
   */
  constructor() {
    // Obtener el repositorio para la entidad Category desde la conexión a la base de datos
    this.categoryRepository = AppDataSource.getRepository(Category);
    // Inicializar el mapper para transformar entre entidades y DTOs
    this.categoryMapper = new CategoryMapper();
  }

  /**
   * Obtiene todas las categorías
   *
   * @returns Una promesa que resuelve a un array de objetos CategoryResponse
   */
  async getAllCategories(): Promise<CategoryResponse[]> {
    // Obtener todas las categorías de la base de datos
    const categories = await this.categoryRepository.find();
    // Convertir las entidades a DTOs de respuesta usando el mapper
    return this.categoryMapper.toResponseDtoList(categories);
  }

  /**
   * Obtiene una categoría específica por su ID
   *
   * @param id - El ID de la categoría a buscar
   * @returns Una promesa que resuelve a un objeto CategoryResponse
   * @throws Error si la categoría no existe
   */
  async getCategoryById(id: number): Promise<CategoryResponse> {
    // Buscar la categoría por su ID
    const category = await this.categoryRepository.findOneBy({ id });
    // Si no se encuentra, lanzar un error
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    // Convertir la entidad a DTO de respuesta
    return this.categoryMapper.toResponseDto(category);
  }

  /**
   * Crea una nueva categoría
   *
   * @param createCategoryRequest - Los datos para crear la categoría
   * @returns Una promesa que resuelve a un objeto CategoryResponse con la categoría creada
   */
  async createCategory(
    createCategoryRequest: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    // La imagen ya debería estar procesada por el middleware fileUpload
    // y su URL estar disponible en createCategoryRequest.image

    // Convertir el DTO a una entidad usando el mapper
    const newCategory = this.categoryMapper.toEntity(createCategoryRequest);
    // Guardar la nueva categoría en la base de datos
    const savedCategory = await this.categoryRepository.save(newCategory);
    // Convertir la entidad guardada a DTO de respuesta
    return this.categoryMapper.toResponseDto(savedCategory);
  }

  /**
   * Elimina una categoría
   *
   * @param id - El ID de la categoría a eliminar
   * @throws Error si la categoría no existe
   */
  async deleteCategory(id: number): Promise<void> {
    // Buscar la categoría por ID
    const category = await this.categoryRepository.findOneBy({ id });
    // Si no se encuentra, lanzar un error
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    // Eliminar la categoría de la base de datos
    await this.categoryRepository.remove(category);
    // No se devuelve nada (void) para operaciones de eliminación
  }

  /**
   * Actualiza una categoría existente
   *
   * @param id - El ID de la categoría a actualizar
   * @param updateCategoryRequest - Los datos para actualizar la categoría
   * @returns Una promesa que resuelve a un objeto CategoryResponse con la categoría actualizada
   * @throws Error si la categoría no existe
   */
  async updateCategory(
    id: number,
    updateCategoryRequest: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    // Buscar la categoría por ID
    const category = await this.categoryRepository.findOneBy({ id });
    // Si no se encuentra, lanzar un error
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    // La imagen ya debería estar procesada por el middleware fileUpload
    // y su URL estar disponible en updateCategoryRequest.image si se subió una nueva

    // Actualizar solo los campos que vienen en la solicitud (actualización parcial)
    // Esto permite actualizaciones donde solo se cambian algunos campos
    if (updateCategoryRequest.name !== undefined) {
      category.name = updateCategoryRequest.name;
    }
    if (updateCategoryRequest.image !== undefined) {
      category.image = updateCategoryRequest.image;
    }

    // Guardar la categoría actualizada
    const updatedCategory = await this.categoryRepository.save(category);
    // Convertir la entidad actualizada a DTO de respuesta
    return this.categoryMapper.toResponseDto(updatedCategory);
  }
}
