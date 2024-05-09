import { Controller, Post, Body, BadRequestException, Logger, InternalServerErrorException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./loginUserDto.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    private readonly logger = new Logger(AuthController.name);

    @Post("signin")
    async signIn(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        
        
        try {
            const token = await this.authService.signIn(loginUserDto);
            return { token };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error; // Propagar excepción BadRequestException sin modificar
            } else if (error.response && error.response.data && error.response.data.message) {
                // Si el error proviene de una respuesta HTTP (por ejemplo, una solicitud a un servicio externo)
                this.logger.error(`Error de solicitud externa: ${error.response.data.message}`);
                throw new InternalServerErrorException('Error interno del servidor');
            } else {
                // Otros errores no manejados
                this.logger.error(`Error no manejado: ${error.message}`);
                throw new InternalServerErrorException('Error interno del servidor');
            }
        }
    }
}