import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { UserRegisterDto, UserLoginDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    protected readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Get()
  public async find() {
    return this.userService.find();
  }

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  public async register(@Body() dto: UserRegisterDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login a user and returns a user object with an accessToken',
  })
  public async login(
    @Body() dto: UserLoginDto,
  ): Promise<User & { accessToken: string }> {
    return this.userService.login(dto);
  }
}
