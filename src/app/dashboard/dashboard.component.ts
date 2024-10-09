import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { SubmenuComponent } from '../shared/submenu/submenu.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    SubmenuComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  constructor(
    private CartService: CartService
  ) {

  }

  ngOnInit(): void {
    console.log('Este es un log');
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    const body ={
      userId : uid,
    }
    this.CartService.getCartByUser(body, token!);
  }
}
