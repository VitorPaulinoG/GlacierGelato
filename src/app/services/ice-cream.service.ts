import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IceCream } from '../models/IceCream';
import { Observable, of, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IceCreamService {
  private API_URL = 'http://localhost:3000/iceCreams';

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<IceCream[]>{
    return this.httpClient.get<IceCream[]>(this.API_URL);
  }

  getById(id:number):Observable<IceCream | undefined> {
    return this.httpClient.get<IceCream>(this.API_URL + `/${id}`);
  }

  add(iceCream: IceCream) {
    return this.httpClient.post<IceCream>(this.API_URL, iceCream);
  }

  update(id:number, iceCream: IceCream) {
    return this.httpClient.put<IceCream>(this.API_URL + `/${id}`, iceCream);
  }

  delete(id:number) {
    return this.httpClient.delete(this.API_URL + `/${id}`);
  }
}
