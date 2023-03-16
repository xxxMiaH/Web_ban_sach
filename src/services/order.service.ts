import { config } from 'dotenv';
config();
import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';

import CartModel from '../models/Cart.model';
import OrderModel from '../models/Order.model';

class OrderService {
   getAllOrder = async (): Promise<object> => {
      try {
         const data = await OrderModel.find({});

         if (!data) throw new Error('Order not found');
         let orderCompleted: number = data.reduce((acc: any, cur: any) => {
            if (cur.status === 'completed') {
               acc += cur.total_price;
            }
            return acc;
         }, 0);

         let orderPending: number = data.reduce((acc: any, cur: any) => {
            if (cur.status === 'pending') {
               acc += cur.total_price;
            }
            return acc;
         }, 0);

         return {
            status: 'Successfully found all',
            orders: data || [],
            expectedRevenue: orderPending,
            actualRevenue: orderCompleted,
            reducedRevenue: orderCompleted - (orderCompleted * 30) / 100,
         };
      } catch (err: any) {
         throw new Error(err);
      }
   };

   createOrder = async (
      cookies: Request['cookies'],
      data: any
   ): Promise<object> => {
      try {
         const cartId = cookies.cart;
         const cart = await CartModel.findById(cartId);
         if (!cart) throw new Error('Cart not found');
         const oldPrice = cart.total_price;
         // let result: any;

         const cartProduct = cart.products.map((x) => {
            return x;
         });

         // const results = await OrderModel.create({
         //    ...data,
         //    products: cartProduct,
         //    total_price: oldPrice,
         // });

         const results = await OrderModel.create({
            customer: data,
            products: cartProduct,
            total_price: oldPrice,
            captcha: data.captcha,
         });
         await CartModel.findByIdAndDelete(cartId);

         return {
            status: 'Successfully create Order',
            results,
         };
      } catch (err: any) {
         console.log({ ErrorOder: err });
         throw new Error(err);
      }
   };

   updateOrder = async (data: any): Promise<object> => {
      try {
         const order = await OrderModel.findById(data.idOrder);
         // let results
         if (order) {
            var results = await OrderModel.findByIdAndUpdate(order.id, data);
         } else {
            throw new Error('Something went wrong! Please try again later!');
         }
         return {
            status: 'Successfully update Order',
            results,
            data,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };
   deleteOder = async (data: any): Promise<object> => {
      try {
         const order = await OrderModel.findById(data.id);
         // let results
         if (order) {
            var results = await OrderModel.findByIdAndDelete(order.id, data);
         } else {
            throw new Error('Something went wrong! Please try again later!');
         }
         return {
            status: 'Successfully delete Order',
            results,
            data,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };

   getAOrder = async (data: any): Promise<object> => {
      try {
         const order = await OrderModel.find(data);
         // let results
         if (!order) {
            throw new Error('Something went wrong! Please try again later!');
         }
         return {
            order,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };
}

function sortObject(obj: any) {
   let sorted: { [key: string]: string } = {};
   let str = [];
   let key;
   for (key in obj) {
      if (obj.hasOwnProperty(key)) {
         str.push(encodeURIComponent(key));
      }
   }
   str.sort();
   for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
   }
   return sorted;
}

export default new OrderService();
