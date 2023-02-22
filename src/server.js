import express from 'express';
import { config } from 'dotenv';
config();
import { createStream } from 'rotating-file-stream';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Config path for import modules
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(cookieParser());
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
