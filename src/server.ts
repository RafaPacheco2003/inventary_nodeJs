import "dotenv/config";
import { createApp } from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    const app = await createApp();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
