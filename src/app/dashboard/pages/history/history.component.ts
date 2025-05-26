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
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'], // 🔁 Usa "styleUrls" con arreglo
})
export class HistoryComponent implements OnInit {

  dataHistory: ResponseHistoryInterface = {
    orders: [],
    msg: '',
    success: false
  };

  constructor(
    private HistoryService: HistoryService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    const body = {
      userId: Number(uid)
    };

    this.getHistory(token!, body);
  }

  getHistory(token: string, body: {}) {
    this.HistoryService.getHistory(token, body).subscribe((data) => {
      this.dataHistory = {
        ...data,
        orders: data.orders.map(order => ({
          ...order,
          showProducts: false // ✅ añadimos propiedad para mostrar productos
        }))
      };
    });
  }

  trackByIndex(index: number, item: any): number {
    return item?.id ?? index;
  }
}
