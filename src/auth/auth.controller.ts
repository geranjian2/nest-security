import { Controller, Post, Get, UseGuards, Req, Request } from '@nestjs/common';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entity';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @Post('login')
  async login(@User() user: UserEntity, @Request() req: any) {
    console.log(req.user);
    const data = await this.authService.login(user);
    return data;
  }

  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return user;
  }
}
