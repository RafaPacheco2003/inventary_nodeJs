import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductMapper } from "../mappers/Product.mapper";
import { AppDataSource } from "../config/database";
import { CreateProductRequest, ProductResponse } from "../dtos/Product.dto";
import { create } from "domain";
import { plainToInstance } from "class-transformer";

export class ProductService {
  private productRepository: Repository<Product>;
  private productMapper: ProductMapper;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.productMapper = new ProductMapper();
  }

  async getAllProducts(): Promise<ProductResponse[]> {
    const products = await this.productRepository.find({
      relations: ["subcategory"],
    });
    return products.map((product) => this.productMapper.toResponseDto(product));
  }

  async getProductById(id: number): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["subcategory"],
    });
    if (!product) throw new Error("Product not found");
    return this.productMapper.toResponseDto(product);
  }

  async createProduct(
    createDto: CreateProductRequest
  ): Promise<ProductResponse> {
    const createProductDto = plainToInstance(CreateProductRequest, createDto);

    const savedProduct = await this.productRepository.save(createProductDto);

    // Cargar el producto con la relación de subcategoría para incluir el nombre de subcategoría
    const productWithRelations = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ["subcategory"],
    });

    return this.productMapper.toResponseDto(productWithRelations!);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new Error("Product not found");
    await this.productRepository.remove(product);
  }
}
