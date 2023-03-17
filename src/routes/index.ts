import { Express, Request, Response } from 'express';
import { cartRouter } from './cart.route';
import { productRouter } from './product.route';
import { orderRouter } from './order.route';

import path from 'path';

export const routes = (app: Express) => {
   app.use('/api/carts', cartRouter);
   app.use('/api/products', productRouter);
   app.use('/api/orders', orderRouter);

   app.use('/testpost', (req, res, next) => {
      res.sendFile(path.join(__dirname, 'index.html'));
   });

   app.use('/api/post', (req: Request, res: Response) => {
      res.cookie('token', '1234567890', {
         // domain: 'localhost',
         // path: '/',
         sameSite: 'none',
         httpOnly: true,
         maxAge: 600 * 1000,
         secure: true,
      });
      res.send('Set cookie success');
   });

   app.use('/api/get', (req, res) => {
      const token = req.cookies.token;
      res.send(token);
   });
   // app.use('/', (req, res) => {
   //    res.send('Hello World!');
   // });
};
