import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [UserController],
  providers: [UserService, JwtService, MailService],
})
export class UserModule {}
