"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
const Category_dto_1 = require("../dtos/Category.dto");
const class_transformer_1 = require("class-transformer");
class CategoryController {
    constructor() {
        /**
         * @swagger
         * /categories:
         *   get:
         *     summary: Obtiene todas las categorías
         *     description: Retorna una lista de todas las categorías disponibles en el sistema
         *     tags: [Categories]
         *     responses:
         *       200:
         *         description: Lista de categorías obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Category'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.getAllCategories = async (_req, res, next) => {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json(categories);
        };
        /**
         * @swagger
         * /categories:
         *   post:
         *     summary: Crea una nueva categoría
         *     description: Crea una nueva categoría con la información proporcionada
         *     tags: [Categories]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateCategoryRequest'
         *     responses:
         *       201:
         *         description: Categoría creada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Category'
         *       400:
         *         $ref: '#/components/responses/BadRequest'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.createCategory = async (req, res, next) => {
            const createCategoryDto = (0, class_transformer_1.plainToInstance)(Category_dto_1.CreateCategoryRequest, req.body);
            const newCategory = await this.categoryService.createCategory(createCategoryDto);
            res.status(201).json(newCategory);
        };
        /**
         * @swagger
         * /categories/{id}:
         *   get:
         *     summary: Obtiene una categoría por su ID
         *     description: Retorna una categoría específica basada en su ID
         *     tags: [Categories]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la categoría a buscar
         *         example: 1
         *     responses:
         *       200:
         *         description: Categoría encontrada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Category'
         *       404:
         *         $ref: '#/components/responses/NotFound'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.getCategoryById = async (req, res, next) => {
            const categoryId = Number(req.params.id);
            const category = await this.categoryService.getCategoryById(categoryId);
            res.status(200).json(category);
        };
        /**
         * @swagger
         * /categories/{id}:
         *   delete:
         *     summary: Elimina una categoría
         *     description: Elimina una categoría por su ID
         *     tags: [Categories]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la categoría a eliminar
         *         example: 1
         *     responses:
         *       204:
         *         description: Categoría eliminada exitosamente
         *       404:
         *         $ref: '#/components/responses/NotFound'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.deleteCategory = async (req, res, next) => {
            const categoryId = Number(req.params.id);
            await this.categoryService.deleteCategory(categoryId);
            res.status(204).send();
        };
        /**
         * @swagger
         * /categories/{id}:
         *   put:
         *     summary: Actualiza una categoría existente
         *     description: Actualiza los datos de una categoría por su ID
         *     tags: [Categories]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la categoría a actualizar
         *         example: 1
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UpdateCategoryRequest'
         *     responses:
         *       200:
         *         description: Categoría actualizada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Category'
         *       400:
         *         $ref: '#/components/responses/BadRequest'
         *       404:
         *         $ref: '#/components/responses/NotFound'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.updateCategory = async (req, res, next) => {
            const categoryId = Number(req.params.id);
            const updateCategoryDto = (0, class_transformer_1.plainToInstance)(Category_dto_1.UpdateCategoryRequest, req.body);
            const updatedCategory = await this.categoryService.updateCategory(categoryId, updateCategoryDto);
            res.status(200).json(updatedCategory);
        };
        this.categoryService = new CategoryService_1.CategoryService();
    }
}
exports.CategoryController = CategoryController;
