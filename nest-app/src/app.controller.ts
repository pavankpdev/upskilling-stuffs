import {Body, Controller, Get, Post, UseFilters, UseGuards, UsePipes} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "./guards/auth.guard";
import {FreezePipe} from "./pipes/freeze";
import {HttpExceptionFilter} from "./filters/http-exception.filter";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  // @UseGuards(FreezePipe) apply to all the params
  ex(
      @Body(new FreezePipe()) body: any
  ) {
    // body.data = "new data" ===> This will throw an error
      return body
  }

}
