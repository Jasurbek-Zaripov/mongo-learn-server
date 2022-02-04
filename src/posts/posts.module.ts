import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/posts.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AppService } from 'src/app/app.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
