import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export const connectDB = async () => {
   try {
      const isConnect = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });

      if (isConnect) {
         console.log('MongoDB connected');
      } else {
         console.log('MongoDB not connected');
         process.exit(1);
      }
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};
