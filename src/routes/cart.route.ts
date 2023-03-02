import express from 'express';
const router = express.Router();

import CartController from '../controllers/cart.controller';

router.route('/').get((req, res) => {
   res.send('Cart route');
});
router.route('/:id').post(CartController.createACart);

export const cartRouter = router;
