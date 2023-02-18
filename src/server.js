import express from 'express';
import { config } from 'dotenv';
import { createStream } from 'rotating-file-stream';
import morgan from 'morgan';
import path from 'path';
config();

import { router } from './routes/index.js';
import { connectDB } from './config/connectDB.js';

const app = express();
const port = process.env.PORT;

const isProduction = process.env.NODE_ENV === 'production'; // để phân biệt dev và production
// tạo file log theo ngày tới thư mục log trong thư mục gốc của project
const accessLogStream = createStream('access.log', {
   interval: '1d', // rotate daily
   path: path.join(__dirname, 'log'),
});
app.use(
   isProduction
      ? morgan('combined', { stream: accessLogStream })
      : morgan('dev')
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB();
router(app);

app.listen(port, () => {
   console.log(`Server running on port ${port}: http://localhost:${port}`);
});
