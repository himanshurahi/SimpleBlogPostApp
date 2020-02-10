import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.authService.isAuth.subscribe(data => {
      console.log(data)
      this.isAuthenticated = data
    })
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
