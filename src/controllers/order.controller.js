// import { Request, Response } from "express";
// import { config } from "dotenv";
// config();
import OrderModel from "../models/Order.model";

class OrderController {
    addOrder= async(req, res) =>{
        try{
          
        }
        catch(err){
            return res.status(500).json({message: err.message});
        }

    }
}

export default new OrderController;