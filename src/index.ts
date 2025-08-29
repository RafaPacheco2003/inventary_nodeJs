import express from "express";
import "reflect-metadata";
import "dotenv/config";
import { initializeDatabase } from "./config/database";
import userRoutes from "./v1/routes/userRoutes";
import CategoryRoutes from "./v1/routes/CategoryRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { SwaggerConfig } from "./config/swagger";

const PORT = process.env.PORT || 3000;

initializeDatabase();
const app = express();

// Configuración de Swagger
const swaggerConfig = new SwaggerConfig();
swaggerConfig.setup(app);

// Middlewares y configuración básica
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", CategoryRoutes);

app.get("/health", (_, res) =>
  res.status(200).json({
    status: "OK",
    message: "Servidor funcionando correctamente",
  })
);
// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
