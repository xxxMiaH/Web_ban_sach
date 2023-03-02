import { Express, Request, Response } from 'express';
import { cartRouter } from './cart.route';
import { productRouter } from './product.route';
import { orderRouter } from './order.route';

export const routes = (app: Express) => {
   app.use('/api/carts', cartRouter);
   app.use('/api/products', productRouter);
   app.use('/api/orders', orderRouter);

   app.use('/api/post', (req: Request, res: Response) => {
      res.cookie('token', '123456789', { httpOnly: true, maxAge: 10 * 1000 });
      res.send('Set cookie success');
   });

   app.use('/api/get', (req, res) => {
      const token = req.cookies.token;
      res.send(token);
   });
   app.use('/', (req, res) => {
      res.send('Hello World!');
   });
};
