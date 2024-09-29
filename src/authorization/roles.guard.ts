import { Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve the required roles for the route
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are defined, allow access
    }

    // Check if the request is a GraphQL request
    const isGraphQL = context.getType<string>() === 'graphql';
    const request = isGraphQL 
      ? GqlExecutionContext.create(context).getContext().req // Extract request in GraphQL
      : context.switchToHttp().getRequest<Request>(); // Standard HTTP request

    const user = request['user'] as any; // Type assertion for user
    console.log('user:', user);
    
    if (!user) {
      throw new HttpException('Access denied. User does not exist.', HttpStatus.UNAUTHORIZED);
    }

    if(!user.role)
    {
      throw new HttpException('Access denied. User role not found.', HttpStatus.UNAUTHORIZED);
    }

    // Check if the user has at least one of the required roles
    console.log('Required roles:', roles);
    const hasRole = roles.includes(user.role);

    // If the user does not have at least one of the required roles, throw an error
    if (!hasRole) {
      throw new HttpException('Access denied. User does not have required role.', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
