import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType();
    if (contextType === 'http') {
      const request = context.switchToHttp().getRequest();
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          this.logger.verbose(
            `${request.ip} requested ${request.method} ${request.url} and get ${
              response.statusCode
            } response in ${Date.now() - request['timestamp']}ms`,
          );
        }),
      );
    }
    return next.handle();
  }
}
