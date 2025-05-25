import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.entity';

interface Request {
  user?: User;
  cookies: { [key: string]: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = request.cookies['jwt'];

    if (!token) return false;

    try {
      const payload: Partial<User> = this.jwtService.verify(token);
      request.user = payload as User;
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error);
      return false;
    }
  }
}
