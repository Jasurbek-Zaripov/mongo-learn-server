import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: [true, 'titleni kiriting!'], maxlength: 30 })
  title: string;

  @Prop({ required: [true, 'textni kirirting!'], maxlength: 100 })
  text: string;

  @Prop({ default: 0 })
  like: number;

  @Prop({ default: 0 })
  dislike: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
