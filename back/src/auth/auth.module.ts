import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";

@Module({
    providers:[AuthService, AuthRepository],
    controllers:[AuthController]
})
export class AuthModule{}