import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccessTokenStrategy } from './jwt/accessToken.strategy';
import { jwtConfig } from './jwt/jwt.config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConfig.access,
      signOptions: { expiresIn: jwtConfig.expiresIn.access },
    }),
  ],
  providers: [AuthenticationService, AccessTokenStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
