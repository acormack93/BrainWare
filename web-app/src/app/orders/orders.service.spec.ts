import { OrdersService } from "./orders.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { orders } from "./mock";

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService],
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

  it('should return getOrderFromWeb', () => {
    service.getOrderFromWeb().subscribe((response) => {
      expect(response).toEqual(orders);
    });

    const req = httpMock.expectOne('/api/order/1');
    expect(req.request.method).toBe('GET');
    req.flush(orders);
  });
});