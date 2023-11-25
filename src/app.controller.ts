import { Controller, Get, Headers, Param, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader } from '@nestjs/swagger';
import { JWTGuard } from './jwt.guard';

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

  @Get("login/:usuario/:clave")
  async login(@Param("usuario") usuario: string, @Param("clave") clave: string): Promise<string> {
    const resultado = await this.appService.login(usuario, clave);
    return resultado;
  }

  @UseGuards(JWTGuard)
  @ApiHeader({ name: "autorizacion", description: "Token de autenticación", required: true })
  @Get("endpoint/protegido/jwt")
  async endpointProtegidoJWT(@Headers("autorizacion") token: string, @Request() req): Promise<string> {
    console.log(req.INFO);
    console.log(token);
    return "Hola Mundo";
  }

  @UseGuards(JWTGuard)
  @ApiHeader({ name: "autorizacion", description: "Token de autenticación", required: true })
  @Get("endpoint/protegido2/jwt")
  async endpointProtegidoJWT2(@Headers("autorizacion") token: string, @Request() req): Promise<string> {
    console.log(req.INFO);
    console.log(token);
    return "Hola Mundo";
  }
}
