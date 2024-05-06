import { UseGuards, Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, BadRequestException, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDto } from "./user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UsersDbService } from "./usersDb.service";


@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly usersDbService: UsersDbService
    ) {}
    
    //admin
    @Get()
    @UseGuards(AuthGuard) 
    async getUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<{ users: User[], totalPages: number, totalCount: number }> {
        return await this.usersService.getUsers(page, limit);
    }

    @Get(':country')
    @UseGuards(AuthGuard)
    async getUserByCountry(@Param('country') country:string): Promise<User[]>{
        const countryName = country.replace(/-/g, ' ');
        return await this.usersService.getUserByCountry(countryName);
    }

    //admin
    @Get(':id')
    @UseGuards(AuthGuard) 
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.usersService.getUserById(id);
    }

    //admin/user
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto, @Req() request:Request & {now: string}): Promise<User> {
        if (!createUserDto.name || !createUserDto.email || !createUserDto.password) {
            throw new BadRequestException('Name, email, and password are required');
        }
        const newUser = await this.usersService.createUser(createUserDto);
        return newUser;
    }

    //admin/user
    @Put(':id')
    @UseGuards(AuthGuard) 
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<number> {
        if (!updateUserDto.name && !updateUserDto.email && !updateUserDto.password && !updateUserDto.address) {
            throw new BadRequestException('At least one field to update must be provided');
        }
        const userId = await this.usersService.updateUser(id, updateUserDto);
        return ;
    }

    @Delete(':id')
    @UseGuards(AuthGuard) 
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string): Promise<User> {
        console.log(id)
        const user= await this.usersService.deleteUser(id);
        return user;
    }
}
