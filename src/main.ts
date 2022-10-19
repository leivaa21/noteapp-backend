import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NoteApp - Backend')
    .setDescription('Api de ejemplo')
    .setVersion('1.0')
    .addTag('Notes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
