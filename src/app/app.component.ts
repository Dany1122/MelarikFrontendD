import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { SubmenuComponent } from "./shared/submenu/submenu.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    SubmenuComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Melarik';
  num2 = 0;
  test(){
    console.log('Este es un evento');

  }
  suma(num: number){
    this.num2 = num + this.num2;
    console.log(this.num2);
  }
}
