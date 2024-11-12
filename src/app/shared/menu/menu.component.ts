import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { CategoriesService } from '../../services/categories.service'
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { TruncatePipe } from '../../pipe/truncate.pipe';
import { Item } from '../../interfaces/cart.interface';
import { FormsModule } from '@angular/forms';
import { AlgoliaService } from '../../services/algolia.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    TruncatePipe
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  image = 'assets/rosa.png';
  items : MenuItem[] | undefined;
  hideCartPreview : boolean = true;
  viewCart : boolean = false;
  query : string = '';
  hidecontainer : boolean = false;
  results : any = [];

  constructor(
    private categoriesService : CategoriesService,
    private router : Router,
    private CartService : CartService,
    private AlgoliaService : AlgoliaService,
    private render : Renderer2,
    private el : ElementRef
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkCurrentRoute();
      }
    });
  }

  ngOnInit() {
    this.checkCurrentRoute();

    this.render.listen('window', 'click', (e) => {
      if ( !this.el.nativeElement.contains(e.target) ) {
        this.results = [];
        this.hidecontainer = true;
      }
    });





    const token = localStorage.getItem('token');

    this.categoriesService.getCategories(token!).subscribe( resp => {

      this.items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: (event) => this.goToHome()
        },
        {
            label: 'Categorias',
            // icon: 'pi pi-star',
            items: [
              // {
              //     label: 'Categoria 1',
              //     // icon: 'pi pi-bolt',
              //     // shortcut: '⌘+S'
              // },
              // {
              //     label: 'Categoria 2',
              //     // icon: 'pi pi-server',
              //     // shortcut: '⌘+B'
              // },
              // {
              //     label: 'Categoria 3',
              //     // icon: 'pi pi-pencil',
              //     // shortcut: '⌘+U'
              // },
          ]
        },
        {
            label: 'Historial',
            // icon: 'pi pi-search',
            command: (event) => this.goToHistory()
        },
        {
            label: 'Usuario',
            // icon: 'pi pi-envelope',
            // badge: '3'
        },
        {
          label : 'Salir',
          icon : 'pi pi-outdoor'
        }
    ];

      if (this.items && this.items[1]) {
        this.items[1].items = resp.categories.map(category => ({
          label: category.name_category,
          icon: 'pi pi-tag', // or any other icon you want to use,
          category_id : category.id,
          command: (event) => this.onMenuItemClick(event)
        }));
      }
    })
}

private checkCurrentRoute(): void {
  const currentRoute = this.router.url;
  if (currentRoute === '/home/checkout') {
    this.viewCart = true;
  } else {
    this.viewCart = false;
  }
}

onMenuItemClick(item: any) {

  if (item.category_id) {
    console.log('id_category', item.category_id);
    this.router.navigateByUrl(`/home/products?category=${item.category_id}`, { skipLocationChange: true,  });
  }
}

goToHome() {
  this.router.navigateByUrl('/home');
}
goToHistory() {
  this.router.navigateByUrl('/home/history');
}

deleteItemCartByProductId(item: Item) {
  const user = localStorage.getItem('uid');
  const token = localStorage.getItem('token');

  const body = {
    userId : Number(user),
    productId : item.sku
  }


  this.CartService.deleteItemById(body, token! ).subscribe( resp => {

    //TODO : mostrar mensaje de exito

    this.CartService.getCartByUser(body, token!)
  });

}

handleMenuCart(e: Event) {

e.preventDefault();
  this.hideCartPreview = !this.hideCartPreview;
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

goToCheckout() {


  if (this.CartService.cartInfo.cart.totalProducts < 1) {
    console.log('no hay productos en el carrito');
    return;

  }
  this.hideCartPreview = true;
  this.router.navigate(['/home/checkout'], {});
}

handleSearch() {


  const trimmedQuery = this.query.trim();

  if (trimmedQuery.length > 0) {
    if ( trimmedQuery.trim().length >= 3 ) {
      this.AlgoliaService.search(trimmedQuery).then( (resp : any) => {

        this.hidecontainer = false;

        this.results = resp.hits.map((hit : any) => {
          return {
            ...hit,
            quantity : 1
          }
        });
      }).catch( (err:any) => {
        console.log('err', err);
      });
    }else {
      this.results = [];
    }
  }else {
    this.results = [];
  }

}

cleanSearch () {
  this.query = '';
  this.results = [];
}

onScape() {
  this.results = [];
  this.query = '';
}


}
