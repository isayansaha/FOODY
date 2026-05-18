import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = 
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const errorMessage = typeof errorResponse === 'string' 
      ? errorResponse 
      : (errorResponse as any).message || 'Internal Server Error';

    response.status(status).json({
      success: false,
      error: errorMessage,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
