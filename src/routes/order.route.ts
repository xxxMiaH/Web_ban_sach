import express, { Request, Response } from 'express';
const router = express.Router();

import OrderController from '../controllers/order.controller';

router.route('/statistics').get(OrderController.getProductOrder);
router
   .route('/:id')
   .get(OrderController.getAOrder)
<<<<<<< HEAD
   .patch(OrderController.updateAOrder)
   .delete(OrderController.deleteAOrder)
=======
   .put(OrderController.updateAOrder)
   .delete(OrderController.deleteAOrder);
>>>>>>> 9fadc6c19d085fdfef61f6bc3a1515107c89fec6
router
   .route('/')
   .get(OrderController.getAllOrder)
   .post(OrderController.createOrder);
export const orderRouter = router;
