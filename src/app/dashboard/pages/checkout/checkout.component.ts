import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { TruncatePipe } from '../../../pipe/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { InfoPersonalByUserService } from '../../../services/info-personal-by-user.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CheckoutService } from '../../../services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {

    constructor(
      private CartService : CartService,
      private InfoPersonalByUserService : InfoPersonalByUserService,
      private CheckoutService : CheckoutService,
      private router : Router
    ) {
    }

    deliveryType: string = '';
    shippingOption: string = '';
    selectedAddress: string = '';
    selectedCoupon : string = '';
    paymentMethod : string = '';
    address: string = '';
    nameCard : string = '';
    numberCard : string = '';
    expirationDate : string = '';
    cvv : string = '';
    shippingOptionsMap: { [key: string]: number } = {
      'Estafeta': 120,
      'DHL': 150,
      'FedEx': 200,
      'Express': 200
    };

    ngOnInit(): void {

      const token = localStorage.getItem('token');
      const user = localStorage.getItem('uid');
      const body = {
        userId: user
      };

      this.CartService.getCartByUser(body,token!, )

      this.InfoPersonalByUserService.getInfoPersonalByUser( token!, body ).subscribe((data) => {

        if ( data.success ) {
          this.address = data.user.address;
        }

      });
    }

    // Método para obtener el costo de envío
  getShippingCost(): number {
    return this.shippingOptionsMap[this.shippingOption] || 0;
  }

  // Método para calcular el descuento
  calculateDiscount(): number {
    return ((this.cartInfo.cart.totalPrice + this.getShippingCost()) * Number( this.selectedCoupon) / 100);
  }

  // Método para calcular el total
  calculateTotal(): number {
    return this.cartInfo.cart.totalPrice + this.getShippingCost() - this.calculateDiscount();
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

    handlecheckout() {
      if ( this.deliveryType == ''  ) {
        console.log('Selecciona un tipo de envío');
        alert('Selecciona un tipo de envío');
        return;
      }

      if ( this.shippingOption == '' ) {
        console.log('Selecciona una opción de envío');
        alert('Selecciona una opción de envío');
        return;
      }

      if ( this.selectedAddress == '' ) {
        console.log('Selecciona una dirección de envío');
        alert('Selecciona una dirección de envío');
        return;
      }

      if ( this.paymentMethod == '' ) {
        console.log('Selecciona un método de pago');
        alert('Selecciona un método de pago');
        return;
      }

      if ( this.paymentMethod == 'credito' || this.paymentMethod == 'debito' ) {
        if ( this.nameCard == '' || this.numberCard == '' || this.expirationDate == '' || this.cvv == '' ) {
          console.log('Completa los datos de la tarjeta');
          alert('Completa los datos de la tarjeta');
          return;
        }
      }

      const token = localStorage.getItem('token');
      const bodyGetPersonalInfo = {
        userId: localStorage.getItem('uid')
      };

      this.InfoPersonalByUserService.getInfoPersonalByUser( token!, bodyGetPersonalInfo ).subscribe((data) => {

        const body = {
          userId:           Number(localStorage.getItem('uid')),
          full_name:        data.user.name + ' ' + data.user.lastname,
          address:          this.selectedAddress,
          country:          'México',
          phone_number:     data.user.phone,
          deliveryType:     this.deliveryType,
          coupon:           this.selectedCoupon,
          paymentMethod:    this.paymentMethod,
          nameOnCard:       this.nameCard,
          creditCardNumber: this.numberCard,
          creditCardExpiry: this.expirationDate,
          creditCardCVV:    this.cvv,
          deliveryOption:   this.shippingOption
        };
        console.log('body', body);
        this.CheckoutService.createOrder(token!, body).subscribe((data) => {

          if ( data.success ) {
            alert(data.msg);
            window.location.href = '/home/history';

          } else {
            alert('Error al crear la orden');
          }
        });

      });






      console.log('Checkout');

    }





}
