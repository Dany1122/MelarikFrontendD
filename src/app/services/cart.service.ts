import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from '../../environments/environment';
import { CartInterface } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  cartInfo : CartInterface = {
    cart : {
      items : [],
      totalProducts : 0,
      totalPrice : 0
    },
    msg : '',
    success : true,
  } ;


  addToCart( body : any, token : string ) {
    return this.http.post(`${environmnet.ENV_URL}/api/cart/add`, body,{
      headers : {
        'x-token' : token
      }
    });
  }

  getCartByUser( body : any, token : string ) {
    return this.http.post<CartInterface>(`${environmnet.ENV_URL}/api/cart/getCartByUserId`,body ,{
      headers : {
        'x-token' : token
      }
    }).subscribe( resp => {
      this.cartInfo = resp;
    });
  }

  deleteItemById( body : any, token : string ) {
    return this.http.post<CartInterface>(`${environmnet.ENV_URL}/api/cart/deleteItemCartById`,body ,{
      headers : {
        'x-token' : token
      }
    });
  }

}
