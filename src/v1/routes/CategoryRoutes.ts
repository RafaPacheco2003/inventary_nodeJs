import { Router } from "express";
import { CategoryController } from "../../controllers/CategoryController";
import { validateDto } from "../../middleware/validation";
import { CreateCategoryRequest } from "../../dtos/Category.dto";

const router = Router();
const categoryController = new CategoryController();

router
  .route("/")
  // Rutas de categorías
  .get(categoryController.getAllCategories)
  .post(validateDto(CreateCategoryRequest), categoryController.createCategory);

export default router;
