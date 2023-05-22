import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();
    const message = exception['response']['message'] || exception.message;

    const logMessage = `${request.ip} requested ${request.method} ${
      request.url
    } and get ${statusCode} response in ${Date.now() - request['timestamp']}ms`;
    if (statusCode >= 500) {
      this.logger.error(logMessage);
    } else {
      this.logger.warn(logMessage);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date(request['timestamp']).toISOString(),
      path: request.url,
    });
  }
}
