
export const router = app => {
   app.use('/', (req, res) => {
      res.send('Hello World!');
   });
};
