"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const user_dto_1 = require("../dtos/user.dto");
const errorHandler_1 = require("../middleware/errorHandler");
const class_transformer_1 = require("class-transformer");
class UserController {
    constructor() {
        this.getAllUsers = async (req, res, next) => {
            try {
                const users = await this.userService.getAllUsers();
                res.status(200).json({
                    success: true,
                    data: users,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    throw new errorHandler_1.BadRequestError("ID de usuario inválido");
                }
                const user = await this.userService.getUserById(id);
                res.status(200).json({
                    success: true,
                    data: user,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            try {
                const createUserDto = (0, class_transformer_1.plainToInstance)(user_dto_1.CreateUserDto, req.body);
                const newUser = await this.userService.createUser(createUserDto);
                res.status(201).json({
                    success: true,
                    data: newUser,
                    message: "Usuario creado exitosamente",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    throw new errorHandler_1.BadRequestError("ID de usuario inválido");
                }
                const updateUserDto = (0, class_transformer_1.plainToInstance)(user_dto_1.UpdateUserDto, req.body);
                const updatedUser = await this.userService.updateUser(id, updateUserDto);
                res.status(200).json({
                    success: true,
                    data: updatedUser,
                    message: "Usuario actualizado exitosamente",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    throw new errorHandler_1.BadRequestError("ID de usuario inválido");
                }
                await this.userService.deleteUser(id);
                res.status(200).json({
                    success: true,
                    message: "Usuario eliminado exitosamente",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.userService = new UserService_1.UserService();
    }
}
exports.UserController = UserController;
