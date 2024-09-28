import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied. User roles not found.');
    }

    // Check if the user has at least one of the required roles
    const hasRole = () => user.roles.some(role => roles.includes(role));

    if (!hasRole()) {
      throw new ForbiddenException('Forbidden resource');
    }

    return true;
  }
}
