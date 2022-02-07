import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostDto, RemovePostDto } from './postDto/posts.dto';
import { PostsService } from './posts.service';

@Controller('/api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getAllPosts() {
        return await this.postsService.getAllPosts();
    }

    @Post()
    async createPost(@Body() postDto: PostDto) {
        return await this.postsService.createPost(postDto);
    }

    @Delete()
    async removePost(@Body() removePostDto: RemovePostDto) {
        return await this.postsService.removePost(removePostDto);
    }
}
