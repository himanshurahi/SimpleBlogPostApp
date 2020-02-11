import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  constructor(public postService: PostsService, private authService: AuthService, private snackbar: MatSnackBar) { }
  // posts = [
  //   { title: 'this is title', content: 'this is content 1' },
  //   { title: 'this is title', content: 'this is content 2' },
  //   { title: 'this is title', content: 'this is content 3' },

  // ]
  totalPosts = 10;
  postPerPage = 2;
  loading = true
  currentPage;
  @Input() posts = []
  isAuth;
  user;
  deleting = false


  onChangePage(pageData: PageEvent) {

    this.currentPage = pageData.pageIndex + 1
    this.postPerPage = pageData.pageSize
    this.postService.getPosts(pageData.pageSize, this.currentPage).subscribe((postData: any) => {
      this.loading = false
      this.posts = postData.posts
    }, error => {
      this.posts.push({ postTitle: error.name })
    })
    console.log(pageData)
  }

  onDelete(id) {
    this.deleting = true
    this.postService.deletePost(id).subscribe((data) => {
      this.posts = this.posts.filter(post => {
        return post._id != id
        this.deleting = false
      })

    }, error => {
      this.authService.logout()
      this.snackbar.open(error.error, 'Ok', {
        duration: 3000
      });

    })
  }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated()
    this.user = this.authService.user
    console.log('List Post Compo')

    this.postService.getPosts(this.postPerPage, 1).subscribe((postData: any) => {
      console.log(postData.count)
      this.totalPosts = postData.count
      this.loading = false
      this.posts = postData.posts
    }, error => {
      console.log(error)
      this.snackbar.open(error.name, 'Ok', {
        duration: 3000
      });
      this.posts.push({ postTitle: error.name })
    })
    this.postService.PostAdded.subscribe(data => {
      this.posts.push(data)
    })
  }


}
