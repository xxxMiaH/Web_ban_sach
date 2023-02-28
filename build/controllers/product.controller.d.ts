import { Response, Request } from 'express';
declare class ProductController {
    getAllProducts: (req: Request, res: Response) => Promise<Response>;
    createAProduct: (req: Request, res: Response) => Promise<Response>;
    updateAProduct: (req: Request, res: Response) => Promise<Response>;
    deleteAProduct: (req: Request, res: Response) => Promise<Response>;
    getAProduct: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: ProductController;
export default _default;
