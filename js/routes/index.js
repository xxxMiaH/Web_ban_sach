"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const cart_route_1 = require("./cart.route");
const product_route_1 = require("./product.route");
const order_route_1 = require("./order.route");
const routes = app => {
    app.use('/api/cart', cart_route_1.cartRouter);
    app.use('/api/product', product_route_1.productRouter);
    app.use('/api/order', order_route_1.orderRouter);
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
exports.routes = routes;
