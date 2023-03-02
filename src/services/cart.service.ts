import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';

import { ICart } from '../interfaces/interfaces.model';
import CartModel from '../models/Cart.model';
import ProductModel from '../models/Product.model';

class CartService {
   getAllCarts = async (): Promise<object> => {
      try {
         const data = await CartModel.find({});
         return { status: 'Find all success', data };
      } catch (err: any) {
         throw new Error(err);
      }
   };
   createACart = async (
      id: Schema.Types.ObjectId | string,
      cookies: Request['cookies'],
      data: any
   ): Promise<object> => {
      try {
         console.log(cookies);
         const quantityBody = data.quantity;
         const product = await ProductModel.findOne({ _id: id });
         if (!product) throw new Error('Product not found');
         const price = product.price;
         if (
            Object.keys(cookies).length > 0 &&
            Object.hasOwn(cookies, 'cart')
         ) {
            const cartId = cookies.cart;
            const cart = await CartModel.findById(cartId);
            if (!cart) throw new Error('Cart not found');
            const oldPrice = cart.total_price;
            // check xem giỏ hàng đã có sản phẩm đó chưa
            // nếu có rồi thì tăng số lượng lên 1
            // nếu chưa có thì thêm sản phẩm vào giỏ hàng
            const product = await CartModel.findById(cartId).elemMatch(
               'products',
               { product: id }
            );

            let result: any;
            if (product) {
               // lay quantity cua product do ra roi tang len 1
               const quantity = product.products.find(
                  p => p.product == id
               )?.quantity;
               const newQuantity = quantity + quantityBody;

               result = await CartModel.findByIdAndUpdate(
                  cartId,
                  {
                     $set: {
                        'products.$.quantity': newQuantity,
                        total_price: price * quantityBody + oldPrice,
                     },
                  },
                  { returnDocument: 'after' }
               ).elemMatch('products', { product: id });
            } else {
               // chưa có sản phẩm trong giỏ hàng
               result = await CartModel.findByIdAndUpdate(
                  cartId,
                  {
                     $push: {
                        products: {
                           product: id,
                           quantity: quantityBody,
                        },
                     },
                     total_price: price * quantityBody + oldPrice,
                  },
                  { returnDocument: 'after' }
               );
            }
            return { status: 'Update success', result };
         }
         // chưa có giỏ hàng
         const result = await CartModel.create({
            products: [
               {
                  product: id,
                  quantity: quantityBody,
               },
            ],
            total_price: price * quantityBody,
         });
         return { status: 'Create success', result, cookieValue: result._id };
      } catch (err: any) {
         console.log(err);
         throw new Error(err);
      }
   };
   updateACart = async (
      id: Schema.Types.ObjectId | string,
      data: ICart
   ): Promise<object> => {
      return {};
   };
   deleteACart = async (
      id: Schema.Types.ObjectId | string
   ): Promise<object> => {
      return {};
   };
   getACart = async (id: Schema.Types.ObjectId | string): Promise<object> => {
      return {};
   };
}

export default new CartService();
