import ProductModel from '../models/Product.model';

class ProductService {
   getAllProducts = async (): Promise<object> => {
      try {
         const products = ProductModel.find({});
         return products;
      } catch (err: any) {
         throw new Error(err);
      }
   };
}

export default new ProductService();
