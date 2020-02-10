import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts = []
  PostAdded = new EventEmitter()
  PostFetched = new EventEmitter()
  constructor(private http: HttpClient) { }

  getPosts(pageSize, currentPage) {
    const queryParams = `?pagesize=${pageSize}&currentpage=${currentPage}`
    return this.http.get(environment.API_URL+"/api/posts"+queryParams)


  }

  gPost() {
    return this.posts
  }
  deletePost(id) {
    return this.http.delete(environment.API_URL+"/api/posts/" + id)
  }

  updatePost(data) {

    return this.http.patch(environment.API_URL+"/api/post/" + data.id, { title: data.postTitle, content: data.postBody })
  }


  addPost(post) {
    // this.http.post("http://localhost:3000/api/posts", post).subscribe((data: any) => {
    //   this.PostAdded.emit(data)

    // })
    return this.http.post(environment.API_URL+"/api/posts", post)
    // this.posts.push(post)
  }

  getPostById(id) {
    return this.http.get(environment.API_URL+"/api/post/" + id)
  }
}

