"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
/**
 * Configuración de Swagger para la documentación de la API
 * Sigue el principio SOLID de Responsabilidad Única (SRP)
 */
class SwaggerConfig {
    constructor() {
        /**
         * Opciones de configuración para la documentación de Swagger
         */
        this.swaggerOptions = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Inventory Management API",
                    version: "1.0.0",
                    description: "API para la gestión de inventario con categorías y subcategorías",
                    contact: {
                        name: "API Support",
                        email: "support@inventory.com",
                    },
                    license: {
                        name: "MIT",
                        url: "https://opensource.org/licenses/MIT",
                    },
                },
                servers: [
                    {
                        url: "/api/v1",
                        description: "Development server",
                    },
                ],
                components: {
                    schemas: {
                        Category: {
                            type: "object",
                            required: ["name"],
                            properties: {
                                id: {
                                    type: "integer",
                                    description: "ID único de la categoría",
                                    example: 1,
                                },
                                name: {
                                    type: "string",
                                    description: "Nombre de la categoría",
                                    example: "Electrónicos",
                                },
                                image: {
                                    type: "string",
                                    description: "URL de la imagen de la categoría",
                                    example: "https://example.com/images/electronics.jpg",
                                },
                                subcategories: {
                                    type: "array",
                                    description: "Lista de subcategorías pertenecientes a esta categoría",
                                    items: {
                                        $ref: "#/components/schemas/Subcategory",
                                    },
                                },
                            },
                        },
                        Subcategory: {
                            type: "object",
                            required: ["name", "categoryId"],
                            properties: {
                                id: {
                                    type: "integer",
                                    description: "ID único de la subcategoría",
                                    example: 1,
                                },
                                name: {
                                    type: "string",
                                    description: "Nombre de la subcategoría",
                                    example: "Smartphones",
                                },
                                image: {
                                    type: "string",
                                    description: "URL de la imagen de la subcategoría",
                                    example: "https://example.com/images/smartphones.jpg",
                                },
                                categoryId: {
                                    type: "integer",
                                    description: "ID de la categoría a la que pertenece esta subcategoría",
                                    example: 1,
                                },
                            },
                        },
                        CreateCategoryRequest: {
                            type: "object",
                            required: ["name"],
                            properties: {
                                name: {
                                    type: "string",
                                    description: "Nombre de la categoría",
                                    example: "Electrónicos",
                                },
                                image: {
                                    type: "string",
                                    description: "URL de la imagen de la categoría",
                                    example: "https://example.com/images/electronics.jpg",
                                },
                            },
                        },
                        UpdateCategoryRequest: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "Nombre actualizado de la categoría",
                                    example: "Electrónicos y Computación",
                                },
                                image: {
                                    type: "string",
                                    description: "URL actualizada de la imagen de la categoría",
                                    example: "https://example.com/images/electronics-updated.jpg",
                                },
                            },
                        },
                        Error: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "Mensaje de error",
                                    example: "La categoría no existe",
                                },
                                code: {
                                    type: "string",
                                    description: "Código de error",
                                    example: "CATEGORY_NOT_FOUND",
                                },
                                status: {
                                    type: "integer",
                                    description: "Código de estado HTTP",
                                    example: 404,
                                },
                            },
                        },
                    },
                    responses: {
                        BadRequest: {
                            description: "Solicitud incorrecta",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        NotFound: {
                            description: "Recurso no encontrado",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        InternalServerError: {
                            description: "Error interno del servidor",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
                tags: [
                    {
                        name: "Categories",
                        description: "Operaciones relacionadas con las categorías",
                    },
                    {
                        name: "Subcategories",
                        description: "Operaciones relacionadas con las subcategorías",
                    },
                ],
            },
            apis: ["./src/controllers/*.ts", "./src/v1/routes/*.ts"],
        };
    }
    /**
     * Configura Swagger en la aplicación Express
     * @param app Aplicación Express
     */
    setup(app) {
        const swaggerSpec = (0, swagger_jsdoc_1.default)(this.swaggerOptions);
        // Ruta para la interfaz de usuario de Swagger
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
        // Ruta para el JSON de Swagger
        app.get("/api-docs.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(swaggerSpec);
        });
        console.log("📚 Swagger documentation available at /api-docs");
    }
}
exports.SwaggerConfig = SwaggerConfig;
