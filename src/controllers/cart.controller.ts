import { Request, Response } from 'express';

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
         const result = await CartService.createACart(req.body);
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
