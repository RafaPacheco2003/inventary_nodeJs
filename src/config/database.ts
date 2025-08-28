import { DataSource } from "typeorm";
import * as path from "path";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "rafaul",
  database: process.env.DB_NAME || "postgres",
  entities: [path.join(__dirname, "../entities/**/*.{js,ts}")],
  synchronize: true, // Esto creará las tablas automáticamente
  logging: true, // Activamos el logging para ver lo que ocurre
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
};
