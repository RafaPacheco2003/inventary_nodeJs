import { Request, Response, NextFunction } from "express";
import { upload } from "../services/CloudinaryService";
import { ProductService } from "../services/ProductService";
import { plainToInstance } from "class-transformer";
import { CreateProductRequest } from "../dtos/Product.dto";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  uploadImage = upload.single("image");

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(+id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductDto = plainToInstance(CreateProductRequest, req.body);

      const newProduct = await this.productService.createProduct(
        createProductDto
      );
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(+id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
