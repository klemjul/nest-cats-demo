import { ValidationPipe } from "@nestjs/common";
import { APP_FILTER, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import { AuthGuard } from "./auth/auth.guard";
import { HttpExceptionFilter } from "./core/httpexception.filter";
import { LoggingInterceptor } from "./core/logging.interceptor";
import { timestampMiddleware } from "./core/timestamp.middleware";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*
    NOTE:
    1. Controller (HealthController)
    2. Middleware (timestampMiddleware)
    3. Interceptor (LoggingInterceptor)
    4. Exception Filter (HttpExceptionFilter)
    5. Service + DI (UsersModule, UsersService)
    6. MVC (views, setViewEngine ...)
    7. Pipe (CatsModule, BuiltIn ValidationPipe)
    8. Decorators, Guards (AuthModule, AuthGuard, RolesGuard )
    9. Events (EventModule, Observer, Websocket)
    10. Swagger

  */

  app.use(timestampMiddleware);

  app.useGlobalInterceptors(new LoggingInterceptor());

  // https://github.com/typestack/class-transformer
  // https://github.com/typestack/class-validator
  // app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalFilters(new HttpExceptionFilter());

  // const config = new DocumentBuilder()
  //   .setTitle("Cats example")
  //   .setDescription("The cats API description")
  //   .setVersion("1.0")
  //   .addTag("cats")
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api", app, document);
  // http://localhost:3000/api-json
  // http://localhost:3000/api

  // app.setBaseViewsDir(join(__dirname, "..", "views"));
  // app.setViewEngine("hbs");

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
