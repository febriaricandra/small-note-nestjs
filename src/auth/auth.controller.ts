import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('jwt');
        return res.json({ message: 'Logout successful' });
    }
}
