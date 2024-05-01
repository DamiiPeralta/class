import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    // Verificar si existe el encabezado Authorization
    if (!authorizationHeader) {
      return false;
    }

    // Verificar si el formato del encabezado Authorization es válido
    let isValid: boolean = false;
    if(authorizationHeader === "1234")
    {
        isValid = true;
    }
    return isValid;
  }
}