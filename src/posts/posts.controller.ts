import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostDto } from './postDto/posts.dto';
import { PostsService } from './posts.service';

@Controller('/api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getAllPosts() {
        return await this.postsService.getAllPosts();
    }

    @Post(':id')
    async createPost(@Body() postDto: PostDto, @Param('id') id: string) {
        return await this.postsService.createPost(postDto, id);
    }
}
