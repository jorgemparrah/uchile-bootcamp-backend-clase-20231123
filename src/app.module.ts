import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "CLAVE_PARA_FIRMAR",
      signOptions: { expiresIn: '300s' }, // TIEMPO DE EXPIRACION
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
