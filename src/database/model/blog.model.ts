import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import mongoose from 'mongoose';
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
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
