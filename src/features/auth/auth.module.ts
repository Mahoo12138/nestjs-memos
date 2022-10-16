import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';
import { OpenIdStrategy } from './strategy/openid.strategy';
import { SessionStrategy } from './strategy/session.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionStrategy,
    OpenIdStrategy,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
