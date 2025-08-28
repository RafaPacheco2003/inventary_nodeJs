"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("../entities/User");
const user_dto_1 = require("../dtos/user.dto");
const base_mapper_1 = require("./base.mapper");
const bcrypt = __importStar(require("bcryptjs"));
class UserMapper extends base_mapper_1.BaseMapper {
    /**
     * Convierte un DTO de creación a una entidad
     */
    toEntity(createDto) {
        const user = new User_1.User();
        user.name = createDto.name;
        user.email = createDto.email;
        user.address = createDto.address || "";
        return user;
    }
    /**
     * Convierte un DTO de creación a una entidad con contraseña hasheada
     */
    async toEntityWithHashedPassword(createDto) {
        const user = this.toEntity(createDto);
        user.password = await this.hashPassword(createDto.password);
        return user;
    }
    /**
     * Aplica las actualizaciones de un DTO a una entidad existente
     */
    toUpdateEntity(entity, updateDto) {
        const updates = {};
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
    async toUpdateEntityWithHashedPassword(entity, updateDto) {
        const updates = this.toUpdateEntity(entity, updateDto);
        if (updateDto.password) {
            updates.password = await this.hashPassword(updateDto.password);
        }
        return updates;
    }
    /**
     * Convierte una entidad a un DTO de respuesta (sin información sensible)
     */
    toResponseDto(entity) {
        const dto = new user_dto_1.UserResponseDto();
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
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}
exports.UserMapper = UserMapper;
