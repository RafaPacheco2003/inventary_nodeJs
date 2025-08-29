"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const user_dto_1 = require("../dtos/user.dto");
const class_transformer_1 = require("class-transformer");
class UserController {
    constructor() {
        /**
         * Obtiene todos los usuarios
         */
        this.getAllUsers = async (_req, res, next) => {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        };
        /**
         * Obtiene un usuario por su ID
         */
        this.getUserById = async (req, res, next) => {
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        };
        /**
         * Crea un nuevo usuario
         */
        this.createUser = async (req, res, next) => {
            const createUserDto = (0, class_transformer_1.plainToInstance)(user_dto_1.CreateUserDto, req.body);
            const newUser = await this.userService.createUser(createUserDto);
            res.status(201).json(newUser);
        };
        /**
         * Actualiza un usuario existente
         */
        this.updateUser = async (req, res, next) => {
            const updateUserDto = (0, class_transformer_1.plainToInstance)(user_dto_1.UpdateUserDto, req.body);
            const updatedUser = await this.userService.updateUser(req.params.id, updateUserDto);
            res.status(200).json(updatedUser);
        };
        /**
         * Elimina un usuario
         */
        this.deleteUser = async (req, res, next) => {
            await this.userService.deleteUser(req.params.id);
            res.status(200).json({ message: "Usuario eliminado exitosamente" });
        };
        this.userService = new UserService_1.UserService();
    }
}
exports.UserController = UserController;
