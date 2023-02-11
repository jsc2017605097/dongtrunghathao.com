import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type BannerDocument = Banner & Document;

@Schema({
    timestamps: true,
    collection: 'Banner',
})
export class Banner {
    @Prop({ type: String })
    url: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
