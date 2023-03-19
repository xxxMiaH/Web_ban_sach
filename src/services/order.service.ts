import { config } from 'dotenv';
config();
import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';

import CartModel from '../models/Cart.model';
import OrderModel from '../models/Order.model';

import webhookUtil from '../utils/webhook.util';

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

   deleteAOrder = async (
      id: Schema.Types.ObjectId | string
   ): Promise<object> => {
      try {
         const order = await OrderModel.findById(id);
         // let results
         if (!order) {
            throw new Error('Something went wrong! Please try again later!');
         }
         const deleteOder = await OrderModel.findByIdAndDelete(id);
         return {
            deleteOder,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };

   getAOrder = async (
      id: Schema.Types.ObjectId | string,
      data: any
   ): Promise<object> => {
      try {
         const order = await (
            await OrderModel.findById(id)
         ).populate('products.product');
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

   updateAOrder = async (
      id: Schema.Types.ObjectId | string,
      data: any
   ): Promise<object> => {
      try {
         const order = await OrderModel.findById(id);
         // let results
         if (!order) {
            throw new Error('Something went wrong! Please try again later!');
         }
         const updateOder = await OrderModel.findByIdAndUpdate(id, data);
         return {
            updateOder,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };
}

export default new OrderService();
