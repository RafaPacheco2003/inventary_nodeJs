"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryService = void 0;
const Subcategory_1 = require("../entities/Subcategory");
const database_1 = require("../config/database");
const Subcategory_mapper_1 = require("../mappers/Subcategory.mapper");
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
        const subcategory = this.subcategoryMapper.toEntity(createDto);
        const savedSubcategory = await this.subcategoryRepository.save(subcategory);
        return this.subcategoryMapper.toResponseDto(savedSubcategory);
    }
    async deleteSubcategory(id) {
        const subcategory = await this.subcategoryRepository.findOneBy({ id });
        if (!subcategory)
            throw new Error("Subcategory not found");
        await this.subcategoryRepository.remove(subcategory);
    }
}
exports.SubcategoryService = SubcategoryService;
