import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): string {
    return 'System is operational';
  }

  @Get('error-test')
  getError(): string {
    throw new HttpException('This is a test error', HttpStatus.BAD_REQUEST);
  }
}
