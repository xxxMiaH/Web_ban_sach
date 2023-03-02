"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_model_1 = __importDefault(require("../models/Product.model"));
class ProductService {
    getAllProducts = async () => {
        try {
            const products = Product_model_1.default.find({});
            return products;
        }
        catch (err) {
            throw new Error(err);
        }
    };
    createAProduct = async (data) => {
        try {
            const { name, description, introduction, images, stock, category, price, } = data;
            if (name === undefined || name === null)
                throw new Error('Name is required');
            if (description === undefined || description === null)
                throw new Error('Description is required');
            if (introduction === undefined || introduction === null)
                throw new Error('Introduction is required');
            if (images === undefined || images === null)
                throw new Error('Image is required');
            if (stock === undefined || stock === null)
                throw new Error('Stock is required');
            if (category === undefined || category === null)
                throw new Error('Category is required');
            if (price === undefined || price === null)
                throw new Error('Price is required');
            return {
                status: 'Create success',
                data: await Product_model_1.default.create(data),
            };
        }
        catch (err) {
            throw new Error(err);
        }
    };
    updateAProduct = async (paramsId, data) => {
        try {
            await Product_model_1.default.updateOne({ _id: paramsId }, data);
            return {
                status: 'Update success',
                data: await Product_model_1.default.findById(paramsId),
            };
        }
        catch (err) {
            throw new Error(err);
        }
    };
    deleteAProduct = async (paramsId) => {
        try {
            return {
                status: 'Delete success',
                data: await Product_model_1.default.deleteOne({ _id: paramsId }),
            };
        }
        catch (err) {
            throw new Error(err);
        }
    };
    getAProduct = async (paramsId) => {
        try {
            const product = await Product_model_1.default.findById(paramsId);
            if (!product)
                throw new Error('Product not found');
            return product;
        }
        catch (err) {
            throw new Error(err);
        }
    };
}
exports.default = new ProductService();
