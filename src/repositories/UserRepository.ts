import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
