import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { TruncatePipe } from '../../../pipe/truncate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {

    constructor(
      private CartService : CartService
    ) {
    }

    deliveryType: string = '';
    shippingOption: string = '';
    selectedAddress: string = '';
    selectedCoupon : string = '';

    ngOnInit(): void {
    }

    calculateDiscount(): number {
      return (  (this.cartInfo.cart.totalPrice + Number( this.shippingOption)) * Number( this.selectedCoupon) / 100);
    }

    // Método para calcular el total
    calculateTotal(): number {
      return this.cartInfo.cart.totalPrice + Number( this.shippingOption) - this.calculateDiscount();
    }

    get countProducts() {
      return this.CartService.cartInfo.cart.totalProducts;
    }

    get productsCart() {
      return this.CartService.cartInfo.cart.items;
    }

    get cartInfo() {
      return this.CartService.cartInfo;
    }



}
