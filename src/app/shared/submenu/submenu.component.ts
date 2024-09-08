import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css',
})
export class SubmenuComponent { }
