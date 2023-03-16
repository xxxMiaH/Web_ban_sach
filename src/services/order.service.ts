import { ObjectId,Schema } from "mongoose";
import { Request } from "express";
import shortid from "shortid";

import { ICart } from "../interfaces/interfaces.model";
import CartModel from "../models/Cart.model";
import OrderModel from "../models/Order.model";

class OrderService {

    getAllOrder = async (): Promise<object> => {
        try {
           const data = await OrderModel.find({});
           return { status: 'Successfully found all', data };
        } catch (err: any) {
           throw new Error(err);
        }
     };

    createOrder = async (
        cookies: Request['cookies'],
        data: any
    ): Promise<object> =>{
        try{

            const cartId = cookies.cart;
                const cart = await CartModel.findById(cartId);
                if (!cart) throw new Error('Cart not found');
                const oldPrice = cart.total_price;
                // let result: any;

                const cartProduct = cart.products.map((x) =>
                {
                    return x;
                })
                // const captcha = shortid.generate().slice(0, 6);
                const results = await OrderModel.create({
                    customer: data,
                    products: cartProduct,
                    total_price: oldPrice,
                    captcha: data.captcha,
                })
                let deleteCart = await CartModel.findByIdAndDelete(cartId)

                return {
                    status: "Successfully create Order",
                    results,
                    deleteCart
                    };
            // const quantityBody = data.quantity;
            // if( Object.keys(cookies).length > 0 &&
            // Object.hasOwn(cookies, 'cart'))
            // {
                
            // }
            
        }
        catch(err: any){
            console.log({ErrorOder: err});
            throw new Error(err);
        }
    };

    updateOrder = async (
        data: any): Promise<object> =>{
            try{
                const order = await OrderModel.findById(data.idOrder)
                // let results
                if(order){
                   var results = await OrderModel.findByIdAndUpdate(order.id, data )
                } 
                else{
                    throw new Error('Something went wrong! Please try again later!');
                }
                return {
                    status: "Successfully update Order",
                    results, 
                    data
                    };
                
            }
            catch (err: any) {
                console.log(err);
                throw new Error(err);
             }
        }
    deleteOder = async(data: any): Promise<object> =>{
        try{
            const order = await OrderModel.findById(data.id)
            // let results
            if(order){
               var results = await OrderModel.findByIdAndDelete(order.id, data )
            } 
            else{
                throw new Error('Something went wrong! Please try again later!');
            }
            return {
                status: "Successfully delete Order",
                results, 
                data
                };
            
        }
        catch (err: any) {
            console.log(err);
            throw new Error(err);
         }
    }

    getAOrder = async(data: any):  Promise<object> =>{
        try{
            const order = await OrderModel.find(data)
            // let results
            if(!order){
                throw new Error('Something went wrong! Please try again later!');
            }             
            return {
                order
                };
            
        }
        catch (err: any) {
            console.log(err);
            throw new Error(err);
         }
    };
    
    orderBrowsing = async(data: any): Promise<object> =>{
        try{
            const order = await OrderModel.findById(data.id)
            if(data.orderBrowsing){
              var updateStatus = await OrderModel.findByIdAndUpdate(order.id,{status: "shipping"})  
            }
            else{
                var updateStatus = await OrderModel.findByIdAndUpdate(order.id,{status: "canceled"})
            }
            if(!order){
                throw new Error('Something went wrong! Please try again later!');
            }  
            return{updateStatus}
            
        }
        catch (err: any) {
            console.log(err);
            throw new Error(err);
         }
    }

};


export default new OrderService();