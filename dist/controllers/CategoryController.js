"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
const Category_dto_1 = require("../dtos/Category.dto");
const class_transformer_1 = require("class-transformer");
class CategoryController {
    constructor() {
        /**
         * Obtiene todas las categorías
         */
        this.getAllCategories = async (_req, res, next) => {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json(categories);
        };
        /**
         * Crea una nueva categoría
         */
        this.createCategory = async (req, res, next) => {
            const createCategoryDto = (0, class_transformer_1.plainToInstance)(Category_dto_1.CreateCategoryRequest, req.body);
            const newCategory = await this.categoryService.createCategory(createCategoryDto);
            res.status(201).json(newCategory);
        };
        this.categoryService = new CategoryService_1.CategoryService();
    }
}
exports.CategoryController = CategoryController;
