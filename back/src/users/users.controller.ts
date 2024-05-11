import { UseGuards, Controller, Get,Req, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, BadRequestException, NotFoundException, InternalServerErrorException, Query, Headers } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDto } from "./user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UsersDbService } from "./usersDb.service";
import { Role } from "src/auth/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly usersDbService: UsersDbService
    ) {}

    @Get("admin")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    getAdmin(){
        return "Ruta protegida"
    }
    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    async getUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<{ users: any[], totalPages: number, totalCount: number }> {
        try {
            return await this.usersService.getUsers(page, limit);
        } catch (error) {
            throw new InternalServerErrorException('Error interno al obtener usuarios');
        }
    }
    @Get("profile")
    @UseGuards(AuthGuard)
    getUserProfile(@Req() request: Request & {user:any}){
        console.log(request.user)
        return "Este enpoint retorne el perfil del usuario"
    }

    @Get(':country')
    @UseGuards(AuthGuard)
    async getUserByCountry(@Param('country') country: string): Promise<User[]> {
        try {
            const countryName = country.replace(/-/g, ' ');
            return await this.usersService.getUserByCountry(countryName);
        } catch (error) {
            throw new InternalServerErrorException('Error interno al obtener usuarios por país');
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string){
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                throw new NotFoundException(`Usuario con ID '${id}' no encontrado`);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Propagar NotFoundException sin modificar
            } else {
                throw new InternalServerErrorException('Error interno al obtener el usuario');
            }
        }
    }
    

    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>){
        try {
            if (!updateUserDto.name && !updateUserDto.email && !updateUserDto.password && !updateUserDto.address) {
                throw new BadRequestException('At least one field to update must be provided');
            }
            return await this.usersService.updateUser(id, updateUserDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error; // Propagar BadRequestException sin modificar
            } else {
                throw new InternalServerErrorException('Error interno al actualizar el usuario');
            }
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string): Promise<User> {
        try {
            console.log(id);
            const user = await this.usersService.deleteUser(id);
            if (!user) {
                throw new NotFoundException(`Usuario con ID '${id}' no encontrado`);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Propagar NotFoundException sin modificar
            } else {
                throw new InternalServerErrorException('Error interno al eliminar el usuario');
            }
        }
    }
}
