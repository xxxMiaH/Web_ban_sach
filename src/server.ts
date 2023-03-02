import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import { createStream } from 'rotating-file-stream';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// Config path for import modules
import path from 'path';

import { routes } from './routes/index';
import { connectDB } from './config/connectDB';

const app = express();
const port = process.env.PORT;

connectDB().then(() => bootServer());

const bootServer = () => {
   const isProduction = process.env.NODE_ENV === 'production'; // để phân biệt dev và production
   // tạo file log theo ngày tới thư mục log trong thư mục gốc của project
   const accessLogStream = createStream('access.log', {
      interval: '1d', // rotate daily
      path: path.join(__dirname, 'log'),
   });
   app.use(
      cors({
         // credentials: true,
         // origin: 'http://localhost:5173',
         // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
         // allowedHeaders: [
         //    'Origin',
         //    'X-Requested-With',
         //    'Content-Type',
         //    'Accept',
         //    'X-Access-Token',
         //    'Authorization',
         // ],
         // preflightContinue: true,
         // optionSuccessStatus: 200,
      })
   );
   app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Max-Age', '1800');
      res.setHeader('Access-Control-Allow-Headers', 'content-type');
      res.setHeader(
         'Access-Control-Allow-Methods',
         'PUT, POST, GET, DELETE, PATCH, OPTIONS'
      );
      next();
   });
   app.use(cookieParser());
   app.use(
      isProduction
         ? morgan('combined', { stream: accessLogStream })
         : morgan('dev')
   );
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   routes(app);

   app.listen(port, () => {
      console.log(`Server running on port ${port}: http://localhost:${port}`);
   });
};
