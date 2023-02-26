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
         console.log(err.message)
         return res.status(500).send(err.message);
      }
   };

}

export default new ProductController();
