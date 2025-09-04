# Documentación del Sistema de Gestión de Inventario

Este documento describe el funcionamiento del sistema de gestión de inventario, enfocado especialmente en el módulo de categorías con carga de imágenes.

## Estructura de la Aplicación

La aplicación sigue una arquitectura en capas bien definida:

1. **Entidades**: Representan las tablas de la base de datos
2. **DTOs (Data Transfer Objects)**: Definen la estructura de los datos para las solicitudes y respuestas
3. **Mappers**: Transforman entre entidades y DTOs
4. **Controladores**: Manejan las solicitudes HTTP
5. **Servicios**: Implementan la lógica de negocio
6. **Middleware**: Procesan las solicitudes antes de llegar a los controladores
7. **Rutas**: Definen los endpoints de la API

## Flujo de Datos para la Gestión de Categorías

### Creación de una Categoría con Imagen

1. **Solicitud**: El cliente envía una solicitud POST a `/api/v1/categories` con datos en formato `multipart/form-data` (nombre de la categoría y archivo de imagen)

2. **Procesamiento de la Imagen**:

   - El middleware `upload.single('image')` en `CategoryController` recibe y almacena temporalmente la imagen usando Multer
   - El middleware `processImageUpload` toma el archivo temporal, lo sube a Cloudinary, y añade la URL resultante a `req.body.image`

3. **Validación de Datos**:

   - El middleware `validateDto(CreateCategoryRequest)` valida que los datos cumplan con las reglas definidas en el DTO
   - Si los datos son válidos, continúa; si no, devuelve un error 400

4. **Creación de la Categoría**:

   - El controlador `createCategory` recibe la solicitud ya procesada y validada
   - Transforma los datos a un DTO usando `plainToInstance`
   - Llama al servicio `categoryService.createCategory` para crear la categoría

5. **Lógica de Negocio**:

   - El servicio `CategoryService` transforma el DTO a una entidad usando el mapper
   - Guarda la entidad en la base de datos
   - Transforma la entidad guardada a un DTO de respuesta

6. **Respuesta**:
   - El controlador devuelve el DTO de respuesta con código 201 (Created)

### Actualización de una Categoría con Imagen

El proceso es similar al de creación, pero:

1. El cliente envía una solicitud PUT a `/api/v1/categories/:id`
2. Solo se actualizan los campos proporcionados (actualización parcial)
3. Si se incluye una nueva imagen, reemplaza la anterior

### Obtención de Categorías

1. Para todas las categorías: GET a `/api/v1/categories`
2. Para una categoría específica: GET a `/api/v1/categories/:id`

### Eliminación de Categorías

1. El cliente envía una solicitud DELETE a `/api/v1/categories/:id`
2. El controlador llama al servicio para eliminar la categoría
3. Si la operación es exitosa, devuelve código 204 (No Content)

## Integración con Cloudinary

La integración con Cloudinary permite almacenar imágenes en la nube en lugar de en el servidor local:

1. **Configuración**:

   - Las credenciales se almacenan en variables de entorno (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
   - La configuración se realiza en `CloudinaryService.ts`

2. **Flujo de Carga**:

   - Las imágenes se guardan temporalmente en `/uploads/tmp` usando Multer
   - Luego se suben a Cloudinary con la función `uploadToCloudinary`
   - Después de la carga exitosa, se elimina el archivo temporal
   - La URL de Cloudinary se añade a `req.body.image` para su uso posterior

3. **Estructura de Carpetas en Cloudinary**:
   - Las imágenes se organizan en carpetas, como `inventory/categories`

## Validación y Seguridad

1. **Validación de DTOs**:

   - Se utilizan decoradores de `class-validator` para definir reglas de validación
   - El middleware `validateDto` aplica estas reglas antes de que las solicitudes lleguen a los controladores

2. **Validación de Imágenes**:

   - Se permiten solo ciertos formatos de imagen (JPEG, PNG, GIF, WEBP)
   - Se limita el tamaño a 5MB

3. **Prevención de Campos No Autorizados**:
   - `whitelist: true` y `forbidNonWhitelisted: true` garantizan que solo se acepten campos definidos en los DTOs

## Manejo de Errores

1. **Errores de Validación**:

   - Se capturan en el middleware `validateDto` y se formatean para ser legibles
   - Se devuelven como errores 400 (Bad Request)

2. **Errores de Recursos No Encontrados**:

   - Se lanzan cuando no se encuentra una categoría por ID
   - Se manejan en el controlador y se devuelven como errores 404 (Not Found)

3. **Errores de Carga de Imágenes**:
   - Se capturan en el middleware `processImageUpload`
   - Se pasan al siguiente middleware con detalles del error

## Extensibilidad

Este diseño modular permite fácilmente:

1. Añadir nuevos tipos de recursos (productos, proveedores, etc.)
2. Cambiar el proveedor de almacenamiento de imágenes (por ejemplo, de Cloudinary a Amazon S3)
3. Modificar las reglas de validación sin afectar el resto del sistema

## Próximos Pasos Recomendados

1. Implementar autenticación y autorización
2. Añadir paginación para listas grandes de recursos
3. Implementar caché para mejorar el rendimiento
4. Añadir pruebas automatizadas
