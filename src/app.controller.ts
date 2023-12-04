import { Controller, Get, Headers, Param, Request, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Ejemplo } from './ejemplo.decorador';
import { JWTGuard } from './jwt.guard';
import { Permisos } from './permisos.decorator';
import { PermisosGuard } from './permisos.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("encriptar/:texto")
  encriptar(@Param("texto") texto: string): string {
    return this.appService.encriptar(texto);
  }

  @Get("desencriptar/:texto")
  desencriptar(@Param("texto") texto: string): string {
    return this.appService.desencriptar(texto);
  }

  @Get("hashing/:texto")
  hashing(@Param("texto") texto: string): string {
    return this.appService.hashing(texto);
  }

  @Get("login/roles/:usuario/:clave")
  async loginRoles(@Param("usuario") usuario: string, @Param("clave") clave: string): Promise<string> {
    const resultado = await this.appService.loginRoles(usuario, clave);
    return resultado;
  }

  @Get("login/permisos/:usuario/:clave")
  async loginPermisos(@Param("usuario") usuario: string, @Param("clave") clave: string): Promise<string> {
    const resultado = await this.appService.loginPermisos(usuario, clave);
    return resultado;
  }

  // @Roles("VENDEDOR")
  @Permisos("CREAR_PRODUCTO")
  @Ejemplo("Hola", "Mundo")
  @UseGuards(JWTGuard, PermisosGuard)
  @ApiHeader({ name: "autorizacion", description: "Token de autenticación", required: true })
  @Get("endpoint/protegido/jwt")
  async endpointProtegidoJWT(@Headers("autorizacion") token: string, @Request() req): Promise<string> {
    //console.log(req.INFO);
    //console.log(token);
    return "Solo para vendedor" + JSON.stringify(req.INFO);
  }

  // @Roles("ADMINISTRADOR")
  @Permisos("ELIMINAR_PRODUCTO")
  @UseGuards(JWTGuard, PermisosGuard)
  @ApiHeader({ name: "autorizacion", description: "Token de autenticación", required: true })
  @Get("endpoint/protegido2/jwt")
  async endpointProtegidoJWT2(@Headers("autorizacion") token: string, @Request() req): Promise<string> {
    //console.log(req.INFO);
    //console.log(token);
    return "Solo para administrador";
  }

  // @Roles("COMPRADOR")
  @Permisos("CONSULTAR_PRODUCTO")
  @UseGuards(JWTGuard, PermisosGuard)
  @ApiHeader({ name: "autorizacion", description: "Token de autenticación", required: true })
  @Get("endpoint/protegido3/jwt")
  async endpointProtegidoJWT3(@Headers("autorizacion") token: string, @Request() req): Promise<string> {
    //console.log(req.INFO);
    //console.log(token);
    return "Solo para comprador";
  }
}
