import { Body, Controller, Get, Post , Param} from "@nestjs/common";

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    addPost(
        @Body('body') postBody: string, 
    ): any {
        const generatedId = this.postsService.insertPost(postBody);
        return {id: generatedId};
    }

    @Get()
    getAllPosts() {
        return this.postsService.getPosts();
    }

    // @Get(':id') 
    // getPost(@Param('id') postId: number) {
    //     return this.postsService.getSinglePost(postId);
    // }
}