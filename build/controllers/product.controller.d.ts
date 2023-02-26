import { Response, Request } from 'express';
declare class ProductController {
    getAllProducts: (req: Request, res: Response) => Promise<Response>;
    createAProduct: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: ProductController;
export default _default;
