import { Router } from "express";
import { ProductController } from "../../controllers/ProductController";
import { processImageUploadForProduct } from "../../middleware/fileUpload";
import { validateDto } from "../../middleware/validation";
import { CreateProductRequest } from "../../dtos/Product.dto";

const router = Router();
const productController = new ProductController();

router
  .route("/")
  .get(productController.getAll)
  .post(
    productController.uploadImage,
    processImageUploadForProduct,
    validateDto(CreateProductRequest),
    productController.create
  );

router.route("/:id").get(productController.getById);

export default router;
