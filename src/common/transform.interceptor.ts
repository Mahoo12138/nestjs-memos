import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp(),
      req = ctx.getRequest<Request>(),
      res = ctx.getResponse<Response>();
    const message = ['GET'].includes(req.method)
      ? 'Request success'
      : 'Operation success';
    const code = res.statusCode;
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code,
          message,
        };
      }),
    );
  }
}
