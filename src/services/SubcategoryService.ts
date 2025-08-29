import { Repository } from "typeorm";
import { Subcategory } from "../entities/Subcategory";
import {
  SubcategoryResponse,
  CreateSubcategoryRequest,
  UpdateSubcategoryRequest,
} from "../dtos/Subcategory.dto";
import { AppDataSource } from "../config/database";
import { SubcategoryMapper } from "../mappers/Subcategory.mapper";
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
    const subcategory = this.subcategoryMapper.toEntity(createDto);
    const savedSubcategory = await this.subcategoryRepository.save(subcategory);
    return this.subcategoryMapper.toResponseDto(savedSubcategory);
  }

  async deleteSubcategory(id: number): Promise<void> {
    const subcategory = await this.subcategoryRepository.findOneBy({ id });
    if (!subcategory) throw new Error("Subcategory not found");
    await this.subcategoryRepository.remove(subcategory);
  }
}
