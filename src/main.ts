import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chat bot')
    .setDescription('The Chat Bot WhastappAPI description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

// EAAFFFrIkr5EBO9FDTZAiyzGvg3jZALCLVMmrsHZAL2EYW7lbXzFjPnKeCyc6WdXQVpZBLHUmEurZCqIuDYFZA79GcQwRria2le5BxU4ZCvZAbRYdSfZCOKgr6dAyn99ZCGZB9maQk0xhpiG2BVN9lK2qxeWot0nHBKIOc6J81tjgtCqm6WO3mZAvv0EFvtyPs2Rc52OZA
