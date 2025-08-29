"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../../controllers/CategoryController");
const validation_1 = require("../../middleware/validation");
const Category_dto_1 = require("../../dtos/Category.dto");
const router = (0, express_1.Router)();
const categoryController = new CategoryController_1.CategoryController();
router
    .route("/")
    // Rutas de categorías
    .get(categoryController.getAllCategories)
    .post((0, validation_1.validateDto)(Category_dto_1.CreateCategoryRequest), categoryController.createCategory);
exports.default = router;
