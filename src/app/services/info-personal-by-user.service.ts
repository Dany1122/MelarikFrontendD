import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from '../../environments/environment';
import { InfoPeronalByUserInterface } from '../interfaces/info-peronal-by-user.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPersonalByUserService {

  constructor(
    private htpp : HttpClient
  ) { }

  getInfoPersonalByUser( token : string, body : {} ) {
    return this.htpp.post<InfoPeronalByUserInterface>(`${environmnet.ENV_URL}/api/user/getUserById`, body, {
      headers : {
        'x-token' : token
      }
    });
  }

}
