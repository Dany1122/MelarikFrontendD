import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent { }
