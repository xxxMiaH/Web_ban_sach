import express from 'express';
const router = express.Router();

import ProductController from '../controllers/product.controller';

router.route('/products').get(ProductController.getAllProducts);

export const productRouter = router;
