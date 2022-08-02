"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./users.routes"));
const data_routes_1 = __importDefault(require("./data.routes"));
const router = express_1.default.Router();
router.use('/users', users_routes_1.default);
router.use('/data', data_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map