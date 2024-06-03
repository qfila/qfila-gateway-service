import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) {
    const loginPayload = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    };

    const { accessToken } = await this.authService.login(loginPayload);

    return { ...loginPayload, accessToken };
  }
}
