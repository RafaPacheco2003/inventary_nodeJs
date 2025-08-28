import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import {
  validateUserCreate,
  validateUserUpdate,
} from "../../middleware/validation";

const router = Router();
const userController = new UserController();

router
  .route("/")
  // Rutas de usuarios
  .get(userController.getAllUsers)
  .post(validateUserCreate, userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(validateUserUpdate, userController.updateUser)
  .delete(userController.deleteUser);

export default router;
