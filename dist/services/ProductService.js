"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../entities/Product");
const Product_mapper_1 = require("../mappers/Product.mapper");
const database_1 = require("../config/database");
const Product_dto_1 = require("../dtos/Product.dto");
const class_transformer_1 = require("class-transformer");
class ProductService {
    constructor() {
        this.productRepository = database_1.AppDataSource.getRepository(Product_1.Product);
        this.productMapper = new Product_mapper_1.ProductMapper();
    }
    async getAllProducts() {
        const products = await this.productRepository.find({
            relations: ["subcategory"],
        });
        return products.map((product) => this.productMapper.toResponseDto(product));
    }
    async getProductById(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ["subcategory"],
        });
        if (!product)
            throw new Error("Product not found");
        return this.productMapper.toResponseDto(product);
    }
    async createProduct(createDto) {
        const createProductDto = (0, class_transformer_1.plainToInstance)(Product_dto_1.CreateProductRequest, createDto);
        const savedProduct = await this.productRepository.save(createProductDto);
        // Cargar el producto con la relación de subcategoría para incluir el nombre de subcategoría
        const productWithRelations = await this.productRepository.findOne({
            where: { id: savedProduct.id },
            relations: ["subcategory"],
        });
        return this.productMapper.toResponseDto(productWithRelations);
    }
    async deleteProduct(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product)
            throw new Error("Product not found");
        await this.productRepository.remove(product);
    }
}
exports.ProductService = ProductService;
