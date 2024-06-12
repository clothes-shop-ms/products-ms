import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from "@nestjs/common";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

import {AppModule} from './app.module';
import {envConfig} from "./config/env";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
          transport: Transport.TCP,
          options: {
              port: envConfig.PORT
          }
      }
  );

  app.useLogger(new Logger());

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
  );

  await app.listen();
}
bootstrap();
