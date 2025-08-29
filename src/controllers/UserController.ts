import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { plainToInstance } from "class-transformer";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Obtiene todos los usuarios
   */
  getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  };

  /**
   * Obtiene un usuario por su ID
   */
  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await this.userService.getUserById(req.params.id);
    res.status(200).json(user);
  };

  /**
   * Crea un nuevo usuario
   */
  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    const newUser = await this.userService.createUser(createUserDto);
    res.status(201).json(newUser);
  };

  /**
   * Actualiza un usuario existente
   */
  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const updateUserDto = plainToInstance(UpdateUserDto, req.body);
    const updatedUser = await this.userService.updateUser(
      req.params.id,
      updateUserDto
    );
    res.status(200).json(updatedUser);
  };

  /**
   * Elimina un usuario
   */
  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.userService.deleteUser(req.params.id);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  };
}
