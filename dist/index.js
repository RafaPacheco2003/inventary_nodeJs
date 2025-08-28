"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
require("reflect-metadata");
require("dotenv/config");
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./v1/routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Inicializar base de datos
        await (0, database_1.initializeDatabase)();
        const app = (0, express_1.default)();
        // Middlewares
        app.use((0, body_parser_1.json)());
        app.use((0, body_parser_1.urlencoded)({ extended: true }));
        // Rutas
        app.use("/api/users", userRoutes_1.default);
        // Ruta de salud
        app.get("/health", (req, res) => {
            res
                .status(200)
                .json({ status: "OK", message: "Servidor funcionando correctamente" });
        });
        // Manejo de errores
        app.use(errorHandler_1.errorHandler);
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
};
// Ejecutar el servidor
startServer();
