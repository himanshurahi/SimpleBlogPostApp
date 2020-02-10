import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: "", component: ListPostsComponent },
  { path: "create", component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: "edit/:id", component: CreatePostComponent, canActivate : [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard, LoginGuard]
})
export class AppRoutingModule { }
