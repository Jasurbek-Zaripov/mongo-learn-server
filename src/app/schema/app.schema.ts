import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: 'String', maxlength: 20, unique: true })
  first_name: string;

  @Prop({ required: true, type: 'String', maxlength: 20 })
  last_name: string;

  @Prop({
    required: true,
    type: 'String',
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  })
  email: string;

  @Prop({
    required: true,
    enum: { values: ['Male', 'Female'], message: '{VALUE} is not supported' },
  })
  gender: string;

  @Prop({
    required: true,
    type: 'Date',
    validate: {
      validator: (v: Date) => {
        const aft_date = new Date('1945/01/01').getTime();
        const bef_date = new Date('2015/01/01').getTime();
        const val_date = new Date(v).getTime();
        return val_date > aft_date && val_date < bef_date;
      },
    },
  })
  birth: Date;

  @Prop({
    required: true,
    type: 'String',
    validate: {
      validator: (v: string) => {
        return /\+.*\s.*\s.*\s..*/.test(v);
      },
    },
    unique: true,
  })
  contact: string;

  @Prop({ type: 'Array', default: [] })
  posts: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
