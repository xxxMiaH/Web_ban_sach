import { IProduct } from './../interfaces/interfaces.model';
import { ObjectId } from 'mongoose';
declare class ProductService {
    getAllProducts: () => Promise<object>;
    createAProduct: (data: IProduct) => Promise<object>;
    updateAProduct: (paramsId: string | ObjectId, data: IProduct) => Promise<object>;
    deleteAProduct: (paramsId: string | ObjectId) => Promise<object>;
    getAProduct: (paramsId: string | ObjectId) => Promise<object>;
}
declare const _default: ProductService;
export default _default;
