export const router = app => {
   app.use('/api/post', (req, res) => {
      res.cookie('token', '123456789', { httpOnly: true, maxAge: 10 * 1000 });
      res.send('Set cookie success');
   });

   app.use('/api/get', (req, res) => {
      const token = req.cookies.token;
      res.send(token);
   });
   app.use('/', (req, res) => {
      res.send('Hello World!');
   });
};
