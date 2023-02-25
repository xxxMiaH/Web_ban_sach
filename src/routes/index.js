import { cartRouter } from './cart.route';
import { productRouter } from './product.route';
import { orderRouter } from './order.route';

export const routes = app => {
   app.use('/api/cart', cartRouter);
   app.use('/api/product', productRouter);
   app.use('/api/order', orderRouter);

   app.use('/api/post', (req, res) => {
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
