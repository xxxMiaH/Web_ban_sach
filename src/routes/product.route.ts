import express from 'express';
const router = express.Router();

import ProductController from '../controllers/product.controller';

router
   .route('/')
   .get(ProductController.getAllProducts)
   .post(ProductController.createAProduct);
router
   .route('/:id')
   .patch(ProductController.updateAProduct)
   .delete(ProductController.deleteAProduct)
   .get(ProductController.getAProduct);

export const productRouter = router;
