import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CategoriesInterface } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories( token : string ) : Observable< CategoriesInterface > {
    return this.http.post<CategoriesInterface>(`${environmnet.ENV_URL}/api/categories/getAll`, {}, {
      headers : {
        'x-token' : token
      }
    })
  }

}
