import { UseGuards, Controller, Get,Req,  Body, Param, Put, Delete, HttpStatus, HttpCode, BadRequestException, NotFoundException, InternalServerErrorException, Query, HttpException, UnauthorizedException} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { Role } from "src/auth/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("Users")
export class UsersController {
    constructor(private readonly usersService: UsersService
    ) {}
    
    @ApiBearerAuth()
    @Get("admin")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @HttpCode(HttpStatus.OK)
    async getAdmin(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<{ users: any[], totalPages: number, totalCount: number }> {
        try {
            return await this.usersService.getAdmin(page, limit);
        } catch (error) {
            throw new InternalServerErrorException('Error interno al obtener usuarios admin');
        }
    }
    

    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<{ users: any[], totalPages: number, totalCount: number }> {
        try {
            return await this.usersService.getUsers(page, limit);
        } catch (error) {
            throw new InternalServerErrorException('Error interno al obtener usuarios');
        }
    }

    @ApiBearerAuth()
    @Get("profile")
    @UseGuards(AuthGuard , RolesGuard)
    @Roles(Role.Admin)
    getUserProfile(@Req() request: Request & {user:any}){
        return "Este enpoint retorne el perfil del usuario"
    }

    @ApiBearerAuth()
    @Get('/country/:country')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getUsersByCountry(@Param('country') country: string): Promise<User[]> {
        try {
            const countryName = country.replace(/-/g, ' ');
            const countryUsers = await this.usersService.getUsersByCountry(countryName);
            if(countryUsers.length > 0){
                return countryUsers
            }else {
                throw  new NotFoundException("No hay usuarios con esa nacionalidad")
            }
        } catch (error) {
            throw new InternalServerErrorException('Error interno al obtener usuarios por país');
        }
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard , RolesGuard)
    @Roles(Role.Admin)
    async getUserById(@Param('id') id: string){
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                throw new NotFoundException(`Usuario con ID '${id}' no encontrado`);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Error interno al obtener el usuario');
            }
        }
    }

    @ApiBearerAuth()
    @Put(':id')
    @ApiBody({})
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.SuperAdmin)
    @HttpCode(HttpStatus.OK)
    async updateUserToAdmin(@Param('id') id: string, @Body() updateUserDto:Partial<User>){
        try {
            const user = await this.usersService.updateToUserAdmin(id);
            return user;
        } catch (error) {
            if (error instanceof NotFoundException){
                throw new NotFoundException (`Usuario con id ${id} no encontrado`);
            } else {
                throw new InternalServerErrorException(`Error interno al modificar el usuario con id ${id}`)
            }
            
        }
    }
    
    

    @ApiBearerAuth()
    @Put(':id')
    @ApiBody({})
    @UseGuards(AuthGuard , RolesGuard)
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>){
        try {
            if (!updateUserDto.phone && !updateUserDto.country && !updateUserDto.city && !updateUserDto.name && !updateUserDto.email && !updateUserDto.password && !updateUserDto.address) {
                throw new BadRequestException('At least one field to update must be provided');
            }
            return await this.usersService.updateUser(id, updateUserDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Error interno al actualizar el usuario');
            }
        }
    }
    
 /* @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.usersService.deleteUser(id);
            if (!user) {
                throw new NotFoundException(`Usuario con ID '${id}' no encontrado`);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Error interno al eliminar el usuario');
            }
        }
    }*/


    @ApiBearerAuth()
    @Delete(':id')
    @ApiBody({})
    @UseGuards(AuthGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @HttpCode(HttpStatus.OK)
    
    async deleteUser(@Param('id') id: string, @Req() req): Promise<User> {
    const currentUser = req.user; // Obtener el usuario actual que viene desde el request
    console.log(currentUser)
    try {
        const userToDelete = await this.usersService.getUserById(id);
       
        if (!userToDelete) {
            throw new NotFoundException(`Usuario con ID '${id}' no encontrado`);
        }
        
        if (currentUser.isSuperAdmin) {
            console.log('pasa este check')
            // Usuario que tiene rol de superAdmin puede eliminar a cualquier usuario
            const deletedUser = await this.usersService.deleteUser(id);
            return deletedUser;
        } else if (currentUser.isAdmin && !userToDelete.isAdmin) {
            console.log('pasa 2do check')
            // Si el usuario actual es admin puede eliminar a un usuario comun, que no tenga ningun rol
            const deletedUser = await this.usersService.deleteUser(id);
            return deletedUser;
        } else {
            // Los usuarios que tienen rol de admin no pueden borrar a un usuario que tiene el mismo rol
            throw new UnauthorizedException('No tienes permiso para eliminar este usuario');
        }
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
        } else {
            throw new InternalServerErrorException('Error interno al eliminar el usuario');
        }
    } 
  }


}




