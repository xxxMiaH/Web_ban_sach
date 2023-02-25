"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const rotating_file_stream_1 = require("rotating-file-stream");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Config path for import modules
const path_1 = __importDefault(require("path"));
const index_1 = require("./routes/index");
const connectDB_1 = require("./config/connectDB");
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, connectDB_1.connectDB)().then(() => bootServer());
const bootServer = () => {
    const isProduction = process.env.NODE_ENV === 'production'; // để phân biệt dev và production
    // tạo file log theo ngày tới thư mục log trong thư mục gốc của project
    const accessLogStream = (0, rotating_file_stream_1.createStream)('access.log', {
        interval: '1d',
        path: path_1.default.join(__dirname, 'log'),
    });
    app.use((0, cookie_parser_1.default)());
    app.use(isProduction
        ? (0, morgan_1.default)('combined', { stream: accessLogStream })
        : (0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    (0, index_1.routes)(app);
    app.listen(port, () => {
        console.log(`Server running on port ${port}: http://localhost:${port}`);
    });
};
