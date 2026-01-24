import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env['PORT'] || 3000;
  const domain = process.env['RAILWAY_PUBLIC_DOMAIN']
      ? `https://${process.env['RAILWAY_PUBLIC_DOMAIN']}`
      : `http://localhost`;
  const feUrl = process.env['FRONTEND_URL'] as string;  // From Railway env variable
  const isProd = process.env['NODE_ENV'] === 'production';

  const app = await NestFactory.create(AppModule);

  // Add api prefix for all endpoints
  app.setGlobalPrefix('api');

  // Enable CORS for Angular frontend
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4300',
      'http://localhost:8100',
      'https://your-app.netlify.app',  // Web app on Netlify URL here
      feUrl,
    ].filter(Boolean),
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger API documentation
  if (!isProd) {
    const config = new DocumentBuilder()
    .setTitle('Birthday App API')
    .setDescription('API for birthday reminder application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
  }

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API is running on: ${domain}:${port}`);
  console.log(`📝 Environment: ${process.env['NODE_ENV'] || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env['FRONTEND_URL'] || 'localhost'}`);
}

bootstrap();
