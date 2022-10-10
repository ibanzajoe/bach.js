import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
  patchTypeORMTreeRepositoryWithBaseTreeRepository,
} from 'typeorm-transactional-cls-hooked';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// enable @Transactional() decorator
initializeTransactionalContext(); // Initialize cls-hooked
// patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.
// patchTypeORMTreeRepositoryWithBaseTreeRepository();

// prod mode
if (import.meta.env.PROD) {
  patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.
  patchTypeORMTreeRepositoryWithBaseTreeRepository();
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
  bootstrap();
}

const viteNodeApp = await NestFactory.create(AppModule);
await viteNodeApp.useGlobalPipes(new ValidationPipe());
const config = new DocumentBuilder()
  .setTitle('API docs')
  .setDescription('API description')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(viteNodeApp, config);
SwaggerModule.setup('docs', viteNodeApp, document);

viteNodeApp.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);

export const app = viteNodeApp;
