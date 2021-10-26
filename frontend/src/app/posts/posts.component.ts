import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    host: {'class': 'chat-area'}
})
export class PostsComponent {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.loadPosts();
  }

  inputForm = this.formBuilder.group({
    body: ''
  })

  posts: any[] = [];

  isPosts: boolean = true;

  loadPosts(): void {
    this.http.get('http://127.0.0.1:3000/posts')
    .subscribe((posts: any) => {
      this.posts = posts;

      if (posts.length < 1) {
        this.isPosts = false;
      } else {
        this.isPosts = true;
      }

      setTimeout(() => {
        const chatClient = document.getElementById('chat-responses');
        if (chatClient) {
          chatClient.scrollTop = chatClient.scrollHeight;
        }
      }, 50)

    });
  }

  createPost(): void {
    this.http.post('http://127.0.0.1:3000/posts', {
      body: this.inputForm.value.body
    }).subscribe((res: any) => {
      this.inputForm.reset();
      this.loadPosts();
    }, (error)=>alert(JSON.stringify(error)));
  }
}