"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Subcategory_1 = require("../entities/Subcategory");
/**
 * Este script actualiza todas las subcategorías existentes que tienen categoryId nulo
 * para asignarles una categoría predeterminada.
 */
async function updateSubcategories() {
    try {
        // Inicializar la conexión a la base de datos
        await database_1.AppDataSource.initialize();
        console.log("Conexión a la base de datos establecida");
        // Buscar todas las subcategorías con categoryId nulo
        const subcategoryRepository = database_1.AppDataSource.getRepository(Subcategory_1.Subcategory);
        const subcategoriesWithNullCategory = await subcategoryRepository
            .createQueryBuilder("subcategory")
            .where("subcategory.category_id IS NULL")
            .getMany();
        console.log(`Se encontraron ${subcategoriesWithNullCategory.length} subcategorías con categoryId nulo`);
        if (subcategoriesWithNullCategory.length === 0) {
            console.log("No hay subcategorías que actualizar");
            return;
        }
        // Buscar la primera categoría disponible para usar como predeterminada
        const categoryRepository = database_1.AppDataSource.getRepository('categories');
        const defaultCategory = await categoryRepository
            .createQueryBuilder("category")
            .getOne();
        if (!defaultCategory) {
            console.log("No se encontró ninguna categoría para usar como predeterminada");
            console.log("Creando una categoría predeterminada...");
            // Si no hay categorías, podríamos crear una
            // Pero esto requeriría importar la entidad Category y completar la lógica
            // Para este ejemplo, simplemente salimos
            console.log("Por favor, crea al menos una categoría antes de continuar");
            return;
        }
        // Actualizar todas las subcategorías con categoryId nulo
        const defaultCategoryId = defaultCategory.id;
        const updateResult = await subcategoryRepository
            .createQueryBuilder()
            .update()
            .set({ categoryId: defaultCategoryId })
            .where("category_id IS NULL")
            .execute();
        console.log(`Se actualizaron ${updateResult.affected} subcategorías con categoryId = ${defaultCategoryId}`);
    }
    catch (error) {
        console.error("Error al actualizar las subcategorías:", error);
    }
    finally {
        // Cerrar la conexión a la base de datos
        if (database_1.AppDataSource.isInitialized) {
            await database_1.AppDataSource.destroy();
            console.log("Conexión a la base de datos cerrada");
        }
    }
}
// Ejecutar el script
updateSubcategories()
    .then(() => console.log("Script completado"))
    .catch(error => console.error("Error en el script:", error));
