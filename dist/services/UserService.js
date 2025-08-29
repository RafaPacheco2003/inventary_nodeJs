"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../entities/User");
const errorHandler_1 = require("../middleware/errorHandler");
const user_mapper_1 = require("../mappers/user.mapper");
const database_1 = require("../config/database");
class UserService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
        this.userMapper = new user_mapper_1.UserMapper();
    }
    /**
     * Obtiene todos los usuarios
     */
    async getAllUsers() {
        const users = await this.userRepository.find();
        return this.userMapper.toResponseDtoList(users);
    }
    /**
     * Obtiene un usuario por su ID
     * @param id Puede ser un string o number
     */
    async getUserById(id) {
        const numericId = this.parseId(id);
        const user = await this.findUserOrFail(numericId);
        return this.userMapper.toResponseDto(user);
    }
    /**
     * Crea un nuevo usuario
     */
    async createUser(createUserDto) {
        // La validación del DTO ya se realiza en el middleware
        await this.checkEmailUniqueness(createUserDto.email);
        // Crear y guardar el nuevo usuario
        const newUser = await this.userMapper.toEntityWithHashedPassword(createUserDto);
        const user = this.userRepository.create(newUser);
        const savedUser = await this.userRepository.save(user);
        return this.userMapper.toResponseDto(savedUser);
    }
    /**
     * Actualiza un usuario existente
     * @param id Puede ser un string o number
     */
    async updateUser(id, updateUserDto) {
        const numericId = this.parseId(id);
        const user = await this.findUserOrFail(numericId);
        // Verificar unicidad del email si se está actualizando
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            await this.checkEmailUniqueness(updateUserDto.email, numericId);
        }
        // Aplicar actualizaciones
        const updates = await this.userMapper.toUpdateEntityWithHashedPassword(user, updateUserDto);
        await this.userRepository.update(numericId, updates);
        const updatedUser = await this.userRepository.findOneBy({ id: numericId });
        if (!updatedUser) {
            throw new errorHandler_1.NotFoundError("Usuario no encontrado");
        }
        return this.userMapper.toResponseDto(updatedUser);
    }
    /**
     * Elimina un usuario
     * @param id Puede ser un string o number
     */
    async deleteUser(id) {
        const numericId = this.parseId(id);
        await this.findUserOrFail(numericId);
        await this.userRepository.delete(numericId);
    }
    /**
     * Convierte el ID a un número y valida que sea válido
     */
    parseId(id) {
        const numericId = typeof id === "string" ? parseInt(id) : id;
        if (isNaN(numericId)) {
            throw new errorHandler_1.BadRequestError("ID de usuario inválido");
        }
        return numericId;
    }
    /**
     * Busca un usuario por ID o lanza error si no existe
     */
    async findUserOrFail(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new errorHandler_1.NotFoundError("Usuario no encontrado");
        }
        return user;
    }
    /**
     * Verifica que el email sea único
     */
    async checkEmailUniqueness(email, excludeId) {
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser && (!excludeId || existingUser.id !== excludeId)) {
            throw new errorHandler_1.BadRequestError("El email ya está registrado");
        }
    }
}
exports.UserService = UserService;
