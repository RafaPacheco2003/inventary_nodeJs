"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryController = void 0;
const SubcategoryService_1 = require("../services/SubcategoryService");
class SubcategoryController {
    constructor() {
        this.getAll = async (req, res, next) => {
            const subcategories = await this.subcategoryService.getAllSubcategories();
            res.json(subcategories);
        };
        this.getById = async (req, res, next) => {
            const { id } = req.params;
            const subcategory = await this.subcategoryService.getSubcategoryById(+id);
            res.json(subcategory);
        };
        this.create = async (req, res, next) => {
            const subcategory = await this.subcategoryService.createSubcategory(req.body);
            res.status(201).json(subcategory);
        };
        this.delete = async (req, res, next) => {
            const { id } = req.params;
            await this.subcategoryService.deleteSubcategory(+id);
            res.status(204).send();
        };
        this.subcategoryService = new SubcategoryService_1.SubcategoryService();
    }
}
exports.SubcategoryController = SubcategoryController;
