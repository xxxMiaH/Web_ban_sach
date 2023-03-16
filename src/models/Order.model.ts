import { IOrder } from '../interfaces/interfaces.model';
import { Schema, model } from 'mongoose';

const OrderSchema = new Schema<IOrder>(
   {
      // thông tin khách hàng
      customer: {
         name: {
            type: String,
            required: true,
         },
         phone: {
            type: String,
            required: true,
         },
         email: {
            type: String,
            required: true,
         },
         address: {
            type: String,
            required: true,
         },
         note: {
            type: String,
            default: null,
         },
      },
      // Sản phẩm, số lượng sản phẩm
      products: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: 'Product',
            },
            quantity: {
               type: Number,
               default: 0,
            },
         },
      ],
      // tổng tiền giỏ hàng
      total_price: {
         type: Number,
         default: 0,
      },
      captcha: {
         type: String,
         required: true,
         default: null,
      },
      // trạng thái đơn hàng
      status: {
         type: String,
         enum: ['pending', 'shipping', 'completed', 'canceled'],
         default: 'pending',
      },
      // ngày giao hàng
      delivery_date: {
         type: Date,
         default: null,
      },
      // ngày hủy đơn hàng
      canceled_date: {
         type: Date,
         default: null,
      },
      // ngày hoàn thành đơn hàng
      completed_date: {
         type: Date,
         default: null,
      },
   },
   {
      timestamps: true,
   }
);

export default model<IOrder>('Order', OrderSchema);
