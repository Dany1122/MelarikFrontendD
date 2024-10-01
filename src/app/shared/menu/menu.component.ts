import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { CategoriesService } from '../../services/categories.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  image = 'assets/rosa.png';

  items : MenuItem[] | undefined;

  constructor(
    private categoriesService : CategoriesService,
    private router : Router
  ){}

  ngOnInit() {


    const token = localStorage.getItem('token');

    this.categoriesService.getCategories(token!).subscribe( resp => {
      console.log('este es un log den categories', resp);

      this.items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home'
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
        },
        {
            label: 'Usuario',
            // icon: 'pi pi-envelope',
            // badge: '3'
        },
        {
          label : 'Mis compras',
          icon : 'pi pi-shopping-cart'
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

onMenuItemClick(item: any) {

  if (item.category_id) {
    console.log('id_category', item.category_id);
    this.router.navigateByUrl(`/home/products?category=${item.category_id}`);
  }




}


}
