import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RequestService} from "./request.service";
import {AuthenticationMiddleware} from "./middlewares/authentication";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./guards/auth.guard";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
      AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
