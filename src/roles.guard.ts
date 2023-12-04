import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "./roles.decorator";
import { CLAVE } from "./ejemplo.decorador";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("RolesGuard");
    const requeridos = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ context.getHandler(), context.getClass() ]);
    const request = context.switchToHttp().getRequest();
    const infoUsuario = request['INFO'];
    const rolesUsuario = infoUsuario['perfil'];
    const autorizado = requeridos.some(rol => rolesUsuario.some(r => r === rol));
    if (autorizado) {
      return true;
    }
    throw new UnauthorizedException("No tiene permisos para acceder a este recurso");
  }
}