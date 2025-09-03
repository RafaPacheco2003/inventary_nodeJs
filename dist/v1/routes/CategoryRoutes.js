"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../../controllers/CategoryController");
const validation_1 = require("../../middleware/validation");
const Category_dto_1 = require("../../dtos/Category.dto");
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API para gestionar categorías
 */
const router = (0, express_1.Router)();
const categoryController = new CategoryController_1.CategoryController();
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
    .post((0, validation_1.validateDto)(Category_dto_1.CreateCategoryRequest), categoryController.createCategory);
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
    .put((0, validation_1.validateDto)(Category_dto_1.UpdateCategoryRequest), categoryController.updateCategory)
    .delete(categoryController.deleteCategory);
exports.default = router;
