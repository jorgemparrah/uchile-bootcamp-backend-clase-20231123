import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISOS_KEY } from "./permisos.decorator";

@Injectable()
export class PermisosGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("RolesGuard");
    const requeridos = this.reflector.getAllAndOverride<string[]>(PERMISOS_KEY, [ context.getHandler(), context.getClass() ]);
    const request = context.switchToHttp().getRequest();
    const infoUsuario = request['INFO'];
    const permisosUsuario = infoUsuario['permisos'];
    const autorizado = requeridos.some(permisos => permisosUsuario.some(p => p === permisos));
    if (autorizado) {
      return true;
    }
    throw new UnauthorizedException("No tiene permisos para acceder a este recurso");
  }
}