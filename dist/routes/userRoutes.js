"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// Rutas de usuarios
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validation_1.validateUserCreate, userController.createUser);
router.put("/:id", validation_1.validateUserUpdate, userController.updateUser);
router.delete("/:id", userController.deleteUser);
exports.default = router;
