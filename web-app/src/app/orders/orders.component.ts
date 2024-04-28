import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from '../models/data.models';

@Component({
  selector: 'web-app-orders',
  styles: [`
   
  `],
  template: `
   
   <div class="row">
    <div class="col-md-12">
      <h2>Your Orders</h2>
      <div id="orders"></div>
    </div>
  </div>
  <ul>
    <li *ngFor="let order of orders">
      {{order.description}} (Total: {{order.total | currency:'GBP':'symbol':'1.2-2'}})
      <ul>
        <li *ngFor="let orderProduct of order.orderProducts">
          {{orderProduct.product.name}}
          {{orderProduct.product.name}} ({{orderProduct.quantity}} &#64; {{orderProduct.price  | currency:'GBP':'symbol':'1.2-2'}}/ea)
        </li>
      </ul>
    </li>
  </ul>
  `,
})
export class OrderComponent implements OnInit  {
  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
      this.ordersService.getOrders().subscribe((orders) => {
       this.orders = orders;
      this.orders = this.calculateTotal(this.orders);
      });
    }

      calculateTotal(orders: Order[]): Order[] {
        return orders.map(o => ({
          ...o,
          total: o.orderProducts.reduce((acc, op) => acc + op.price * op.quantity, 0)
        }));
    }
  
}
