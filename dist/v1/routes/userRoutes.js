"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controllers/UserController");
const validation_1 = require("../../middleware/validation");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
router
    .route("/")
    // Rutas de usuarios
    .get(userController.getAllUsers)
    .post(validation_1.validateUserCreate, userController.createUser);
router
    .route("/:id")
    .get(userController.getUserById)
    .put(validation_1.validateUserUpdate, userController.updateUser)
    .delete(userController.deleteUser);
exports.default = router;
