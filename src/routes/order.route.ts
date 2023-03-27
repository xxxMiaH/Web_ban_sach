import express, { Request, Response } from 'express';
const router = express.Router();

import OrderController from '../controllers/order.controller';

router.route('/statistics').get(OrderController.getProductOrder);
router
   .route('/:id')
   .get(OrderController.getAOrder)
   .put(OrderController.updateAOrder)
   .delete(OrderController.deleteAOrder);
router
   .route('/')
   .get(OrderController.getAllOrder)
   .post(OrderController.createOrder);
export const orderRouter = router;
