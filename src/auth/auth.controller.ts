import { Controller, Post, Get, UseGuards, Req, Request } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entity';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity, @Request() req: any) {
    console.log(req.user);
    const data = await this.authService.login(user);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'Estos son tus datos';
  }
}
