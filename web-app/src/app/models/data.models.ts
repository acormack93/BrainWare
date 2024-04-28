export interface Company {
  company_id: number;
  name: string;
}

export interface Order {
  order_id: number;
  description: string;
  company_id: number;
  orderProducts: OrderProduct[];
  total?: number
}

export interface OrderProduct {
  order_id: number;
  product_id: number;
  price: number;
  quantity: number;
  product: Product;
}

export interface Product {
  product_id: number;
  name: string;
  price: number;
}