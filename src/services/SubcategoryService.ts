import { Repository } from "typeorm";
import { Subcategory } from "../entities/Subcategory";
import {
  SubcategoryResponse,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../dtos/Subcategory.dto";
import { AppDataSource } from "../config/database";
import { SubcategoryMapper } from "../mappers/Subcategory.mapper";
import { plainToInstance } from "class-transformer";
export class SubcategoryService {
  private subcategoryRepository: Repository<Subcategory>;
  private subcategoryMapper: SubcategoryMapper;

  constructor() {
    this.subcategoryRepository = AppDataSource.getRepository(Subcategory);
    this.subcategoryMapper = new SubcategoryMapper();
  }

  async getAllSubcategories(): Promise<SubcategoryResponse[]> {
    const subcategories = await this.subcategoryRepository.find({
      relations: ["category"],
    });
    return subcategories.map((subcategory) =>
      this.subcategoryMapper.toResponseDto(subcategory)
    );
  }

  async getSubcategoryById(id: number): Promise<SubcategoryResponse> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!subcategory) throw new Error("Subcategory not found");
    return this.subcategoryMapper.toResponseDto(subcategory);
  }

  async createSubcategory(
    createDto: CreateSubcategoryRequest
  ): Promise<SubcategoryResponse> {
    const createSubcategoryDto = plainToInstance(
      CreateSubcategoryRequest,
      createDto
    );
    const savedSubcategory = await this.subcategoryRepository.save(
      createSubcategoryDto
    );
    return this.subcategoryMapper.toResponseDto(savedSubcategory);
  }

  async deleteSubcategory(id: number): Promise<void> {
    const subcategory = await this.subcategoryRepository.findOneBy({ id });
    if (!subcategory) throw new Error("Subcategory not found");
    await this.subcategoryRepository.remove(subcategory);
  }
  
  /**
   * Actualiza una subcategoría existente
   * 
   * @param id - El ID de la subcategoría a actualizar
   * @param updateDto - Los datos para actualizar la subcategoría
   * @returns Una promesa que resuelve a un objeto SubcategoryResponse con la subcategoría actualizada
   * @throws Error si la subcategoría no existe
   */
  async updateSubcategory(
    id: number,
    updateDto: UpdateSubcategoryRequest
  ): Promise<SubcategoryResponse> {
    // Buscar la subcategoría por ID
    const subcategory = await this.subcategoryRepository.findOneBy({ id });
    if (!subcategory) throw new Error("Subcategory not found");
    
    // Actualizar solo los campos que vienen en la solicitud
    if (updateDto.name !== undefined) {
      subcategory.name = updateDto.name;
    }
    if (updateDto.image !== undefined) {
      subcategory.image = updateDto.image;
    }
    if (updateDto.categoryId !== undefined) {
      subcategory.categoryId = updateDto.categoryId;
    }
    
    // Guardar la subcategoría actualizada
    const updatedSubcategory = await this.subcategoryRepository.save(subcategory);
    
    // Buscar la subcategoría actualizada con relaciones para incluir el nombre de la categoría
    const subcategoryWithRelations = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    
    if (!subcategoryWithRelations) throw new Error("Subcategory not found after update");
    
    // Convertir la entidad actualizada a DTO de respuesta
    return this.subcategoryMapper.toResponseDto(subcategoryWithRelations);
  }
}
