"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    // thông tin khách hàng
    customer: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 0,
            },
        },
    ],
    // tổng tiền giỏ hàng
    total_price: {
        type: Number,
        default: 0,
    },
    // trạng thái đơn hàng
    status: {
        type: String,
        enum: ['pending', 'shipping', 'completed', 'canceled'],
        default: 'pending',
    },
    // ngày giao hàng
    delivery_date: {
        type: Date,
        default: null,
    },
    // ngày hủy đơn hàng
    canceled_date: {
        type: Date,
        default: null,
    },
    // ngày hoàn thành đơn hàng
    completed_date: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Order', OrderSchema);
