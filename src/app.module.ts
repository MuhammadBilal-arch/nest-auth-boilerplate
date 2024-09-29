import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';  
import { PrismaModule } from 'prisma/prisma.module';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Role } from '@prisma/client';
@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: true,
        context: ({ req }) => ({ req }),
      }),
    PrismaModule,
    AuthModule, UsersModule],
  controllers: [],
  providers: [], 
})
export class AppModule {
  constructor() {
    // Register the Role enum
    registerEnumType(Role, {
      name: 'Role', // The name used in GraphQL queries
    });
  }
}
