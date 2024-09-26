import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  config(); // Load environment variables

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My NestJS API') // Set your API title
    .setDescription('API description') // Provide an API description
    .setVersion('1.0') // Set the version of your API
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional: 'JWT' format is usually used for Bearer tokens
      },
      'access-token', // Reference name for the BearerAuth
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig); // Use the correct variable name
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
