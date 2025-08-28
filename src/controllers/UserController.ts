import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { BadRequestError } from "../middleware/errorHandler";
import { plainToInstance } from "class-transformer";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new BadRequestError("ID de usuario inválido");
      }

      const user = await this.userService.getUserById(id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createUserDto = plainToInstance(CreateUserDto, req.body);
      const newUser = await this.userService.createUser(createUserDto);

      res.status(201).json({
        success: true,
        data: newUser,
        message: "Usuario creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new BadRequestError("ID de usuario inválido");
      }

      const updateUserDto = plainToInstance(UpdateUserDto, req.body);
      const updatedUser = await this.userService.updateUser(id, updateUserDto);

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Usuario actualizado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new BadRequestError("ID de usuario inválido");
      }

      await this.userService.deleteUser(id);
      res.status(200).json({
        success: true,
        message: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
