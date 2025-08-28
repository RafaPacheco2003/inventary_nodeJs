"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
class UserRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }
    async findById(id) {
        return this.repository.findOneBy({ id });
    }
    async findAllUsers() {
        return this.repository.find();
    }
    async createUser(userData) {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }
    async updateUser(id, userData) {
        await this.repository.update(id, userData);
        return this.findById(id);
    }
    async deleteUser(id) {
        await this.repository.delete(id);
    }
}
exports.UserRepository = UserRepository;
