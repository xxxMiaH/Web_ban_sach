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
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.default.getAllProducts();
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(500).send(err.message);
            }
        });
        this.createAProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.default.createAProduct(req.body);
                return res.status(200).json(result);
            }
            catch (err) {
                console.log(err.message);
                return res.status(500).send(err.message);
            }
        });
        this.updateAProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.default.updateAProduct(req.params.id, req.body);
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(500).send(err.message);
            }
        });
        this.deleteAProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.default.deleteAProduct(req.params.id);
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(500).send(err.message);
            }
        });
        this.getAProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.default.getAProduct(req.params.id);
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(500).send(err.message);
            }
        });
    }
}
exports.default = new ProductController();
