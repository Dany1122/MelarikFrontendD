import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/products.interface';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { TruncatePipe } from '../../../pipe/truncate.pipe';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TruncatePipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];

    constructor(
      private router : ActivatedRoute,
      private ProductsService : ProductsService,
      private CartService : CartService
    ) { }

    ngOnInit(): void {
      this.router.queryParams.subscribe( params => {
        const token = localStorage.getItem('token');
        const body = {
          category_id : Number(params['category'])
        }
        this.ProductsService.getProductsByCategory( token!, body).subscribe( resp => {
          console.log('este es un log de productos', resp);

          const products = resp.products.map( product => {
            return {
              ...product,
              quantity : 1
            }
          });
          this.products = products;
        });
      });

    }

    addToCart( product : Product ) {
      console.log('este es un log de producto', product);

      const uid = Number(localStorage.getItem('uid'));
      const token = localStorage.getItem('token');

      const body = {
        userId : uid,
        productId : product.id,
        quantity : product.quantity,
      }
      console.log('este es un log de body', body);


      this.CartService.addToCart(body,token!).subscribe( resp => {
        console.log('este es un log de respuesta de agregar productos', resp);

        //TODO : mostrar mensaje de exito

        this.CartService.getCartByUser(body,token!)


      })



    }
}
