"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../../controllers/ProductController");
const fileUpload_1 = require("../../middleware/fileUpload");
const validation_1 = require("../../middleware/validation");
const Product_dto_1 = require("../../dtos/Product.dto");
const router = (0, express_1.Router)();
const productController = new ProductController_1.ProductController();
router
    .route("/")
    .get(productController.getAll)
    .post(productController.uploadImage, fileUpload_1.processImageUploadForProduct, (0, validation_1.validateDto)(Product_dto_1.CreateProductRequest), productController.create);
router.route("/:id").get(productController.getById);
exports.default = router;
