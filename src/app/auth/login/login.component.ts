import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginLoad = false

  constructor(private authService: AuthService, private snackbar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.authService.loginUser(form.value)


  }

  ngOnInit() {

    this.authService.loginLoad.subscribe(data => {
      this.loginLoad = data
    })

    if (this.authService.isAuthenticated()) {
      return this.router.navigate(['/'])
    }

    if (this.route.snapshot.paramMap.get('errormsg')) {
      this.snackbar.open(this.route.snapshot.paramMap.get('errormsg'), 'Ok', {
        duration: 3000
      });
    }
  }

}
