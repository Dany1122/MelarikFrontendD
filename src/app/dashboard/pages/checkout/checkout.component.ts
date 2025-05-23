import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { TruncatePipe } from '../../../pipe/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { InfoPersonalByUserService } from '../../../services/info-personal-by-user.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CheckoutService } from '../../../services/checkout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

declare var paypal: any;
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
export class CheckoutComponent implements AfterViewInit {

    constructor(
      private CartService : CartService,
      private InfoPersonalByUserService : InfoPersonalByUserService,
      private CheckoutService : CheckoutService,
      private router : Router,
      private MessageService : MessageService
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
    loadPayPalScript(): Promise<void> {
      return new Promise((resolve) => {
        if (document.getElementById('paypal-sdk')) return resolve(); // evita doble carga
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AXhQHDPvBuH7tvRJwyjJGsTfiV0P3lefu31yOpElmPXqH3XjBhgnnATbQ32WXuHx_G64H8-JfT7ECiR3&currency=MXN';
        script.onload = () => resolve();
        document.body.appendChild(script);
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
        this.MessageService.add({severity:'error', summary:'Error', detail:'Selecciona un tipo de envío'});
        return;
      }

      if ( this.shippingOption == '' ) {
        console.log('Selecciona una opción de envío');
        this.MessageService.add({severity:'error', summary:'Error', detail:'Selecciona una opción de envío'});
        return;
      }

      if ( this.selectedAddress == '' ) {
        console.log('Selecciona una dirección de envío');
        this.MessageService.add({severity:'error', summary:'Error', detail:'Selecciona una dirección de envío'});
        return;
      }

      if ( this.paymentMethod == '' ) {
        console.log('Selecciona un método de pago');
        this.MessageService.add({severity:'error', summary:'Error', detail:'Selecciona un método de pago'});
        return;
      }

      if ( this.paymentMethod == 'credito' || this.paymentMethod == 'debito' ) {
        if ( this.nameCard == '' || this.numberCard == '' || this.expirationDate == '' || this.cvv == '' ) {
          console.log('Completa los datos de la tarjeta');
          this.MessageService.add({severity:'error', summary:'Error', detail:'Completa los datos de la tarjeta'});
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
            this.MessageService.add({severity:'success', summary:'Success', detail:data.msg});
            window.location.href = '/home/history';

          } else {
            this.MessageService.add({severity:'error', summary:'Error', detail:data.msg});
          }
        });

      });
      console.log('Checkout');

    }
     ngAfterViewInit(): void {
        if (this.paymentMethod === 'paypal') {
          this.loadPayPalScript().then(() => {
            paypal.Buttons({
              createOrder: (data: any, actions: any) => {
                return fetch('/api/paypal/create-order', {
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ total: this.calculateTotal() })
                }).then(res => res.json()).then(data => data.id);
              },
              onApprove: (data: any, actions: any) => {
                return fetch('/api/paypal/capture-order', {
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ orderID: data.orderID })
                }).then(res => res.json()).then(details => {
                  this.MessageService.add({severity:'success', summary:'Pago completado', detail: `Gracias ${details.payer.name.given_name}`});
                  this.router.navigate(['/home/history']);
                });
              }
            }).render('#paypal-button-container');
          });
        }
      }
      renderPayPalButton(): void {
        this.loadPayPalScript().then(() => {
          const container = document.getElementById('paypal-button-container');
          if (container) container.innerHTML = ''; // limpia antes de renderizar

          paypal.Buttons({
            createOrder: (data: any, actions: any) => {
              return fetch('http://localhost:4000/api/paypal/create-order', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ total: this.calculateTotal() })
              }).then(res => res.json()).then(data => data.id);
            },
            onApprove: (data: any, actions: any) => {
              return fetch('http://localhost:4000/api/paypal/capture-order', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID })
              }).then(res => res.json()).then(details => {
                this.MessageService.add({
                  severity: 'success',
                  summary: 'Pago completado',
                  detail: `Gracias ${details.payer.name.given_name}`
                });
                this.router.navigate(['/home/history']);
              });
            }
          }).render('#paypal-button-container');
        });
      }

      previousPaymentMethod: string = '';
      ngDoCheck(): void {
        if (this.paymentMethod !== this.previousPaymentMethod) {
          this.previousPaymentMethod = this.paymentMethod;

          if (this.paymentMethod === 'paypal') {
            setTimeout(() => {
              this.renderPayPalButton();
            }, 0);
          }
        }
      }

      onPaymentMethodChange(method: string): void {
        if (method === 'paypal') {
          setTimeout(() => {
            this.renderPayPalButton();
          }, 0);
        }
      }

}
