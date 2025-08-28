"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const class_validator_1 = require("class-validator");
const errorHandler_1 = require("../middleware/errorHandler");
const user_mapper_1 = require("../mappers/user.mapper");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.userMapper = new user_mapper_1.UserMapper();
    }
    /**
     * Obtiene todos los usuarios
     */
    async getAllUsers() {
        const users = await this.userRepository.findAllUsers();
        return this.userMapper.toResponseDtoList(users);
    }
    /**
     * Obtiene un usuario por su ID
     */
    async getUserById(id) {
        const user = await this.findUserOrFail(id);
        return this.userMapper.toResponseDto(user);
    }
    /**
     * Crea un nuevo usuario
     */
    async createUser(createUserDto) {
        await this.validateDto(createUserDto);
        await this.checkEmailUniqueness(createUserDto.email);
        // Crear y guardar el nuevo usuario
        const newUser = await this.userMapper.toEntityWithHashedPassword(createUserDto);
        const savedUser = await this.userRepository.createUser(newUser);
        return this.userMapper.toResponseDto(savedUser);
    }
    /**
     * Actualiza un usuario existente
     */
    async updateUser(id, updateUserDto) {
        await this.validateDto(updateUserDto, true);
        const user = await this.findUserOrFail(id);
        // Verificar unicidad del email si se está actualizando
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            await this.checkEmailUniqueness(updateUserDto.email, id);
        }
        // Aplicar actualizaciones
        const updates = await this.userMapper.toUpdateEntityWithHashedPassword(user, updateUserDto);
        const updatedUser = await this.userRepository.updateUser(id, updates);
        if (!updatedUser) {
            throw new errorHandler_1.NotFoundError("Usuario no encontrado");
        }
        return this.userMapper.toResponseDto(updatedUser);
    }
    /**
     * Elimina un usuario
     */
    async deleteUser(id) {
        await this.findUserOrFail(id);
        await this.userRepository.deleteUser(id);
    }
    /**
     * Busca un usuario por ID o lanza error si no existe
     */
    async findUserOrFail(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new errorHandler_1.NotFoundError("Usuario no encontrado");
        }
        return user;
    }
    /**
     * Valida un DTO usando class-validator
     */
    async validateDto(dto, skipMissingProperties = false) {
        const errors = await (0, class_validator_1.validate)(dto, { skipMissingProperties });
        if (errors.length > 0) {
            const errorMessages = errors
                .map((error) => Object.values(error.constraints || {}))
                .flat();
            throw new errorHandler_1.BadRequestError(errorMessages.join(", "));
        }
    }
    /**
     * Verifica que el email sea único
     */
    async checkEmailUniqueness(email, excludeId) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser && (!excludeId || existingUser.id !== excludeId)) {
            throw new errorHandler_1.BadRequestError("El email ya está registrado");
        }
    }
}
exports.UserService = UserService;
