import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBooleanString,
  IsEmail,
  IsPostalCode,
  IsISO31661Alpha2,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UserRegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  street1: string;

  @ApiProperty()
  street2: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsPostalCode('US')
  postalCode: string;

  @ApiProperty()
  @IsOptional()
  @IsISO31661Alpha2()
  countryCode: string;
}

export class UserPasswordRecoveryDto {
  @ApiProperty()
  email: string;
}

export class UserPasswordResetDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  token: string;
}

export class UserLoginGoogleDto {
  @ApiProperty()
  token: string;
}
