import { IProduct } from './../interfaces/interfaces.model';
import { Schema } from 'mongoose';
declare class ProductService {
    getAllProducts: () => Promise<object>;
    createAProduct: (data: IProduct) => Promise<object>;
    updateAProduct: (paramsId: string | Schema.Types.ObjectId, data: IProduct) => Promise<object>;
    deleteAProduct: (paramsId: string | Schema.Types.ObjectId) => Promise<object>;
    getAProduct: (paramsId: string | Schema.Types.ObjectId) => Promise<object>;
}
declare const _default: ProductService;
export default _default;
