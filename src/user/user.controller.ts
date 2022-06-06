import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators';
import { CreateUserDto } from './dtos';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Auth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getMany() {
    return this.userService.getMany();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.getOne(id);
  }
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);
    return { message: 'User create', data };
  }
  @Put()
  editOne() {}
  @Delete()
  deleteOne() {}
}
