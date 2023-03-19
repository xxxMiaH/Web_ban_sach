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

         const caseInsensitive = false;
         const indexEBOOK = 'ND:EBOOKIiFFSK; tai iPay'.indexOf('EBOOK');
         const captcha = 'ND:EBOOKIiFFSK; tai iPay'.substring(
            indexEBOOK + 5,
            indexEBOOK + 11
         );
         // Ở đây mình ở sử dụng regex để parse nội dung chuyển khoản có chứa orderId
         if (!captcha) return null;
         let re = new RegExp('EBOOK');
         if (!caseInsensitive) re = new RegExp('EBOOK', 'i');
         let matchPrefix = captcha.match(re);
         // Không tồn tại tiền tố giao dịch
         if (!matchPrefix) return null;
         let orderId = parseInt(
            captcha.substring('EBOOK'.length, captcha.length)
         );
         console.log(orderId);
         const order = data.find((order) => {
            console.log(order.captcha.substring(5));
            if (order.captcha.substring(5) === 'qwe123') {
               return order;
            }
         });
         console.log(order);
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
