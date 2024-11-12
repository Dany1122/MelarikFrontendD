import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from '../../environments/environment';
import { CreateOrderInterface, ResponseCreateOrderInterface } from '../interfaces/create-order.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private http : HttpClient
  ) { }

  createOrder( token : string, body : CreateOrderInterface ) {
    return this.http.post<ResponseCreateOrderInterface>(`${environmnet.ENV_URL}/api/order/create`, body, {
      headers : {
        'x-token' : token
      }
    });
  }

}
