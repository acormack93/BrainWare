import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        OrderComponent,
        OrderComponent
      ],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate total correctly', () => {
    const orders = [
      {
        id: 1,
        orderProducts: [
          { id: 1, price: 10, quantity: 2 },
          { id: 2, price: 5, quantity: 3 },
        ],
      },
      {
        id: 2,
        orderProducts: [
          { id: 3, price: 8, quantity: 4 },
          { id: 4, price: 3, quantity: 1 },
        ],
      },
    ];

    const expectedOrders = [
      {
        id: 1,
        orderProducts: [
          { id: 1, price: 10, quantity: 2 },
          { id: 2, price: 5, quantity: 3 },
        ],
        total: 35,
      },
      {
        id: 2,
        orderProducts: [
          { id: 3, price: 8, quantity: 4 },
          { id: 4, price: 3, quantity: 1 },
        ],
        total: 35,
      },
    ];

    const calculatedOrders = component.calculateTotal(orders as any);
    expect(calculatedOrders).toEqual(expectedOrders);
  });
});
