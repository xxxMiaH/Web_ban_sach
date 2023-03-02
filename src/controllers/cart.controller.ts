import { Request, Response } from 'express';
import { config } from 'dotenv';
config();

import CartService from '../services/cart.service';

class CartController {
   getAllCarts = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.getAllCarts();
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };

   createACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.createACart(
            req.params.id,
            req.cookies,
            req.body
         );
         if ('cookieValue' in result) {
            // kiem tra xem co cookieValue trong result khong (hàm thay thế khác: Object.keys(result).includes('cookieValue'), Object.hasOwn(result, 'cookieValue'))
            res.cookie('cart', result.cookieValue, {
               maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production' ? true : false,
            });
         }
         return res.status(200).json(result);
      } catch (err: any) {
         console.log(err.message);
         return res.status(500).send(err.message);
      }
   };

   updateACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.updateACart(req.params.id, req.body);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };

   deleteACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.deleteACart(req.params.id);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };

   getACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.getACart(req.params.id);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };
}

export default new CartController();
