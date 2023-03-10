import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { AppLoggerMiddleware } from './common/log-middleware';
import { CategoryModule } from './modules/category/category.module';
import { BannerModule } from './modules/banner/banner.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AdminModule,
    AuthModule,
    BlogModule,
    CategoryModule,
    BannerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
