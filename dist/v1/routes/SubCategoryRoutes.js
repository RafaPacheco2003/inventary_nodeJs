"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubCategoryController_1 = require("../../controllers/SubCategoryController");
const validation_1 = require("../../middleware/validation");
const fileUpload_1 = require("../../middleware/fileUpload");
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
    .post(
// Flujo de middleware para crear una subcategoría con imagen:
subcategoryController.uploadImage, // 1. Primero: middleware de multer para recibir el archivo
fileUpload_1.processImageUploadForSubcategory, // 2. Segundo: procesar y subir la imagen a Cloudinary en la carpeta de subcategorías
(0, validation_1.validateDto)(Subcategory_dto_1.CreateSubcategoryRequest), // 3. Tercero: validar los datos con la URL de imagen ya procesada
subcategoryController.create // 4. Finalmente: crear la subcategoría en la base de datos
);
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
    .put(
// Flujo de middleware para actualizar una subcategoría con posible nueva imagen:
subcategoryController.uploadImage, // 1. Primero: middleware de multer para recibir el archivo
fileUpload_1.processImageUploadForSubcategory, // 2. Segundo: procesar y subir la imagen a Cloudinary en la carpeta de subcategorías
(0, validation_1.validateDto)(Subcategory_dto_1.UpdateSubcategoryRequest, true), // 3. Tercero: validar los datos (con skipMissingProperties=true para actualizaciones parciales)
subcategoryController.update // 4. Finalmente: actualizar la subcategoría en la base de datos
)
    .delete(subcategoryController.delete);
exports.default = router;
