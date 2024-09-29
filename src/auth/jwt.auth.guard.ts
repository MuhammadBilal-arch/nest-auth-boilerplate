import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt'; 
  import { Request } from 'express';
  import { GqlExecutionContext } from '@nestjs/graphql'; // Import for GraphQL context
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isGraphQL = context.getType().toString() === 'graphql';
      const request = isGraphQL
        ? GqlExecutionContext.create(context).getContext().req  // Extract request in GraphQL
        : context.switchToHttp().getRequest();  // Standard HTTP request
  
      const token = this.extractTokenFromHeader(request);
      console.log('token', token);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET,
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }