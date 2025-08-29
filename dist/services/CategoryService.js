"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const Category_1 = require("../entities/Category");
const Category_mappper_1 = require("../mappers/Category.mappper");
const database_1 = require("../config/database");
class CategoryService {
    constructor() {
        this.categoryRepository = database_1.AppDataSource.getRepository(Category_1.Category);
        this.categoryMapper = new Category_mappper_1.CategoryMapper();
    }
    async getAllCategories() {
        const categories = await this.categoryRepository.find();
        return this.categoryMapper.toResponseDtoList(categories);
    }
    async getCategoryById(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }
        return this.categoryMapper.toResponseDto(category);
    }
    async createCategory(CreateCategoryRequest) {
        const newCategory = this.categoryMapper.toEntity(CreateCategoryRequest);
        const savedCategory = await this.categoryRepository.save(newCategory);
        return this.categoryMapper.toResponseDto(savedCategory);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }
        await this.categoryRepository.remove(category);
    }
}
exports.CategoryService = CategoryService;
