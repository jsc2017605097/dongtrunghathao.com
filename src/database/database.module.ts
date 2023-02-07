import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminSchema,
  Blog,
  BlogSchema,
  Category,
  CategorySchema,
} from './model';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class DatabaseModule {}
