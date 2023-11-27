import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: any) => {
        console.error('Erro inesperado', err?.response?.data ?? err);

        const msg = err?.response?.data?.message;

        switch (err?.response?.status) {
          case HttpStatus.BAD_REQUEST:
            return throwError(() => new BadRequestException(msg));
          case HttpStatus.FORBIDDEN:
            return throwError(() => new ForbiddenException(msg));
          case HttpStatus.NOT_FOUND:
            return throwError(() => new NotFoundException(msg));
        }

        return throwError(
          () => new InternalServerErrorException('Algo inesperado aconteceu'),
        );
      }),
    );
  }
}
