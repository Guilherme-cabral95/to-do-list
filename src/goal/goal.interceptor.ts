import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class GoalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
       
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item) => {
           

            if (item.data_criacao instanceof Date) {
              item.data_criacao = item.data_criacao.toLocaleString();
            }
            if (item.data_atualizacao instanceof Date) {
              item.data_atualizacao = item.data_atualizacao.toLocaleString();
            }
          });
        } else {
          if (data.data_criacao instanceof Date) {
            data.data_criacao = data.data_criacao.toLocaleString();
          }
          if (data.data_atualizacao instanceof Date) {
            data.data_atualizacao = data.data_atualizacao.toLocaleString();
          }
        }
        return data;
      }),
    );
  }
}