"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryService = void 0;
const Subcategory_1 = require("../entities/Subcategory");
const Subcategory_dto_1 = require("../dtos/Subcategory.dto");
const database_1 = require("../config/database");
const Subcategory_mapper_1 = require("../mappers/Subcategory.mapper");
const class_transformer_1 = require("class-transformer");
class SubcategoryService {
    constructor() {
        this.subcategoryRepository = database_1.AppDataSource.getRepository(Subcategory_1.Subcategory);
        this.subcategoryMapper = new Subcategory_mapper_1.SubcategoryMapper();
    }
    async getAllSubcategories() {
        const subcategories = await this.subcategoryRepository.find({
            relations: ["category"],
        });
        return subcategories.map((subcategory) => this.subcategoryMapper.toResponseDto(subcategory));
    }
    async getSubcategoryById(id) {
        const subcategory = await this.subcategoryRepository.findOne({
            where: { id },
            relations: ["category"],
        });
        if (!subcategory)
            throw new Error("Subcategory not found");
        return this.subcategoryMapper.toResponseDto(subcategory);
    }
    async createSubcategory(createDto) {
        const createSubcategoryDto = (0, class_transformer_1.plainToInstance)(Subcategory_dto_1.CreateSubcategoryRequest, createDto);
        const savedSubcategory = await this.subcategoryRepository.save(createSubcategoryDto);
        return this.subcategoryMapper.toResponseDto(savedSubcategory);
    }
    async deleteSubcategory(id) {
        const subcategory = await this.subcategoryRepository.findOneBy({ id });
        if (!subcategory)
            throw new Error("Subcategory not found");
        await this.subcategoryRepository.remove(subcategory);
    }
    /**
     * Actualiza una subcategoría existente
     *
     * @param id - El ID de la subcategoría a actualizar
     * @param updateDto - Los datos para actualizar la subcategoría
     * @returns Una promesa que resuelve a un objeto SubcategoryResponse con la subcategoría actualizada
     * @throws Error si la subcategoría no existe
     */
    async updateSubcategory(id, updateDto) {
        // Buscar la subcategoría por ID
        const subcategory = await this.subcategoryRepository.findOneBy({ id });
        if (!subcategory)
            throw new Error("Subcategory not found");
        // Actualizar solo los campos que vienen en la solicitud
        if (updateDto.name !== undefined) {
            subcategory.name = updateDto.name;
        }
        if (updateDto.image !== undefined) {
            subcategory.image = updateDto.image;
        }
        if (updateDto.categoryId !== undefined) {
            subcategory.categoryId = updateDto.categoryId;
        }
        // Guardar la subcategoría actualizada
        const updatedSubcategory = await this.subcategoryRepository.save(subcategory);
        // Buscar la subcategoría actualizada con relaciones para incluir el nombre de la categoría
        const subcategoryWithRelations = await this.subcategoryRepository.findOne({
            where: { id },
            relations: ["category"],
        });
        if (!subcategoryWithRelations)
            throw new Error("Subcategory not found after update");
        // Convertir la entidad actualizada a DTO de respuesta
        return this.subcategoryMapper.toResponseDto(subcategoryWithRelations);
    }
}
exports.SubcategoryService = SubcategoryService;
