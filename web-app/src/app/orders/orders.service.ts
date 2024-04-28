import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { orders } from './mock';


@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) {}

  getOrders() {
    return of(orders)
  }

  getOrderFromWeb() {
    return this.http.get<any>('/api/order/1');
  }
 
}