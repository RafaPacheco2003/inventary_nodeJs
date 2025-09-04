"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImageUpload = exports.processImageUploadForUser = exports.processImageUploadForProduct = exports.processImageUploadForSubcategory = exports.processImageUploadForCategory = exports.createImageUploadMiddleware = void 0;
const CloudinaryService_1 = require("../services/CloudinaryService");
/**
 * Crea un middleware para procesar y subir imágenes a una carpeta específica en Cloudinary
 *
 * @param entityType - Tipo de entidad para determinar la carpeta de destino
 * @returns Middleware de Express configurado para esa entidad específica
 */
const createImageUploadMiddleware = (entityType) => {
    return async (req, res, next) => {
        try {
            // Si hay un archivo de imagen adjunto en la solicitud (procesado por multer)
            if (req.file) {
                try {
                    // Determinar la carpeta de destino en Cloudinary basada en el tipo de entidad
                    const cloudinaryFolder = `inventory/${entityType}`;
                    // Subir la imagen a Cloudinary con la carpeta específica para esa entidad
                    const imageUrl = await (0, CloudinaryService_1.uploadToCloudinary)(req.file.path, // Ruta temporal donde multer guardó el archivo
                    cloudinaryFolder // Carpeta en Cloudinary para organizar imágenes
                    );
                    // Añadir la URL de la imagen al cuerpo de la solicitud
                    // Esto hace que esté disponible para el validador de DTO y el controlador
                    req.body.image = imageUrl;
                    // Continuar al siguiente middleware
                    next();
                }
                catch (error) {
                    // Si hay un error al subir la imagen, pasar el error al manejador de errores
                    next(new Error(`Error al subir la imagen: ${error.message || "Error desconocido"}`));
                }
            }
            else {
                // Si no hay imagen adjunta, simplemente continuar con el flujo
                // Esto permite que las solicitudes sin imágenes funcionen normalmente
                next();
            }
        }
        catch (error) {
            // Manejar cualquier otro error inesperado
            next(error);
        }
    };
};
exports.createImageUploadMiddleware = createImageUploadMiddleware;
/**
 * Middlewares preconfigurados para cada tipo de entidad
 * Estos pueden usarse directamente en las rutas
 */
exports.processImageUploadForCategory = (0, exports.createImageUploadMiddleware)("categories");
exports.processImageUploadForSubcategory = (0, exports.createImageUploadMiddleware)("subcategories");
exports.processImageUploadForProduct = (0, exports.createImageUploadMiddleware)("products");
exports.processImageUploadForUser = (0, exports.createImageUploadMiddleware)("users");
/**
 * Middleware compatible con versiones anteriores
 * @deprecated Usar processImageUploadForCategory en su lugar
 */
exports.processImageUpload = exports.processImageUploadForCategory;
