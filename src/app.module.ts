import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 600000, limit: 2, }]),
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
