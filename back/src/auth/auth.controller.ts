import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./loginUserDto.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin")
    async signIn(@Body() LoginUserDto: LoginUserDto): Promise<{ token: string }> {
        try {
            console.log(LoginUserDto)
            const token = await this.authService.signIn(LoginUserDto);
            return { token };
        } catch (error) {
            throw new BadRequestException('Email o password incorrectos');
        }
    }
}