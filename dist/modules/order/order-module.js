"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_router_1 = __importDefault(require("./order-router"));
class ProductModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new order_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.index().show().store().update().delete();
    }
}
exports.default = ProductModule;
//# sourceMappingURL=order-module.js.map