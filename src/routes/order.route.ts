import express, { Request, Response } from 'express';
const router = express.Router();

import OrderController from '../controllers/order.controller';


router.get(('/statistics'),OrderController.getProductOrder)
router
   .route('/')
   .get(OrderController.getAllOrder)
   .post(OrderController.createOrder);
router
   .route('/:id')
   .get(OrderController.getAOrder)
   .patch(OrderController.updateAOrder)
   .delete(OrderController.deleteAOrder);
export const orderRouter = router;
