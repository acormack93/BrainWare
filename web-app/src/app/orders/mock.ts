import { Company, Order, OrderProduct, Product } from "../models/data.models";

export const  companies: Company[] = [
  {
    company_id: 1,
    name: 'BrainWare Company',
  },
];

export const  products: Product[] = [
  {
    product_id: 1,
    name: 'Pipe fitting',
    price: 1.23,
  },
  {
    product_id: 2,
    name: '10" straight',
    price: 2.00,
  },
];

export const  orders: Order[] = [
  {
    order_id: 1,
    description: 'Our first order.',
    company_id: 1,
    orderProducts: [
      {
        order_id: 1,
        product_id: 1,
        price: 1.23,
        quantity: 10,
        product: {
          product_id: 1,
          name: 'Pipe fitting',
          price: 1.23,
        }
      },
      {
        order_id: 1,
        product_id: 3,
        price: 1.00,
        quantity: 3,
        product: {
          product_id: 3,
          name: 'Quarter turn',
          price: 0.75,
        }
      }
    ]
  },
  {
    order_id: 2,
    description: 'Our Second order.',
    company_id: 1,
    orderProducts: [
      {
        order_id: 2,
        product_id: 1,
        price: 1.23,
        quantity: 10,
        product: {
          product_id: 1,
          name: 'Pipe fitting',
          price: 1.23,
        }
      },
      {
        order_id: 2,
        product_id: 3,
        price: 1.00,
        quantity: 3,
        product: {
          product_id: 3,
          name: 'Quarter turn',
          price: 0.75,
        }
      }
    ]
  },
];
