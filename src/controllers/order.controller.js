// import { Request, Response } from "express";
import { config } from "dotenv";
config();

import OrderService from '../services/order.service';

export default new (class OrderController {
   getAOrder = async (req, res) => {
      res.send(await OrderService.getAOrder());
   };

   addOrder= async(req, res) =>{
    try{
      
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

}
})();
