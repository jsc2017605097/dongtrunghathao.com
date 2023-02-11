import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from './admin.model';
import { Category } from './category.model';
export type BlogDocument = Blog & Document;

@Schema({
  timestamps: true,
  collection: 'Blog',
})
export class Blog {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  blogPhotoUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Admin.name })
  createdBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Admin.name })
  updatedBy: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  categoryId: string;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Boolean, default: false })
  isDisplayAtBanner: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
