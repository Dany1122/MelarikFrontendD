import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}

  imgSrc = 'assets/rosa.png';
  username: string = '';
  password: string = '';

  handleLogin() {
    let body = {
      email : this.username,
      password : this.password
    }
    this.AuthService.login(body).subscribe((res) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    },
    (err) => {
      
      alert('Invalid credentials');
    }
  );


  }
}
