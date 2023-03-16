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
         return res.status(500).json(err.message);
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
            // Kiem tra xem co cookieValue trong result khong (hàm thay thế khác: Object.keys(result).includes('cookieValue'), Object.hasOwn(result, 'cookieValue'))
            if (process.env.NODE_ENV === 'production') {
               res.cookie('cart', result.cookieValue, {
                  // domain: 'api-ebook.cyclic.app',
                  sameSite: 'none',
                  // path: '/',
                  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
                  httpOnly: true,
                  secure: true,
               });
            } else {
               res.cookie('cart', result.cookieValue, {
                  // domain: 'api-ebook.cyclic.app',
                  sameSite: 'none',
                  // path: '/',
                  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
                  httpOnly: true,
                  secure: false,
               });
            }
            return res.status(200).json(result);
         } else {
            return res.status(201).json(result);
         }
      } catch (err: any) {
         console.log(err.message);
         return res.status(500).json(err.message);
      }
   };

   updateACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.updateACart(req.cookies, req.body);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).json(err.message);
      }
   };

   deleteACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const data = await CartService.deleteACart(req.body, req.cookies);

         for (let entry of Object.entries(data)) {
            const [key, value] = entry;
            if (key === 'result' && Object.keys(value).length === 0) {
               res.clearCookie('cart');
            }
         }
         return res.status(200).json(data);
      } catch (err: any) {
         return res.status(500).json(err.message);
      }
   };

   getACart = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await CartService.getACart(req.cookies);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).json(err.message);
      }
   };
}

export default new CartController();
