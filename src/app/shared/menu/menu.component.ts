import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';

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

  ngOnInit() {
    this.items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home'
        },
        {
            label: 'Categorias',
            // icon: 'pi pi-star',
            items: [
              {
                  label: 'Categoria 1',
                  // icon: 'pi pi-bolt',
                  // shortcut: '⌘+S'
              },
              {
                  label: 'Categoria 2',
                  // icon: 'pi pi-server',
                  // shortcut: '⌘+B'
              },
              {
                  label: 'Categoria 3',
                  // icon: 'pi pi-pencil',
                  // shortcut: '⌘+U'
              },
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
}


}
