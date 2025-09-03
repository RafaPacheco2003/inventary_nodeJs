"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubCategoryController_1 = require("../../controllers/SubCategoryController");
const validation_1 = require("../../middleware/validation");
const Subcategory_dto_1 = require("../../dtos/Subcategory.dto");
/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: API para gestionar subcategorías
 */
const router = (0, express_1.Router)();
const subcategoryController = new SubCategoryController_1.SubcategoryController();
router
    .route("/")
    /**
     * @swagger
     * /subcategories:
     *   get:
     *     summary: Obtiene todas las subcategorías
     *     tags: [Subcategories]
     *     responses:
     *       200:
     *         description: Lista de subcategorías
     *   post:
     *     summary: Crea una nueva subcategoría
     *     tags: [Subcategories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateSubcategoryRequest'
     *     responses:
     *       201:
     *         description: Subcategoría creada exitosamente
     */
    .get(subcategoryController.getAll)
    .post((0, validation_1.validateDto)(Subcategory_dto_1.CreateSubcategoryRequest), subcategoryController.create);
router
    .route("/:id")
    /**
     * @swagger
     * /subcategories/{id}:
     *   get:
     *     summary: Obtiene una subcategoría por su ID
     *     tags: [Subcategories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la subcategoría
     *     responses:
     *       200:
     *         description: Subcategoría encontrada
     *       404:
     *         description: Subcategoría no encontrada
     *   delete:
     *     summary: Elimina una subcategoría
     *     tags: [Subcategories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la subcategoría a eliminar
     *     responses:
     *       204:
     *         description: Subcategoría eliminada exitosamente
     *       404:
     *         description: Subcategoría no encontrada
     */
    .get(subcategoryController.getById)
    .delete(subcategoryController.delete);
exports.default = router;
