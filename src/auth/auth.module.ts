import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './jwt.auth.guard'; 

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      useFactory: () => ({
        secret: process.env.JWT_SECRET, // Use a strong secret key
        signOptions: { expiresIn: '60m' }, // Token expiration time
      }),
    }), 
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule]
})
export class AuthModule {}
