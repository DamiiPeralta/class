import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity"; // Importa la entidad User
import { UserDto } from "./user.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    
    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(id: string): Promise<User> {
        return this.userRepository.findOne({ 
            where: { id: id },
            relations: ['orders'],  });
    
    };
    async getUsersPaginated(offset: number, limit: number): Promise<User[]> {
        return this.userRepository.find({
            skip: offset,
            take: limit
        });
    }

    async getTotalCount(): Promise<number> {
        return this.userRepository.count();
    }

    async createUser(userDto: UserDto): Promise<User> {
        const newUser: User = this.userRepository.create(userDto);
        return this.userRepository.save(newUser);
    }
    

    async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await this.userRepository.remove(user);
        return await user
    }
}
