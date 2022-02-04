import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/app/schema/app.schema';
import { PostDto } from './postDto/posts.dto';
import { Post, PostDocument } from './schema/posts.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModul: Model<PostDocument>,
        @InjectModel(User.name) private userModul: Model<UserDocument>,
    ) {}

    async getAllPosts() {
        try {
            return this.postModul.find().exec();
        } catch (xato) {
            console['log'](xato);
        }
    }

    async createPost(data: PostDto, id: string) {
        try {
            let newPost = new this.postModul(data);
            const res = await newPost.validate();
            console['log']('create post: ', res);

            newPost = await newPost.save();

            this.userModul.updateOne(
                { _id: id },
                {
                    $push: {
                        posts: newPost['_id'],
                    },
                },
            );
        } catch (xato) {
            console['log'](xato);
        }
    }
}
