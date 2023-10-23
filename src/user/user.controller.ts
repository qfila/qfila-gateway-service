import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findUser(@Query('email') email?: string) {
    const user = await this.usersService.findByEmail(email);

    if (email) return plainToInstance(UserModel, user);

    // should return all users
    return null;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findUserById(@Request() req: RequestWithUser, @Param('id') id: string) {
    if (id === 'me') id = req.user.id;

    const user = await this.usersService.findById(id);

    return plainToInstance(UserModel, user);
  }

  @Post()
  async signUp(@Body() body: CreateUserDTO) {
    const user = await this.usersService.signUp(body);

    return plainToInstance(UserModel, user);
  }
}
