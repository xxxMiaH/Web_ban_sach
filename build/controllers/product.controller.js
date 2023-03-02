"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    getAllProducts = async (req, res) => {
        try {
            const result = await product_service_1.default.getAllProducts();
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    };
    createAProduct = async (req, res) => {
        try {
            const result = await product_service_1.default.createAProduct(req.body);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
    };
    updateAProduct = async (req, res) => {
        try {
            const result = await product_service_1.default.updateAProduct(req.params.id, req.body);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    };
    deleteAProduct = async (req, res) => {
        try {
            const result = await product_service_1.default.deleteAProduct(req.params.id);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    };
    getAProduct = async (req, res) => {
        try {
            const result = await product_service_1.default.getAProduct(req.params.id);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
    };
}
exports.default = new ProductController();
