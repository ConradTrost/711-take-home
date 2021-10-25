import { Injectable, NotFoundException } from "@nestjs/common";

import { Post } from './post.model';

let postNum = 0;

@Injectable()
export class PostsService {
    private posts: Post[] = [];

    insertPost(body: string) {
        postNum = postNum + 1;
        const date = new Date();
        const [month, day, hours, minutes] = [date.getMonth(), date.getDate(), date.getHours(), (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()]
        const postId = postNum;
        const timestamp = `Posted ${month}/${day}, ${hours}:${minutes}`;
        const newPost = new Post(postId, body, timestamp);
        this.posts.push(newPost);
        return [postId, timestamp]
    }

    getPosts() {
        return [...this.posts];
    }

    getSinglePost(postId: number) {
        const post = this.posts.find((post) => post.id == postId);
        if (!post) {
            throw new NotFoundException('Could not find post');
        }
        return { ...post };
    }
}