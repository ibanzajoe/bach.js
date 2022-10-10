import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ConfigService } from '../config/config.service';
import {
  UserLoginDto,
  UserLoginResponseDto,
  UserRegisterDto,
} from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    protected readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  // for all options https://github.com/ppetzold/nestjs-paginate
  @Get()
  @ApiOperation({
    summary: 'Find users',
    description:
      'Example search options: http://localhost:3000/cats?limit=5&page=2&sortBy=color:DESC&search=i&filter.age=$gte:3',
  })
  public find(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.find(query);
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
  public async login(@Body() dto: UserLoginDto): Promise<UserLoginResponseDto> {
    return this.userService.login(dto);
  }

  @Patch(':id([0-9]+)')
  @ApiOperation({ summary: 'Updates a user' })
  public async update(
    @Param('id') id: number,
    @Body() dto: Partial<User>,
    @Req() request,
  ) {
    dto.id = id;
    return this.userService.update(dto, request.user);
  }
}
