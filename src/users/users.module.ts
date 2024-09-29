// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './users.resolver';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UsersModule {}
