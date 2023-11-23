import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

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
}
