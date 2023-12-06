import {MiddlewareConsumer, Module, NestModule, Scope} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RequestService} from "./request.service";
import {AuthenticationMiddleware} from "./middlewares/authentication";
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from "@nestjs/core";
import {AuthGuard} from "./guards/auth.guard";
import {LoggingInterceptor} from "./interceptors/logging";
import {FreezePipe} from "./pipes/freeze";
import {HttpExceptionFilter} from "./filters/http-exception.filter";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
      AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
