import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

/**
 * SERVICIO DE CLOUDINARY
 *
 * Este archivo configura la integración con Cloudinary para el almacenamiento de imágenes
 * en la nube. Incluye:
 * 1. Configuración de credenciales Cloudinary
 * 2. Configuración del almacenamiento temporal de archivos con multer
 * 3. Filtros para validar tipos de archivos
 * 4. Función para subir archivos a Cloudinary
 */

// Configurar Cloudinary con credenciales desde variables de entorno o valores por defecto
// Se necesita crear una cuenta en Cloudinary (https://cloudinary.com/) y obtener estas credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dblfwxkw5", // Nombre de la cuenta en Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY || "628898537573714", // Clave API de Cloudinary
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "DlvDMKLJgQT1P1B0nXvPLWM7rNA", // Secreto API de Cloudinary
});

// Crear directorio temporal para almacenar archivos antes de subirlos a Cloudinary
// Los archivos se guardan temporalmente en el servidor antes de subirlos a la nube
const tmpDir = path.join(__dirname, "../../uploads/tmp");
// Crear el directorio temporal si no existe
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

// Configuración de multer para almacenamiento temporal de archivos
// Multer es un middleware que maneja multipart/form-data, usado para subir archivos
const storage = multer.diskStorage({
  // Definir la ubicación donde se guardarán los archivos temporalmente
  destination: (_req, _file, cb) => {
    cb(null, tmpDir);
  },
  // Generar un nombre único para evitar sobreescrituras
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Filtro para permitir solo imágenes
// Valida que el tipo MIME del archivo corresponda a una imagen
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedMimes.includes(file.mimetype)) {
    // Aceptar el archivo si es una imagen permitida
    cb(null, true);
  } else {
    // Rechazar el archivo si no es una imagen permitida
    cb(
      new Error(
        "Formato de archivo no válido. Solo se permiten imágenes (JPEG, PNG, GIF, WEBP)"
      )
    );
  }
};

// Configurar el middleware de multer
// Este middleware se utiliza en los controladores para procesar archivos subidos
export const upload = multer({
  storage: storage, // Usar la configuración de almacenamiento definida arriba
  fileFilter: fileFilter, // Aplicar el filtro de tipo de archivo
  limits: {
    fileSize: 5 * 1024 * 1024, // Limitar tamaño a 5MB
  },
});

/**
 * Función para subir archivo a Cloudinary
 *
 * Esta función toma la ruta de un archivo local (temporal) y lo sube a Cloudinary.
 * Después de la subida exitosa, elimina el archivo temporal para liberar espacio.
 *
 * @param filePath - Ruta del archivo temporal en el servidor
 * @param folder - Carpeta en Cloudinary donde se almacenará el archivo (para organización)
 * @returns URL segura (HTTPS) de la imagen alojada en Cloudinary
 */
export const uploadToCloudinary = async (
  filePath: string,
  folder: string = "inventory"
): Promise<string> => {
  try {
    // Subir el archivo a Cloudinary usando la API de Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder, // Organizar archivos en carpetas
      resource_type: "auto", // Detectar automáticamente el tipo de recurso
    });

    // Eliminar el archivo temporal después de subirlo
    // Esto es importante para no acumular archivos innecesarios en el servidor
    fs.unlinkSync(filePath);

    // Devolver la URL segura (HTTPS) proporcionada por Cloudinary
    // Esta URL se guarda en la base de datos y se usa para mostrar la imagen
    return result.secure_url;
  } catch (error) {
    // Si hay un error durante la subida, asegurarse de eliminar el archivo temporal
    try {
      fs.unlinkSync(filePath);
    } catch (unlinkError) {
      console.error("Error al eliminar archivo temporal:", unlinkError);
    }
    // Relanzar el error original para que pueda ser manejado por el middleware de errores
    throw error;
  }
};
