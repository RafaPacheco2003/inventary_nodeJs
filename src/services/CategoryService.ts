import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../dtos/Category.dto";
import { CategoryMapper } from "../mappers/Category.mappper";
import { AppDataSource } from "../config/database";

export class CategoryService {
  private categoryRepository: Repository<Category>;
  private categoryMapper: CategoryMapper;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
    this.categoryMapper = new CategoryMapper();
  }

  async getAllCategories(): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepository.find();
    return this.categoryMapper.toResponseDtoList(categories);
  }

  async getCategoryById(id: number): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return this.categoryMapper.toResponseDto(category);
  }

  async createCategory(
    CreateCategoryRequest: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    const newCategory = this.categoryMapper.toEntity(CreateCategoryRequest);
    const savedCategory = await this.categoryRepository.save(newCategory);
    return this.categoryMapper.toResponseDto(savedCategory);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    await this.categoryRepository.remove(category);
  }
}
