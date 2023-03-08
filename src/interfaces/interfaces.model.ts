import { Schema } from 'mongoose';

export interface ICart {
   products: [
      {
         product: Schema.Types.ObjectId;
         quantity: number;
      }
   ];
   total_price: number;
}

export interface IProduct {
   name: string;
   author: string;
   introduction: string;
   description: string;
   price: number;
   images: string[];
   category: string;
   stock: number;
}

export interface IOrder {
   customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
   };
   products: [
      {
         product: Schema.Types.ObjectId;
         quantity: number;
      }
   ];
   total_price: number;
   status: string;
   delivery_date: Date;
   canceled_date: Date;
   completed_date: Date;
}
