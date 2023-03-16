import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';

import { ICart } from '../interfaces/interfaces.model';
import CartModel from '../models/Cart.model';
import OrderModel from '../models/Order.model';

class OrderService {
   getAllOrder = async (): Promise<object> => {
      try {
         const data = await OrderModel.find({});

         return { status: 'Successfully found all', data: data || [] };
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
         const results = await OrderModel.create({
            ...data,
            products: cartProduct,
            total_price: oldPrice,
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
         const { orderId } = data;
         if (!orderId) throw new Error('Missing required fields');
         delete data.orderId;

         const order = await OrderModel.findByIdAndUpdate(orderId, data);
         return {
            status: 'Successfully update Order',
            order,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };
   deleteOder = async (data: any): Promise<object> => {
      try {
         const { orderId } = data;
         if (!orderId) throw new Error('Missing required fields');
         const order = await OrderModel.findByIdAndDelete(orderId);
         if (!order) throw new Error('Order not found');

         return {
            status: 'Successfully delete Order',
            order,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };

   getAOrder = async (data: any): Promise<object> => {
      try {
         const { orderId } = data;
         if (!orderId) throw new Error('Missing required fields');
         const order = await OrderModel.findById(orderId);
         if (!order) throw new Error('Order not found');

         return {
            status: 'Successfully get Order',
            order,
         };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };
}

export default new OrderService();
