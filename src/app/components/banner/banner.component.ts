import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';


@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaModule,
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  images: any[] | undefined;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  ngOnInit(): void {
    this.images = [
      {
        itemImageSrc: 'https://www.luxurylifestylemag.co.uk/wp-content/uploads/2023/07/bigstock-Makeup-Artist-Applies-Eye-Shad-470517451.jpg'

      }
    ]
  }


}
