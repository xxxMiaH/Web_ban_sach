import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
   {
      // không đăng nhập hệ thống sử dụng session lưu trữ thông tin giỏ hàng
      // đăng nhập hệ thống sử dụng user_id lưu trữ thông tin giỏ hàng
      user_id: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      },
      session_id: {
         type: Schema.Types.ObjectId,
         default: '',
      },
      // thông tin sản phẩm trong giỏ hàng
      products: [
         {
            product_id: {
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
      // trạng thái giỏ hàng
      status: {
         type: String,
         enum: ['pending', 'completed', 'cancelled'],
         default: 'pending',
      },
   },
   {
      timestamps: true,
   }
);

export default model('Cart', CartSchema);
