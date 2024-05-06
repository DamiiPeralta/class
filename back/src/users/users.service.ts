import { Injectable } from "@nestjs/common";
import { User } from "./users.entity"; 
import { CreateUserDto } from "./user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.createUser(createUserDto);
    }

    async getUsers(page: number = 1, limit: number = 5): Promise<{ users: User[], totalPages: number, totalCount: number }> {
        // Calcula el offset para la paginación
        const offset = (page - 1) * limit;
        
        // Obtiene los usuarios paginados del repositorio
        const users = await this.usersRepository.getUsersPaginated(offset, limit);
        
        // Obtiene el número total de usuarios desde el repositorio
        const totalCount = await this.usersRepository.getTotalCount();

        // Calcula el número total de páginas
        const totalPages = Math.ceil(totalCount / limit);

        return await { users, totalPages, totalCount };
    }

    async getUserByCountry(country:string) {
        return await this.usersRepository.getUserByCountry(country);
    }

    async getUserById(id: string): Promise<User> {
        return await this.usersRepository.getUserById(id);
    }

    async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
        return await this.usersRepository.updateUser(id, updateUserDto);
    }

    async deleteUser(id: string): Promise<User> {
        return await this.usersRepository.deleteUser(id);
    }

    
}