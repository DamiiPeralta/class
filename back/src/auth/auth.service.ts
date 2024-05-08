import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { CreateUserDto } from "src/users/user.dto";
import { LoginUserDto } from "./loginUserDto.dto";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async signIn(loginUserDto: LoginUserDto): Promise<string> {

        // Extraemos las credenciales del objeto UserDto
        const { email, password } = loginUserDto;
        console.log(email, password)

        // Verificamos si se proporcionaron ambas credenciales
        if (!email || !password) {
            throw new Error('Email y password son requeridos');
        }

        // Verificamos si existe un usuario registrado con el email proporcionado (simulado)
        const userExists = await this.authRepository.checkUserExistsByEmail(loginUserDto);

        if (!userExists) {
            console.log("email incorrecto")
            throw new Error('Email  incorrectos');
        }

        // Verificamos si la contraseña proporcionada coincide con la registrada (simulado)
        const passwordMatches = await this.authRepository.checkPasswordMatches(loginUserDto);

        if (!passwordMatches) {
            console.log("password Incorrecto")
            throw new Error('password incorrectos');
        }

        // Si las credenciales son válidas, retornamos un token de autenticación (simulado)
        return '1234';
    }
}
