/**
 * Interfaz base para todos los mappers
 */
export interface IMapper<Entity, CreateDto, UpdateDto, ResponseDto> {
  toEntity(createDto: CreateDto): Entity;
  toUpdateEntity(entity: Entity, updateDto: UpdateDto): Partial<Entity>;
  toResponseDto(entity: Entity): ResponseDto;
  toResponseDtoList(entities: Entity[]): ResponseDto[];
}

/**
 * Clase base para todos los mappers
 */
export abstract class BaseMapper<Entity, CreateDto, UpdateDto, ResponseDto>
  implements IMapper<Entity, CreateDto, UpdateDto, ResponseDto>
{
  abstract toEntity(createDto: CreateDto): Entity;
  abstract toUpdateEntity(
    entity: Entity,
    updateDto: UpdateDto
  ): Partial<Entity>;
  abstract toResponseDto(entity: Entity): ResponseDto;

  /**
   * Convierte una lista de entidades a una lista de DTOs de respuesta
   */
  toResponseDtoList(entities: Entity[]): ResponseDto[] {
    return entities.map((entity) => this.toResponseDto(entity));
  }
}
