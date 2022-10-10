import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as ConfigModuleInternal } from '@nestjs/config';
import Joi from 'joi';

export interface ConfigModuleOptions {
  environment: string;
  isGlobal: boolean;
}

@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      imports: [
        ConfigModuleInternal.forRoot({
          envFilePath: `./.env${
            process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
          }`,
          validationSchema: Joi.object({
            NODE_ENV: Joi.string()
              .valid('development', 'production', 'test', 'provision')
              .default('development'),
            API_BASE_URL: Joi.string().default('http://localhost:3000'),
            DATABASE_HOST: Joi.string().required(),
            DATABASE_TYPE: Joi.string().default('postgres'),
            DATABASE_SSL: Joi.boolean().default(false),
            DATABASE_PORT: Joi.number().default(5432),
            DATABASE_USERNAME: Joi.string().required(),
            DATABASE_PASSWORD: Joi.string().required(),
            DATABASE_NAME: Joi.string().required(),
            USER_JWT_SECRET: Joi.string().default('changeme'),
            USER_JWT_EXPIRES_IN: Joi.string().default('365d'),
            USER_BCRYPT_ROUNDS: Joi.number().default(10),
            USER_EMAIL_VERIFICATION_ENABLED: Joi.boolean().default(true),
            MAIL_SMTP_HOST: Joi.string(),
            MAIL_SMTP_PORT: Joi.number(),
            MAIL_SMTP_SECURE: Joi.boolean(),
            MAIL_SMTP_USERNAME: Joi.string(),
            MAIL_SMTP_PASSWORD: Joi.string(),
            MAIL_DEFAULT_FROM: Joi.string().default('from@gmail.com'),
          }),
        }),
      ],
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
      global: options.isGlobal,
    };
  }
}
