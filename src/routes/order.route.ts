import express, { Request, Response } from 'express';
const router = express.Router();

import OrderController from '../controllers/order.controller';

router
   .route('/')
   .get(OrderController.getAllOrder)
   .post(OrderController.createOrder)
   .put(OrderController.updateOrder)
   .delete(OrderController.deleteOrder);

router.route('/get.a.order').get(OrderController.getAOrder);
export const orderRouter = router;
