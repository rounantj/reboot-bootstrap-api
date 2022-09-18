"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permission_router_1 = __importDefault(require("./permission-router"));
class PermissionModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new permission_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.index().show().delete();
    }
}
exports.default = PermissionModule;
//# sourceMappingURL=permission-module.js.map