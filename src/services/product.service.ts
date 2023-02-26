import { IProduct } from './../interfaces/interfaces.model';
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

   createAProduct = async (data: IProduct): Promise<object> => {
      try {
         const {
            name,
            description,
            introduction,
            images,
            stock,
            category,
            price,
         } = data;

         if (name === undefined || name === null)
            throw new Error('Name is required');
         if (description === undefined || description === null)
            throw new Error('Description is required');
         if (introduction === undefined || introduction === null)
            throw new Error('Introduction is required');
         if (images === undefined || images === null)
            throw new Error('Image is required');
         if (stock === undefined || stock === null)
            throw new Error('Stock is required');
         if (category === undefined || category === null)
            throw new Error('Category is required');
         if (price === undefined || price === null)
            throw new Error('Price is required');

         return await ProductModel.create(data);
      } catch (err: any) {
         throw new Error(err);
      }
   };
}

export default new ProductService();
