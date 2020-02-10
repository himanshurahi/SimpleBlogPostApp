import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myerror;
  constructor(private authService: AuthService, private snackbar: MatSnackBar) { }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.authService.createUser({ email: form.value.email, password: form.value.password }).subscribe(data => {
      console.log(data)
    }, error => {
      error.error.code == 11000 ? this.myerror = 'Email Already Exist' : this.myerror = null
      this.snackbar.open(this.myerror, 'Ok', {
        duration: 3000
      });
    })
  }

  ngOnInit() {
  }

}
