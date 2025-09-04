"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const CloudinaryService_1 = require("../services/CloudinaryService");
const ProductService_1 = require("../services/ProductService");
const class_transformer_1 = require("class-transformer");
const Product_dto_1 = require("../dtos/Product.dto");
class ProductController {
    constructor() {
        this.uploadImage = CloudinaryService_1.upload.single("image");
        this.getAll = async (req, res, next) => {
            try {
                const products = await this.productService.getAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const product = await this.productService.getProductById(+id);
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const createProductDto = (0, class_transformer_1.plainToInstance)(Product_dto_1.CreateProductRequest, req.body);
                const newProduct = await this.productService.createProduct(createProductDto);
                res.status(201).json(newProduct);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const { id } = req.params;
                await this.productService.deleteProduct(+id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.productService = new ProductService_1.ProductService();
    }
}
exports.ProductController = ProductController;
