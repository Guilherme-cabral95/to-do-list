import { Module, MiddlewareConsumer, NestModule   } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GoalModule } from './goal/goal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/gateway.module';
import { ThrottlerModule } from '@nestjs/throttler';


@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mysql',
    host: String( process.env.MYSQL_HOST),
    port: Number(process.env.MYSQL_PORT),
    username: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
    database: String(process.env.MYSQL_DATABASE),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    
  }) , AuthModule, GoalModule, GatewayModule,
  ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10,
  }])
],
  controllers: [],
  providers: [], 
})
export class AppModule  {
  
  
}
