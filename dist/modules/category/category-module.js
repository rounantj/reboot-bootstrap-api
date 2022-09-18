"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_router_1 = __importDefault(require("./category-router"));
class CategoryModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new category_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.index().show().showBySlug().store().update().delete();
    }
}
exports.default = CategoryModule;
//# sourceMappingURL=category-module.js.map