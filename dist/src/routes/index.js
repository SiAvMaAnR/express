"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const statisticRoutes_1 = __importDefault(require("./statisticRoutes"));
const tempRoutes_1 = __importDefault(require("./tempRoutes"));
const router = express_1.default.Router();
router.use('/users', userRoutes_1.default);
router.use('/statistic', statisticRoutes_1.default);
router.use('/temp', tempRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map