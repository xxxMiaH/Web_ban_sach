import OrderService from '../services/order.service';

export default new (class OrderController {
   getAOrder = async (req, res) => {
      res.send(await OrderService.getAOrder());
   };
})();
