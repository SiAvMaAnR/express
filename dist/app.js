"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/routes/index"));
const sequelize_1 = __importStar(require("./src/sequelize/sequelize"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
require("dotenv/config");
const onConnection_1 = __importDefault(require("./src/socket_io/onConnection"));
const cors_config_1 = __importDefault(require("./src/cors.config"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const port = parseInt(process.env.PORT) || 3000;
const io = new socket_io_1.Server(server, {
    cors: cors_config_1.default
});
app.use((0, cors_1.default)(cors_config_1.default));
app.use(express_1.default.static(`${__dirname}/assets`));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/api', index_1.default);
(0, sequelize_1.openConnection)()
    .then(() => __awaiter(void 0, void 0, void 0, function* () { return console.log("open connection!"); }))
    .catch((err) => console.error(err.message));
io.on("connection", (socket) => (0, onConnection_1.default)(io, socket));
(0, sequelize_1.sync)(sequelize_1.default).then((sequelize) => {
    server.listen(port, () => {
        console.log(`Server is listening port ${port}`);
    });
}).catch((err) => {
    console.error(err.message);
});
//# sourceMappingURL=app.js.map