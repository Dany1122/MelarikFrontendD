import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];

    constructor(
      private router : ActivatedRoute,
      private ProductsService : ProductsService
    ) { }

    ngOnInit(): void {
      this.router.queryParams.subscribe( params => {
        const token = localStorage.getItem('token');
        const body = {
          category_id : Number(params['category'])
        }
        this.ProductsService.getProductsByCategory( token!, body).subscribe( resp => {
          console.log('este es un log de productos', resp);
          this.products = resp.products;
        } );
      } );

    }
}
