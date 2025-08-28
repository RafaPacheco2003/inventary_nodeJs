import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import "reflect-metadata";
import "dotenv/config";
import { initializeDatabase } from "./config/database";
import userRoutes from "./v1/routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    // Inicializar base de datos
    await initializeDatabase();

    const app = express();

    // Middlewares
    app.use(json());
    app.use(urlencoded({ extended: true }));

    // Rutas
    app.use("/api/users", userRoutes);

    // Ruta de salud
    app.get("/health", (req, res) => {
      res
        .status(200)
        .json({ status: "OK", message: "Servidor funcionando correctamente" });
    });

    // Manejo de errores
    app.use(errorHandler);

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

// Ejecutar el servidor
startServer();
