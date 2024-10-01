import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProductsByCategory( token : string, body : {} ) : Observable <ProductsInterface> {
    return this.http.post<ProductsInterface>(`${environmnet.ENV_URL}/api/products/getByCategory`, body, {
      headers : {
        'x-token' : token
      }
    })
  }
}
