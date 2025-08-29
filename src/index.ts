import express from "express";
import "reflect-metadata";
import "dotenv/config";
import { initializeDatabase } from "./config/database";
import userRoutes from "./v1/routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

const PORT = process.env.PORT || 3000;

initializeDatabase();
const app = express();

// Middlewares y configuración básica
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/v1", userRoutes);
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
