import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { SubmenuComponent } from "./shared/submenu/submenu.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { CartService } from './services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    SubmenuComponent,
    FooterComponent,
    ToastModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'Melarik';
  num2 = 0;
  private reminderInterval: any;

  constructor(
    private CartService : CartService,
    private MessageService : MessageService
  ) {
  }

  ngOnInit(): void {
    this.startReminder();
  }

  test(){
    console.log('Este es un evento');

  }
  suma(num: number){
    this.num2 = num + this.num2;
    console.log(this.num2);
  }

  startReminder() {
    this.reminderInterval = setInterval(() => {
      this.remindUser();
    }, 30 * 1000); // 30 segundos en milisegundos
  }

  remindUser() {

    if (this.cartItems?.length > 0) {
      console.log('Recuerda que tienes productos en tu carrito de compras.');
      this.MessageService.add({severity:'info', summary:'Recuerda que tienes productos en tu carrito de compras.'});
      return;
    }
  }

  get cartItems() {
    return this.CartService.cartInfo.cart?.items;
  }
}
