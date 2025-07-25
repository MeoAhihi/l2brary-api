import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const message =
      typeof exception.getResponse() === 'string'
        ? exception.getResponse()
        : exception.getResponse()['message'];

    // Log the exception or send it to an error tracking service
    Logger.error(
      `${request.method} ${request.url}`,
      message,
      'HttpExceptionFilter',
    );

    response.status(status).json({
      statusCode: status,
      error: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
