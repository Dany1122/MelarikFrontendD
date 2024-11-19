import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { HistoryService } from '../../../services/history.service';
import { ResponseHistoryInterface } from '../../../interfaces/response-history.interface.';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers : [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {

  dataHistory : ResponseHistoryInterface = {
    orders : [],
    msg : '',
    success : false
  };

  constructor(
    private HistoryService : HistoryService
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');

    const uid = localStorage.getItem('uid');

    const body = {
      userId : Number(uid)
    }

    this.getHistory(token!, body);
  }

  getHistory(token: string, body: {}) {
    this.HistoryService.getHistory(token,body).subscribe((data) => {
      // console.log(data.orders.map((order) => order.order_items.map((item) => item.createdAt)));
      this.dataHistory = data;
    });
  }
}
