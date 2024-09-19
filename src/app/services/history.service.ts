import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHistoryInterface } from '../interfaces/response-history.interface.';
import { environmnet } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient
  ) { }

  getHistory( userId : number ) : Observable<ResponseHistoryInterface> {
    userId = 100;
    return this.http.post<ResponseHistoryInterface>(`${environmnet.ENV_URL}/api/order/getOrderHistoryByUserId`, { userId }, {
      headers : {
        'x-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMCwibmFtZSI6IkVyaWNrIFJhbW9zIiwiaWF0IjoxNzI2NDMxNTE3LCJleHAiOjE3MjY0Mzg3MTd9.WUlJSZJ4X3gpZwsiQsoGqO3A4b1qQu_p0-XI4_3uQFw'
      }
    });
  }

}
