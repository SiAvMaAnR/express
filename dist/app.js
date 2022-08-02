"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
const host = process.env.HOST;
app.use(express_1.default.static(`${__dirname}/assets`));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/api', index_1.default);
app.listen(port, host, () => {
    console.log(`Success! Server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map