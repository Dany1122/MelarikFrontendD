import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../services/history.service';
import { ResponseHistoryInterface } from '../../../interfaces/response-history.interface.';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
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
    this.getHistory();
  }

  getHistory() {
    this.HistoryService.getHistory(100).subscribe((data) => {
      // console.log(data.orders.map((order) => order.order_items.map((item) => item.createdAt)));
      this.dataHistory = data;
    });
  }
}
