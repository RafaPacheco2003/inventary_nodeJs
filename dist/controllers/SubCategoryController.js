"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryController = void 0;
const SubcategoryService_1 = require("../services/SubcategoryService");
const CloudinaryService_1 = require("../services/CloudinaryService");
const class_transformer_1 = require("class-transformer");
const Subcategory_dto_1 = require("../dtos/Subcategory.dto");
/**
 * CONTROLADOR DE SUBCATEGORÍAS
 *
 * Este controlador maneja todas las operaciones relacionadas con subcategorías:
 * - Creación de nuevas subcategorías
 * - Obtención de subcategorías (todas o por ID)
 * - Actualización de subcategorías existentes
 * - Eliminación de subcategorías
 *
 * Incluye soporte para carga de imágenes similar al controlador de categorías.
 */
class SubcategoryController {
    constructor() {
        /**
         * Middleware para procesar la carga de imágenes
         *
         * Este middleware de multer se encarga de recibir y almacenar temporalmente
         * el archivo de imagen que viene en la solicitud.
         */
        this.uploadImage = CloudinaryService_1.upload.single("image"); // 'image' es el nombre del campo en el formulario
        /**
         * Obtiene todas las subcategorías
         *
         * Este método recupera todas las subcategorías de la base de datos
         * y las devuelve como un array en la respuesta.
         *
         * @param req - Objeto de solicitud
         * @param res - Objeto de respuesta para enviar el resultado
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.getAll = async (req, res, next) => {
            try {
                const subcategories = await this.subcategoryService.getAllSubcategories();
                res.status(200).json(subcategories);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Obtiene una subcategoría por su ID
         *
         * Este método recupera una subcategoría específica basada en su ID
         * y la devuelve en la respuesta.
         *
         * @param req - Objeto de solicitud con el ID de la subcategoría en req.params.id
         * @param res - Objeto de respuesta para enviar la subcategoría
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.getById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const subcategory = await this.subcategoryService.getSubcategoryById(+id);
                res.status(200).json(subcategory);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Crea una nueva subcategoría
         *
         * Este método recibe los datos para crear una nueva subcategoría,
         * la guarda en la base de datos y devuelve la subcategoría creada.
         * La URL de la imagen ya está incluida en req.body gracias al middleware processImageUpload.
         *
         * @param req - Objeto de solicitud con los datos de la subcategoría a crear
         * @param res - Objeto de respuesta para enviar la subcategoría creada
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.create = async (req, res, next) => {
            try {
                // Transformar los datos de la solicitud al formato DTO
                const createSubcategoryDto = (0, class_transformer_1.plainToInstance)(Subcategory_dto_1.CreateSubcategoryRequest, req.body);
                // La imagen ya fue procesada por el middleware fileUpload
                const subcategory = await this.subcategoryService.createSubcategory(createSubcategoryDto);
                res.status(201).json(subcategory);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Actualiza una subcategoría existente
         *
         * Este método actualiza una subcategoría específica basada en su ID
         * con los datos proporcionados en la solicitud.
         * Si se incluye una nueva imagen, esta ya habrá sido procesada por el middleware.
         *
         * @param req - Objeto de solicitud con ID y datos de actualización
         * @param res - Objeto de respuesta para enviar la subcategoría actualizada
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.update = async (req, res, next) => {
            try {
                const { id } = req.params;
                // Transformar los datos de la solicitud al formato DTO
                const updateSubcategoryDto = (0, class_transformer_1.plainToInstance)(Subcategory_dto_1.UpdateSubcategoryRequest, req.body);
                // La imagen ya fue procesada por el middleware fileUpload
                const subcategory = await this.subcategoryService.updateSubcategory(+id, updateSubcategoryDto);
                res.status(200).json(subcategory);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Elimina una subcategoría
         *
         * Este método elimina una subcategoría específica basada en su ID.
         * Si la operación es exitosa, responde con un código 204 (No Content).
         *
         * @param req - Objeto de solicitud con el ID de la subcategoría en req.params.id
         * @param res - Objeto de respuesta para indicar éxito
         * @param next - Función para pasar al siguiente middleware en caso de error
         */
        this.delete = async (req, res, next) => {
            try {
                const { id } = req.params;
                await this.subcategoryService.deleteSubcategory(+id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.subcategoryService = new SubcategoryService_1.SubcategoryService();
    }
}
exports.SubcategoryController = SubcategoryController;
