const { Schema, model } = require('mongoose');
const OrderSchema = new Schema({
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
    // thông tin sản phẩm trong giỏ hàng
    products: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
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
        default: Date.now,
    },
    // ngày hủy đơn hàng
    canceled_date: {
        type: Date,
        default: Date.now,
    },
    // ngày hoàn thành đơn hàng
    completed_date: {
        type: Date,
        default: Date.now,
    },
    // ngày tạo đơn hàng
    created_date: {
        type: Date,
        default: Date.now,
    },
});
