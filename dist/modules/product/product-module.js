"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_router_1 = __importDefault(require("./product-router"));
class ProductModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new product_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.index().show().showBySlug().showByEan().store().update().delete().upload();
    }
}
exports.default = ProductModule;
//# sourceMappingURL=product-module.js.map