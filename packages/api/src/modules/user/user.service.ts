import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { UserLoginDto, UserRegisterDto } from './user.dto';
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

  async login(dto: UserLoginDto): Promise<User & { accessToken: string }> {
    const user = await this.userRepository.findOne({
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

      user.lastLoggedIn = new Date();
      await this.userRepository.save(user);

      const payload = {
        sub: user.id,
        email: user.email,
      };
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get('USER_JWT_SECRET'),
        expiresIn: '365d',
      });
      return { ...user, accessToken };
    }
    throw new UnauthorizedException(
      'Email and password do not match, please try again',
    );
  }

  async find() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    return this.userRepository.findOne(id);
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
}
