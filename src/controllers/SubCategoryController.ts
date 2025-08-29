import { Request, Response, NextFunction } from "express";
import { SubcategoryService } from "../services/SubcategoryService";

export class SubcategoryController {
  private subcategoryService: SubcategoryService;

  constructor() {
    this.subcategoryService = new SubcategoryService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const subcategories = await this.subcategoryService.getAllSubcategories();
    res.json(subcategories);
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const subcategory = await this.subcategoryService.getSubcategoryById(+id);
    res.json(subcategory);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await this.subcategoryService.createSubcategory(
      req.body
    );
    res.status(201).json(subcategory);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await this.subcategoryService.deleteSubcategory(+id);
    res.status(204).send();
  };
}
