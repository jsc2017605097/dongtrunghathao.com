import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema, Blog, BlogSchema } from './model';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class DatabaseModule {}
