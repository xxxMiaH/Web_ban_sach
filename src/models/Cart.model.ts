import { ICart } from '../interfaces/interfaces.model';
import { Schema, model } from 'mongoose';

const CartSchema = new Schema<ICart>(
   {
      products: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: 'Product',
            },
            quantity: {
               type: Number,
               required: true,
            },
         },
      ],
      total_price: {
         type: Number,
         required: true,
         default: 0,
      },
      captcha: {
         type: String,
         default: '',
      }
   },
   {
      timestamps: true,
   }
);

export default model<ICart>('Cart', CartSchema);
