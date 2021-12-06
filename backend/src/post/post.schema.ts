import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  timestamps: true;
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ title: 'text' });

export { PostSchema };
