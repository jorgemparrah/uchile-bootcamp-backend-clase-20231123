import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JWTGuard implements CanActivate {

  constructor(
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("JWTGuard");
    const request = context.switchToHttp().getRequest();
    const token = request.headers["autorizacion"];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {

      const payload = await this.jwtService.verifyAsync(
        token, { secret: "CLAVE_PARA_FIRMAR" }
      );
      request['INFO'] = payload;
    } catch(e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}