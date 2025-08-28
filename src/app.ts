import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import "reflect-metadata";
import { initializeDatabase } from "./config/database";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = async (): Promise<Application> => {
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

  return app;
};
