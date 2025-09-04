import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../services/CloudinaryService";

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
 *
 * La organización de imágenes en Cloudinary sigue esta estructura:
 * - inventory/categories/: Imágenes de categorías
 * - inventory/subcategories/: Imágenes de subcategorías
 * - inventory/products/: Imágenes de productos
 * - inventory/users/: Imágenes de usuarios
 */

/**
 * Tipos de entidad para organizar las imágenes en carpetas separadas
 */
export type EntityType = "categories" | "subcategories" | "products" | "users";

/**
 * Crea un middleware para procesar y subir imágenes a una carpeta específica en Cloudinary
 *
 * @param entityType - Tipo de entidad para determinar la carpeta de destino
 * @returns Middleware de Express configurado para esa entidad específica
 */
export const createImageUploadMiddleware = (entityType: EntityType) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Si hay un archivo de imagen adjunto en la solicitud (procesado por multer)
      if (req.file) {
        try {
          // Determinar la carpeta de destino en Cloudinary basada en el tipo de entidad
          const cloudinaryFolder = `inventory/${entityType}`;

          // Subir la imagen a Cloudinary con la carpeta específica para esa entidad
          const imageUrl = await uploadToCloudinary(
            req.file.path, // Ruta temporal donde multer guardó el archivo
            cloudinaryFolder // Carpeta en Cloudinary para organizar imágenes
          );

          // Añadir la URL de la imagen al cuerpo de la solicitud
          // Esto hace que esté disponible para el validador de DTO y el controlador
          req.body.image = imageUrl;

          // Continuar al siguiente middleware
          next();
        } catch (error: any) {
          // Si hay un error al subir la imagen, pasar el error al manejador de errores
          next(
            new Error(
              `Error al subir la imagen: ${
                error.message || "Error desconocido"
              }`
            )
          );
        }
      } else {
        // Si no hay imagen adjunta, simplemente continuar con el flujo
        // Esto permite que las solicitudes sin imágenes funcionen normalmente
        next();
      }
    } catch (error) {
      // Manejar cualquier otro error inesperado
      next(error);
    }
  };
};

/**
 * Middlewares preconfigurados para cada tipo de entidad
 * Estos pueden usarse directamente en las rutas
 */
export const processImageUploadForCategory =
  createImageUploadMiddleware("categories");
export const processImageUploadForSubcategory =
  createImageUploadMiddleware("subcategories");
export const processImageUploadForProduct =
  createImageUploadMiddleware("products");
export const processImageUploadForUser = createImageUploadMiddleware("users");

/**
 * Middleware compatible con versiones anteriores
 * @deprecated Usar processImageUploadForCategory en su lugar
 */
export const processImageUpload = processImageUploadForCategory;
