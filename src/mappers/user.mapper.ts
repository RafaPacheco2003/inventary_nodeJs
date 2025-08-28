import { User } from "../entities/User";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from "../dtos/user.dto";
import { BaseMapper } from "./base.mapper";
import * as bcrypt from "bcryptjs";

export class UserMapper extends BaseMapper<
  User,
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto
> {
  /**
   * Convierte un DTO de creación a una entidad
   */
  toEntity(createDto: CreateUserDto): User {
    const user = new User();
    user.name = createDto.name;
    user.email = createDto.email;
    user.address = createDto.address || "";

    return user;
  }

  /**
   * Convierte un DTO de creación a una entidad con contraseña hasheada
   */
  async toEntityWithHashedPassword(createDto: CreateUserDto): Promise<User> {
    const user = this.toEntity(createDto);
    user.password = await this.hashPassword(createDto.password);
    return user;
  }

  /**
   * Aplica las actualizaciones de un DTO a una entidad existente
   */
  toUpdateEntity(entity: User, updateDto: UpdateUserDto): Partial<User> {
    const updates: Partial<User> = {};

    if (updateDto.name !== undefined) {
      updates.name = updateDto.name;
    }

    if (updateDto.email !== undefined) {
      updates.email = updateDto.email;
    }

    if (updateDto.address !== undefined) {
      updates.address = updateDto.address;
    }

    return updates;
  }

  /**
   * Aplica las actualizaciones incluyendo la contraseña hasheada
   */
  async toUpdateEntityWithHashedPassword(
    entity: User,
    updateDto: UpdateUserDto
  ): Promise<Partial<User>> {
    const updates = this.toUpdateEntity(entity, updateDto);

    if (updateDto.password) {
      updates.password = await this.hashPassword(updateDto.password);
    }

    return updates;
  }

  /**
   * Convierte una entidad a un DTO de respuesta (sin información sensible)
   */
  toResponseDto(entity: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.address = entity.address;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  /**
   * Hashea una contraseña usando bcrypt
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
