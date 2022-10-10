import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import {
  UserLoginDto,
  UserLoginResponseDto,
  UserRegisterDto,
} from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserRegisterDto) {
    const user = await this.userRepository.create(dto);
    if (dto.password) {
      user.password = await this.encryptPassword(dto.password);
    }
    try {
      // create user
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.constraint === 'user__email__uq') {
        throw new ConflictException(
          'Duplicate email. Please try a different email address.',
        );
      }
      throw error;
    }
  }

  async encryptPassword(password: string) {
    const rounds = await this.configService.get('BCRYPT_SALT_ROUNDS');
    let hashed;
    // tslint:disable-next-line
    if (password.indexOf('$2a$') === 0 && password.length === 60) {
      // assume already a hash, maybe copied from another record
      hashed = password;
    } else {
      hashed = await bcrypt.hash(password, rounds);
    }
    return hashed;
  }

  async login(dto: UserLoginDto): Promise<UserLoginResponseDto> {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'verified'],
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email not found, please signup to create an account',
      );
    }

    if (await bcrypt.compare(dto.password, user.password)) {
      const isEmailVerificationEnabled = this.configService.get(
        'USER_EMAIL_VERIFICATION_ENABLED',
      );
      if (isEmailVerificationEnabled && !user.verified) {
        // system requires email verification before logging in
        // this.sendRegistrationEmail(user);
        throw new ConflictException(
          'E-mail address verification required. Please check your e-mail.',
        );
      }

      // update timestamp when last logged in
      user.authenticated = new Date();
      await this.userRepository.save(user);

      const payload = {
        sub: user.id,
        email: user.email,
      };
      const jwtSecret = this.configService.get('USER_JWT_SECRET');
      const jwtExpiresIn = this.configService.get('USER_JWT_EXPIRES_IN');
      const accessToken = this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: jwtExpiresIn,
      });

      delete user.password;
      return { accessToken, expiresIn: jwtExpiresIn };
    }
    throw new UnauthorizedException(
      'Email and password do not match, please try again',
    );
  }

  public find(query: PaginateQuery): Promise<Paginated<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    return paginate(query, queryBuilder, {
      sortableColumns: ['id', 'email', 'firstName', 'lastName', 'created'],
      searchableColumns: ['email', 'firstName', 'lastName', 'postalCode'],
      defaultSortBy: [['id', 'DESC']],
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(dto: Partial<User>, requestUser: User) {
    await this.userRepository.update(dto.id, dto);
    return await this.userRepository.findOne({ where: { id: dto.id } });
  }
}
