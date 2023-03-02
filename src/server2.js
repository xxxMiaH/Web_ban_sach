const express = require('express');
const { config } = require('dotenv');
config();
const cookieParser = require('cookie-parser');
// Config path for const modules
const path = require('path');


const app = express();
const port = 3000;

const bootServer = () => {
   app.use(cookieParser());

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   app.use(express.static(path.join(__dirname, 'src')));

   app.use('/', (req, res, next) => {
      res.sendFile(path.join(__dirname, 'index.html'));
   });

   app.listen(port, () => {
      console.log(`Server running on port ${port}: http://localhost:${port}`);
   });
};

bootServer();
