import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacyPolicy.component.html',
  styleUrl: './privacyPolicy.component.css',
})
export class PrivacyPolicyComponent {
  constructor(
    private router: Router
  ) {} 
  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}


