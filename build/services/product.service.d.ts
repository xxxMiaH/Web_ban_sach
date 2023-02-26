import { IProduct } from './../interfaces/interfaces.model';
declare class ProductService {
    getAllProducts: () => Promise<object>;
    createAProduct: (data: IProduct) => Promise<object>;
}
declare const _default: ProductService;
export default _default;
