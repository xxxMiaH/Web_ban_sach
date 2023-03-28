import express from 'express';
const router = express.Router();

import CartController from '../controllers/cart.controller';

router.route('/getAll').get(CartController.getAllCarts);
router.route('/:id').post(CartController.createACart);
router
   .route('/')
   .get(CartController.getACart)
   .put(CartController.updateACart)
   .delete(CartController.deleteACart);

export const cartRouter = router;
