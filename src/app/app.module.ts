import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from 'src/posts/posts.controller';
import { PostsModule } from 'src/posts/posts.module';
import { PostsService } from 'src/posts/posts.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schema/app.schema.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    PostsModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
