import { ObjectId,Schema } from "mongoose";
import { Request } from "express";

import { ICart } from "../interfaces/interfaces.model";
import CartModel from "../models/Cart.model";
import OrderModel from "../models/Order.model";
import ProductModel from "../models/Product.model";

export default new (class OrderService {
    createOrder = async (
        id: Schema.Types.ObjectId | string,
      cookies: Request['cookies'],
      data: any
    ): Promise<object> =>{
        try{
            const quantityBody = data.quantity;
            const product = await ProductModel.findOne({ _id: id });
            if (!product) throw new Error('Product not found');
            const price = product.price;

            // nếu đã có giỏ hàng
            if( Object.keys(cookies).length > 0 &&
            Object.hasOwn(cookies, 'cart'))
            {
                const cartId = cookies.cart;
                const cart = await CartModel.findById(cartId);
                if (!cart) throw new Error('Cart not found');
                const oldPrice = cart.total_price;
            }

            return {};
        }
        catch(err: any){
            console.log({ErrorOder: err});
            throw new Error(err);
        }
    }})();
