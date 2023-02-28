import { Response, Request } from 'express';

import ProductService from '../services/product.service';

class ProductController {
   getAllProducts = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await ProductService.getAllProducts();
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };

   createAProduct = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await ProductService.createAProduct(req.body);
         return res.status(200).json(result);
      } catch (err: any) {
         console.log(err.message);
         return res.status(500).send(err.message);
      }
   };

   updateAProduct = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await ProductService.updateAProduct(
            req.params.id,
            req.body
         );
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };

   deleteAProduct = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await ProductService.deleteAProduct(req.params.id);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };

   getAProduct = async (req: Request, res: Response): Promise<Response> => {
      try {
         const result = await ProductService.getAProduct(req.params.id);
         return res.status(200).json(result);
      } catch (err: any) {
         return res.status(500).send(err.message);
      }
   };
}

export default new ProductController();
