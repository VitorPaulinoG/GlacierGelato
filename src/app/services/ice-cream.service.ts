import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IceCream } from '../models/IceCream';
import { Observable, of, first, tap } from 'rxjs';
import { PaginatedResult } from '../models/interfaces/IPaginatedResult';
import { IceCreamFilter } from '../models/IceCreamFilter';

@Injectable({
  providedIn: 'root'
})
export class IceCreamService {
  private API_URL = 'http://localhost:3000/iceCreams';

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<IceCream[]> {
    return this.httpClient.get<IceCream[]>(this.API_URL);
  }
  
  getPaginated(limit: number, offset: number): Observable<PaginatedResult<IceCream>>{
    let params = new HttpParams();
    // return this.httpClient.get<PaginatedResult<IceCream>>(this.API_URL + `?_page=${offset}&_per_page=${limit}`);

    params = params.set('_page', offset).set('_per_page', limit);


    return this.httpClient.get<PaginatedResult<IceCream>>(this.API_URL, {params});
  }
  
  getFilteredAndSortedAndPaginated(filters: IceCreamFilter, limit: number, offset: number): Observable<PaginatedResult<IceCream>> {
    let params = new HttpParams();
    
    if(filters.name) {
      params = params.set('name', filters.name);
    }

    if(filters.operator && filters.price) {
      let op: string = '';

      switch(filters.operator) {
        case '>': 
          op = '_gt';
        break;
        case '>=':
          op = '_gte';
        break;
        case '<':
          op = '_lt';
        break;
        case '<=':
          op = '_lte';  
        break;
        default: 
          op = '_ '
      }
      params = params.set(`price${op}`, filters.price);
    }

    console.log(filters.sort)
    if(filters.sort) {
      params = params.set('_sort', filters.sort);
    }

    params = params.set('_page', offset).set('_per_page', limit);


    return this.httpClient.get<PaginatedResult<IceCream>>(this.API_URL, { params });

  }

  getById(id:string):Observable<IceCream | undefined> {
    return this.httpClient.get<IceCream>(this.API_URL + `/${id}`);
  }

  add(iceCream: IceCream) {
    return this.httpClient.post<IceCream>(this.API_URL, iceCream);
  }

  update(id:string, iceCream: IceCream) {
    return this.httpClient.put<IceCream>(this.API_URL + `/${id}`, iceCream);
  }

  delete(id:string) {
    return this.httpClient.delete(this.API_URL + `/${id}`);
  }
}
