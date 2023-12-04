import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Crypto from 'crypto';

@Injectable()
export class AppService {

  modo = 'AES-256-CBC';
  password = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef';
  iv = Crypto.randomBytes(16);

  constructor(private jwtService: JwtService) { }

  encriptar(texto: string): string {
    let cipher = Crypto.createCipheriv(this.modo, Buffer.from(this.password), this.iv);
    const textoEncriptado = Buffer.concat([
      cipher.update(texto),
      cipher.final()
    ]);
    return textoEncriptado.toString('hex');
  }

  desencriptar(texto: string): string {
    let decipher = Crypto.createDecipheriv(this.modo, Buffer.from(this.password), this.iv);
    let decrypted = Buffer.concat([
      decipher.update(Buffer.from(
        texto, 'hex'
      )),
      decipher.final()
    ]);
    return decrypted.toString()
  }

  hashing(texto: string): string {
    const modo = 'md5' ;
    const hash = Crypto.createHash( modo ).update(texto).digest('hex');
    return hash;
  }

  async loginRoles(usuario: string, clave: string): Promise<string> {
    const hash = this.hashing(clave);
    if (usuario === "jorge" && hash === "e10adc3949ba59abbe56e057f20f883e") {
      const jsonInfo = {
        nombre: "Jorge",
        apellido: "Parra",
        correo: "jorge@gmail.com",
        perfil: [ "ADMINISTRADOR", "VENDEDOR" ]
      };
      const jwt = await this.jwtService.signAsync(jsonInfo);
      return jwt;
    }
    throw new UnauthorizedException("El usuario o contraseña no es válido")
  }

  async loginPermisos(usuario: string, clave: string): Promise<string> {
    const hash = this.hashing(clave);
    if (usuario === "jorge" && hash === "e10adc3949ba59abbe56e057f20f883e") {
      const jsonInfo = {
        nombre: "Jorge",
        apellido: "Parra",
        correo: "jorge@gmail.com",
        perfil: [ "ADMINISTRADOR", "VENDEDOR" ],
        permisos: [
          "CREAR_PRODUCTO",
          "CONSULTAR_PRODUCTO",
        ]
      };
      const jwt = await this.jwtService.signAsync(jsonInfo);
      return jwt;
    }
    throw new UnauthorizedException("El usuario o contraseña no es válido")
  }

}
