import express from 'express';
const router = express.Router();

import WebhookController from '../controllers/webhook.controller';

router
   .route('/handler-bank-transfer')
   .post(WebhookController.handlerBankTransfer);
router.route('/users-paid').post(WebhookController.usersPaid);
router.route('/register-webhook').post(WebhookController.registerWebhook);
export const webhookRouter = router;
