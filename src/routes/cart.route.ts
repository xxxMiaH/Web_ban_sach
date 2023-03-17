import express from 'express';
const router = express.Router();

import CartController from '../controllers/cart.controller';

router.route('/getAll').get(CartController.getAllCarts);
router
   .route('/')
   .get(CartController.getACart)
   .put(CartController.updateACart)
   .delete(CartController.deleteACart);
router.route('/:id').post(CartController.createACart);

export const cartRouter = router;
