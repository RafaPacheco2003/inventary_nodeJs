"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImageUpload = void 0;
const CloudinaryService_1 = require("../services/CloudinaryService");
/**
 * MIDDLEWARE DE PROCESAMIENTO DE IMÁGENES
 *
 * Este middleware se encarga de procesar las imágenes subidas antes de que
 * lleguen a la validación de DTOs y a los controladores. Es una parte crucial
 * del flujo de trabajo para manejar archivos en nuestra API.
 *
 * Flujo de trabajo para subir imágenes:
 * 1. Multer (definido en CloudinaryService.ts) recibe el archivo y lo guarda temporalmente
 * 2. Este middleware toma el archivo guardado y lo sube a Cloudinary
 * 3. Se añade la URL de la imagen al body de la solicitud para que esté disponible para los próximos middlewares
 * 4. La validación de DTO puede ocurrir después, ya con la URL de la imagen presente
 */
/**
 * Middleware para procesar la imagen antes de la validación del DTO
 *
 * Este middleware intercepta la solicitud después de que multer ha procesado el archivo,
 * sube la imagen a Cloudinary y añade la URL resultante al body de la solicitud.
 *
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 * @param next - Función para continuar al siguiente middleware
 */
const processImageUpload = async (req, res, next) => {
    try {
        // Si hay un archivo de imagen adjunto en la solicitud (procesado por multer)
        if (req.file) {
            try {
                // Subir la imagen a Cloudinary, especificando la carpeta para categorías
                const imageUrl = await (0, CloudinaryService_1.uploadToCloudinary)(req.file.path, // Ruta temporal donde multer guardó el archivo
                "inventory/categories" // Carpeta en Cloudinary para organizar imágenes
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
exports.processImageUpload = processImageUpload;
