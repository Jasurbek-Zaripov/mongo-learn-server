import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ required: [true, 'userIdni kiriting!'], unique: true })
    userId: string;

    @Prop({ required: [true, 'titleni kiriting!'], maxlength: 30 })
    title: string;

    @Prop({ required: [true, 'textni kirirting!'], maxlength: 100 })
    text: string;

    @Prop({ required: [true, 'ismni kirirting!'], maxlength: 100 })
    who: string;

    @Prop({ default: 0 })
    like: number;

    @Prop({ default: 0 })
    dislike: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
