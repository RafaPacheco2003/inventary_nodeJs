import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {
  validateUserCreate,
  validateUserUpdate,
} from "../middleware/validation";

const router = Router();
const userController = new UserController();

// Rutas de usuarios
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validateUserCreate, userController.createUser);
router.put("/:id", validateUserUpdate, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
