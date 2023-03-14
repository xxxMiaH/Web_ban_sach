import express, { Request, Response } from 'express';
const router = express.Router();

import OrderController from '../controllers/order.controller';

router.route('/').get(OrderController.getAOrder);

export const orderRouter = router;
