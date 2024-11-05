import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router, private AuthService : AuthService) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token');

    this.AuthService.validateToken(token!).subscribe( resp => {
      if ( resp.success == true){
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }
    }, error => {
      this.router.navigate(['/login']);
      return false;
    });
    return true;
  }
}
