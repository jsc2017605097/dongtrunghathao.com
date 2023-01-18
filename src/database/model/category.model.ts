import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from './admin.model';
export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  collection: 'Category',
})
export class Category {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  CategoryPhotoUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Admin.name })
  createdBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Admin.name })
  updatedBy: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
