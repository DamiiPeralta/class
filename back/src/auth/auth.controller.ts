import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "src/users/user.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin")
    async signIn(@Body() signInDto: UserDto): Promise<{ token: string }> {
        try {
            console.log(signInDto)
            const token = await this.authService.signIn(signInDto);
            return { token };
        } catch (error) {
            throw new BadRequestException('Email o password incorrectos');
        }
    }
}