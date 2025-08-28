import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from "../dtos/user.dto";
import { validate } from "class-validator";
import { BadRequestError, NotFoundError } from "../middleware/errorHandler";
import { UserMapper } from "../mappers/user.mapper";

export class UserService {
  private userRepository: UserRepository;
  private userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  /**
   * Obtiene todos los usuarios
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAllUsers();
    return this.userMapper.toResponseDtoList(users);
  }

  /**
   * Obtiene un usuario por su ID
   */
  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.findUserOrFail(id);
    return this.userMapper.toResponseDto(user);
  }

  /**
   * Crea un nuevo usuario
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await this.validateDto(createUserDto);
    await this.checkEmailUniqueness(createUserDto.email);

    // Crear y guardar el nuevo usuario
    const newUser = await this.userMapper.toEntityWithHashedPassword(
      createUserDto
    );
    const savedUser = await this.userRepository.createUser(newUser);

    return this.userMapper.toResponseDto(savedUser);
  }

  /**
   * Actualiza un usuario existente
   */
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    await this.validateDto(updateUserDto, true);

    const user = await this.findUserOrFail(id);

    // Verificar unicidad del email si se está actualizando
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.checkEmailUniqueness(updateUserDto.email, id);
    }

    // Aplicar actualizaciones
    const updates = await this.userMapper.toUpdateEntityWithHashedPassword(
      user,
      updateUserDto
    );
    const updatedUser = await this.userRepository.updateUser(id, updates);

    if (!updatedUser) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return this.userMapper.toResponseDto(updatedUser);
  }

  /**
   * Elimina un usuario
   */
  async deleteUser(id: number): Promise<void> {
    await this.findUserOrFail(id);
    await this.userRepository.deleteUser(id);
  }

  /**
   * Busca un usuario por ID o lanza error si no existe
   */
  private async findUserOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return user;
  }

  /**
   * Valida un DTO usando class-validator
   */
  private async validateDto(
    dto: any,
    skipMissingProperties = false
  ): Promise<void> {
    const errors = await validate(dto, { skipMissingProperties });
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      throw new BadRequestError(errorMessages.join(", "));
    }
  }

  /**
   * Verifica que el email sea único
   */
  private async checkEmailUniqueness(
    email: string,
    excludeId?: number
  ): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser && (!excludeId || existingUser.id !== excludeId)) {
      throw new BadRequestError("El email ya está registrado");
    }
  }
}
