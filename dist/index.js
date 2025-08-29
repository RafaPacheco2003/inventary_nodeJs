"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("dotenv/config");
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./v1/routes/userRoutes"));
const CategoryRoutes_1 = __importDefault(require("./v1/routes/CategoryRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;
(0, database_1.initializeDatabase)();
const app = (0, express_1.default)();
// Middlewares y configuración básica
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/categories", CategoryRoutes_1.default);
app.get("/health", (_, res) => res.status(200).json({
    status: "OK",
    message: "Servidor funcionando correctamente",
}));
// Manejo de errores
app.use(errorHandler_1.errorHandler);
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
