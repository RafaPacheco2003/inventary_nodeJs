import { Repository } from "typeorm";
import { User } from "../entities/User";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from "../dtos/user.dto";
import { BadRequestError, NotFoundError } from "../middleware/errorHandler";
import { UserMapper } from "../mappers/user.mapper";
import { AppDataSource } from "../config/database";

export class UserService {
  private userRepository: Repository<User>;
  private userMapper: UserMapper;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.userMapper = new UserMapper();
  }

  /**
   * Obtiene todos los usuarios
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return this.userMapper.toResponseDtoList(users);
  }

  /**
   * Obtiene un usuario por su ID
   * @param id Puede ser un string o number
   */
  async getUserById(id: string | number): Promise<UserResponseDto> {
    const numericId = this.parseId(id);
    const user = await this.findUserOrFail(numericId);
    return this.userMapper.toResponseDto(user);
  }

  /**
   * Crea un nuevo usuario
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // La validación del DTO ya se realiza en el middleware
    await this.checkEmailUniqueness(createUserDto.email);

    // Crear y guardar el nuevo usuario
    const newUser = await this.userMapper.toEntityWithHashedPassword(
      createUserDto
    );
    const user = this.userRepository.create(newUser);
    const savedUser = await this.userRepository.save(user);

    return this.userMapper.toResponseDto(savedUser);
  }

  /**
   * Actualiza un usuario existente
   * @param id Puede ser un string o number
   */
  async updateUser(
    id: string | number,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    const numericId = this.parseId(id);

    const user = await this.findUserOrFail(numericId);

    // Verificar unicidad del email si se está actualizando
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.checkEmailUniqueness(updateUserDto.email, numericId);
    }

    // Aplicar actualizaciones
    const updates = await this.userMapper.toUpdateEntityWithHashedPassword(
      user,
      updateUserDto
    );
    await this.userRepository.update(numericId, updates);
    const updatedUser = await this.userRepository.findOneBy({ id: numericId });

    if (!updatedUser) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return this.userMapper.toResponseDto(updatedUser);
  }

  /**
   * Elimina un usuario
   * @param id Puede ser un string o number
   */
  async deleteUser(id: string | number): Promise<void> {
    const numericId = this.parseId(id);
    await this.findUserOrFail(numericId);
    await this.userRepository.delete(numericId);
  }

  /**
   * Convierte el ID a un número y valida que sea válido
   */
  private parseId(id: string | number): number {
    const numericId = typeof id === "string" ? parseInt(id) : id;
    if (isNaN(numericId)) {
      throw new BadRequestError("ID de usuario inválido");
    }
    return numericId;
  }

  /**
   * Busca un usuario por ID o lanza error si no existe
   */
  private async findUserOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return user;
  }

  /**
   * Verifica que el email sea único
   */
  private async checkEmailUniqueness(
    email: string,
    excludeId?: number
  ): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser && (!excludeId || existingUser.id !== excludeId)) {
      throw new BadRequestError("El email ya está registrado");
    }
  }
}
