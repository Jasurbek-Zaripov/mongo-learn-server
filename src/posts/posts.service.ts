import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/app/schema/app.schema';
import { PostDto, RemovePostDto } from './postDto/posts.dto';
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

    async createPost(data: PostDto) {
        try {
            let userId = await this.userModul.findById(data.userId).exec();
            let who = await this.userModul
                .findOne({ first_name: data.who })
                .exec();
            if (!userId || !who) throw new Error('user not found!');

            let newPost = new this.postModul(data);
            await newPost.validate();

            return await newPost.save();
        } catch (xato) {
            return xato.message;
        }
    }

    async removePost(removePostDto: RemovePostDto) {
        try {
            const [userId, postId] = await Promise.all([
                this.userModul.findById(removePostDto.userId).exec(),
                this.postModul.find({
                    _id: removePostDto.postId,
                    userId: removePostDto.userId,
                }),
            ]);

            if (!userId) throw new Error('user not found');
            if (!postId) throw new Error('This user does not have such a post');

            return await this.postModul
                .findByIdAndDelete({ _id: removePostDto.postId })
                .exec();
        } catch (xato) {
            return xato.message;
        }
    }
}
