import { Router } from "express";
import { CategoryController } from "../../controllers/CategoryController";
import { validateDto } from "../../middleware/validation";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../../dtos/Category.dto";

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API para gestionar categorías
 */
const router = Router();
const categoryController = new CategoryController();

router
  .route("/")
  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: Obtiene todas las categorías
   *     tags: [Categories]
   *   post:
   *     summary: Crea una nueva categoría
   *     tags: [Categories]
   */
  .get(categoryController.getAllCategories)
  .post(validateDto(CreateCategoryRequest), categoryController.createCategory);

router
  .route("/:id")
  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Obtiene una categoría por su ID
   *     tags: [Categories]
   *   put:
   *     summary: Actualiza una categoría
   *     tags: [Categories]
   *   delete:
   *     summary: Elimina una categoría
   *     tags: [Categories]
   */
  .get(categoryController.getCategoryById)
  .put(validateDto(UpdateCategoryRequest), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
