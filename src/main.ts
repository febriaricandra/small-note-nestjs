import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: '*', credentials: true });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Mini Notion API')
    .setDescription('API documentation for Mini Notion')
    .setVersion('1.0')
    .addCookieAuth('jwt', {
      type: 'apiKey',
      in: 'cookie',
      name: 'jwt',
    })
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1);
});
