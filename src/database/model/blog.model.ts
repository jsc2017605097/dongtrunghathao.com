import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
