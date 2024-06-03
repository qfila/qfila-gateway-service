import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from './http-client/http-client.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    QueueModule,
    HttpClientModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [AppService, AuthService],
})
export class AppModule {}
