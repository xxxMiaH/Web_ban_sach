import { IProduct } from '../interfaces/interfaces.model';
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema<IProduct>(
   {
      name: {
         type: String,
         required: true,
      },
      author: {
         type: String,
         required: true,
      },
      introduction: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      images: {
         type: [String],
      },
      stock: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export default model<IProduct>('Product', ProductSchema);
