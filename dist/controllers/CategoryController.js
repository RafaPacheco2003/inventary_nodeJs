"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
const Category_dto_1 = require("../dtos/Category.dto");
const class_transformer_1 = require("class-transformer");
const CloudinaryService_1 = require("../services/CloudinaryService");
/**
 * CONTROLADOR DE CATEGORÍAS
 *
 * Este controlador maneja todas las operaciones relacionadas con las categorías:
 * - Creación de nuevas categorías
 * - Obtención de categorías (todas o por ID)
 * - Actualización de categorías existentes
 * - Eliminación de categorías
 *
 * Incluye manejo especial para la carga de imágenes mediante middleware.
 * Cada método implementa un endpoint de la API definido en CategoryRoutes.ts.
 */
class CategoryController {
    constructor() {
        /**
         * Middleware para procesar la carga de imágenes
         *
         * Este middleware de multer se encarga de recibir y almacenar temporalmente
         * el archivo de imagen que viene en la solicitud. Configura multer para
         * esperar un único archivo en el campo 'image'.
         */
        this.uploadImage = CloudinaryService_1.upload.single("image"); // 'image' es el nombre del campo en el formulario
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
        /**
         * Obtiene todas las categorías
         *
         * Este método recupera todas las categorías de la base de datos
         * y las devuelve como un array en la respuesta.
         *
         * @param _req - Objeto de solicitud (no utilizado en este método)
         * @param res - Objeto de respuesta para enviar el resultado
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.getAllCategories = async (_req, res, next) => {
            try {
                // Obtener todas las categorías del servicio
                const categories = await this.categoryService.getAllCategories();
                // Responder con código 200 (OK) y la lista de categorías
                res.status(200).json(categories);
            }
            catch (error) {
                // Si hay algún error, pasarlo al middleware de manejo de errores
                next(error);
            }
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
        /**
         * Crea una nueva categoría
         *
         * Este método recibe los datos para crear una nueva categoría,
         * la guarda en la base de datos y devuelve la categoría creada.
         * La URL de la imagen ya está incluida en req.body gracias al middleware processImageUpload.
         *
         * @param req - Objeto de solicitud con los datos de la categoría a crear
         * @param res - Objeto de respuesta para enviar la categoría creada
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.createCategory = async (req, res, next) => {
            // Transformar los datos de la solicitud al formato DTO
            const createCategoryDto = (0, class_transformer_1.plainToInstance)(Category_dto_1.CreateCategoryRequest, req.body);
            // Ya no necesitamos pasar el archivo, la imagen ya fue procesada por el middleware fileUpload
            // que la subió a Cloudinary y agregó la URL a req.body.image
            const newCategory = await this.categoryService.createCategory(createCategoryDto);
            // Responder con código 201 (Created) y la categoría creada
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
        /**
         * Obtiene una categoría por su ID
         *
         * Este método recupera una categoría específica basada en su ID
         * y la devuelve en la respuesta.
         *
         * @param req - Objeto de solicitud con el ID de la categoría en req.params.id
         * @param res - Objeto de respuesta para enviar la categoría
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.getCategoryById = async (req, res, next) => {
            try {
                // Extraer el ID de la categoría de los parámetros de la ruta y convertirlo a número
                const categoryId = Number(req.params.id);
                // Obtener la categoría del servicio
                const category = await this.categoryService.getCategoryById(categoryId);
                // Responder con código 200 (OK) y los datos de la categoría
                res.status(200).json(category);
            }
            catch (error) {
                // Si hay algún error (como categoría no encontrada), pasarlo al middleware de errores
                next(error);
            }
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
        /**
         * Elimina una categoría
         *
         * Este método elimina una categoría específica basada en su ID.
         * Si la operación es exitosa, responde con un código 204 (No Content).
         *
         * @param req - Objeto de solicitud con el ID de la categoría en req.params.id
         * @param res - Objeto de respuesta para indicar éxito
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.deleteCategory = async (req, res, next) => {
            try {
                // Extraer el ID de la categoría de los parámetros de la ruta y convertirlo a número
                const categoryId = Number(req.params.id);
                // Eliminar la categoría a través del servicio
                await this.categoryService.deleteCategory(categoryId);
                // Responder con código 204 (No Content) para indicar eliminación exitosa sin contenido
                res.status(204).send();
            }
            catch (error) {
                // Si hay algún error (como categoría no encontrada), pasarlo al middleware de errores
                next(error);
            }
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
        /**
         * Actualiza una categoría existente
         *
         * Este método actualiza una categoría específica basada en su ID
         * con los datos proporcionados en la solicitud.
         * Si se incluye una nueva imagen, esta ya habrá sido procesada por el middleware.
         *
         * @param req - Objeto de solicitud con ID en req.params.id y datos de actualización en req.body
         * @param res - Objeto de respuesta para enviar la categoría actualizada
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.updateCategory = async (req, res, next) => {
            try {
                // Extraer el ID de la categoría de los parámetros de la ruta
                const categoryId = Number(req.params.id);
                // Transformar los datos de la solicitud al formato DTO
                const updateCategoryDto = (0, class_transformer_1.plainToInstance)(Category_dto_1.UpdateCategoryRequest, req.body);
                // Ya no necesitamos pasar el archivo, la imagen ya fue procesada por el middleware
                // Si se incluyó una nueva imagen, su URL ya estará en updateCategoryDto.image
                const updatedCategory = await this.categoryService.updateCategory(categoryId, updateCategoryDto);
                // Responder con código 200 (OK) y la categoría actualizada
                res.status(200).json(updatedCategory);
            }
            catch (error) {
                // Si hay algún error, pasarlo al middleware de manejo de errores
                next(error);
            }
        };
        this.categoryService = new CategoryService_1.CategoryService();
    }
}
exports.CategoryController = CategoryController;
