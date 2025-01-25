import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IceCream } from '../models/IceCream';
import { Observable, of, first, tap } from 'rxjs';
import { PaginatedResult } from '../models/interfaces/IPaginatedResult';

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
    return this.httpClient.get<PaginatedResult<IceCream>>(this.API_URL + `?_page=${offset}&_per_page=${limit}`);
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
