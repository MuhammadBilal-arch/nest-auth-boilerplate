// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This decorator makes the module global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export the service to be used in other modules
})
export class PrismaModule {}
