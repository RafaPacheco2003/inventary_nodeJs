"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../../controllers/CategoryController");
const validation_1 = require("../../middleware/validation");
const fileUpload_1 = require("../../middleware/fileUpload");
const Category_dto_1 = require("../../dtos/Category.dto");
/**
 * RUTAS PARA CATEGORÍAS (v1)
 *
 * Este archivo define todas las rutas relacionadas con las categorías en la versión 1 de la API.
 * Las rutas siguen un patrón RESTful para las operaciones CRUD:
 * - GET /categories: Obtener todas las categorías
 * - POST /categories: Crear una nueva categoría
 * - GET /categories/:id: Obtener una categoría específica
 * - PUT /categories/:id: Actualizar una categoría existente
 * - DELETE /categories/:id: Eliminar una categoría
 *
 * Incluye también configuración de Swagger para documentación automática de la API.
 */
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
    .get(categoryController.getAllCategories) // Endpoint para obtener todas las categorías
    .post(
// Flujo de middleware para crear una categoría con imagen:
categoryController.uploadImage, // 1. Primero: middleware de multer para recibir el archivo
fileUpload_1.processImageUpload, // 2. Segundo: procesar y subir la imagen a Cloudinary
(0, validation_1.validateDto)(Category_dto_1.CreateCategoryRequest), // 3. Tercero: validar los datos con la URL de imagen ya procesada
categoryController.createCategory // 4. Finalmente: crear la categoría en la base de datos
);
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
    .get(categoryController.getCategoryById) // Endpoint para obtener una categoría por ID
    .put(
// Flujo de middleware para actualizar una categoría con posible nueva imagen:
categoryController.uploadImage, // 1. Primero: middleware de multer para recibir el archivo
fileUpload_1.processImageUpload, // 2. Segundo: procesar y subir la imagen a Cloudinary (si hay)
(0, validation_1.validateDto)(Category_dto_1.UpdateCategoryRequest), // 3. Tercero: validar los datos con la URL de imagen ya procesada
categoryController.updateCategory // 4. Finalmente: actualizar la categoría en la base de datos
)
    .delete(categoryController.deleteCategory); // Endpoint para eliminar una categoría
// Exportar el router para ser usado en la configuración principal de Express
exports.default = router;
