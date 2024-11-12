import { Injectable } from '@angular/core';
import  algoliasearch  from 'algoliasearch';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  client : any;
  index : any;
  constructor() {
    this.client = algoliasearch('V7BCYI9PAQ', '95776ea251b691781e0ea3867e3a1883');
    this.index = this.client.initIndex('prueba_index');
  }


  search( query : string ) {
    return this.index.search(query,{
      attributesToHighlight : ['name_product'],
    });
  }

  searchPage( query : string, page : number, hitsPerPage : number ) {
    return this.index.search( query, {page, hitsPerPage});
  }

}
