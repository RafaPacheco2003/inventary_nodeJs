import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../dtos/Category.dto";
import { plainToInstance } from "class-transformer";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  /**
   * Obtiene todas las categorías
   */
  getAllCategories = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const categories = await this.categoryService.getAllCategories();
    res.status(200).json(categories);
  };

  /**
   * Crea una nueva categoría
   */
  createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const createCategoryDto = plainToInstance(CreateCategoryRequest, req.body);
    const newCategory = await this.categoryService.createCategory(
      createCategoryDto
    );
    res.status(201).json(newCategory);
  };
}
