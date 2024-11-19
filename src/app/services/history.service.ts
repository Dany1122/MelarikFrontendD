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

  getHistory( token: string, body : {} ) : Observable<ResponseHistoryInterface> {
    return this.http.post<ResponseHistoryInterface>(`${environmnet.ENV_URL}/api/order/getOrderHistoryByUserId`, body, {
      headers : {
        'x-token' : token
      }
    });
  }

}
