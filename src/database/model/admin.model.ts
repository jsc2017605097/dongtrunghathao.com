import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type AdminDocument = Admin & Document;
@Schema({
  timestamps: true,
  collection: 'Admin',
})
export class Admin {
  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  nickname: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.index({ username: 1 }, { unique: true });
