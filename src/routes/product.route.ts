import express from 'express';
const router = express.Router();

import ProductController from '../controllers/product.controller';

router
   .route('/')
   .get(ProductController.getAllProducts)
   .post(ProductController.createAProduct);

export const productRouter = router;
