import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  newPost = ""
  postBody = ""
  postTitle = ""
  mode = 'create'
  post;
  id;
  Btnloading = false
  loading = false
  imagePrew;
  Chandler = true
  @Output() postCreated = new EventEmitter();
  constructor(public postService: PostsService, private authService: AuthService, public route: ActivatedRoute, public router: Router, private snackbar: MatSnackBar) { }
  onAddPost() {
    this.newPost = "changed"
  }

  onFileSelected(event) {
    const allowedtype = ['image/png', 'image/jpeg']
    let image = event.target.files && event.target.files[0]
    if (image && allowedtype.find(type => type == image.type)) {
      this.Chandler = false
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePrew = reader.result
      }
      reader.readAsDataURL(image)
    } else {
      this.Chandler = true
      console.log('error')
    }

  }
  onSubmit(form) {
    this.Btnloading = true
    // console.log(form.value)
    const post = form.value
    console.log(post)
    if (this.mode == 'create') {
      this.postService.addPost(post).subscribe(data => {
        this.Btnloading = false
        this.router.navigate(['/'])
        form.resetForm();
      }, error => {
        this.authService.logout()
        this.snackbar.open(error.error, 'Ok', {
          duration: 3000
        });
        this.Btnloading = false
      })
    } else {
      this.postService.updatePost({ id: this.id, ...form.value }).subscribe(post => {
        console.log(post)
        this.router.navigate(['/'])
        this.Btnloading = false
      }, error => {
        this.authService.logout()
        this.snackbar.open(error.error, 'Ok', {
          duration: 3000
        });
        this.Btnloading = false
        console.log(error.status)
      })
    }
  }
  ngOnInit() {
    console.log(this.Chandler)
    this.route.paramMap.subscribe((param: any) => {
      if (param.has('id')) {
        this.loading = true
        this.mode = 'edit'
        this.id = param.params.id
        this.postService.getPostById(this.id).subscribe(post => {
          this.post = post
          this.loading = false
        }, error => {
          this.loading = false
          console.log(error)
          this.router.navigate(['/'])
        })
      } else {
        this.mode = 'create'
      }
    });
  }

}
