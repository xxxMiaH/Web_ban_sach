"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_model_1 = __importDefault(require("../models/Product.model"));
class ProductService {
    constructor() {
        this.getAllProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = Product_model_1.default.find({});
                return products;
            }
            catch (err) {
                throw new Error(err);
            }
        });
        this.createAProduct = (data) => __awaiter(this, void 0, void 0, function* () {
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
                    data: yield Product_model_1.default.create(data),
                };
            }
            catch (err) {
                throw new Error(err);
            }
        });
        this.updateAProduct = (paramsId, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Product_model_1.default.updateOne({ _id: paramsId }, data);
                return {
                    status: 'Update success',
                    data: yield Product_model_1.default.findById(paramsId),
                };
            }
            catch (err) {
                throw new Error(err);
            }
        });
        this.deleteAProduct = (paramsId) => __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    status: 'Delete success',
                    data: yield Product_model_1.default.deleteOne({ _id: paramsId }),
                };
            }
            catch (err) {
                throw new Error(err);
            }
        });
        this.getAProduct = (paramsId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_model_1.default.findById(paramsId);
                if (!product)
                    throw new Error('Product not found');
                return product;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new ProductService();
