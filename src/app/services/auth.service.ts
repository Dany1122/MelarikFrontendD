import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient
   ) { }

  login( body : any ):Observable<any> {
    return this.http.post<any>(`${environmnet.ENV_URL}/api/auth`, body );
  }

  validateToken( token : string ):Observable<any> {
    return this.http.post<any>(`${environmnet.ENV_URL}/api/auth/validateToken`, { token });
  }


}
