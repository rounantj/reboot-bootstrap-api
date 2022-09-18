"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_router_1 = __importDefault(require("./role-router"));
class RoleModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new role_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.showDefaultRoleUser().index().show().batchSave().batchDestroy();
    }
}
exports.default = RoleModule;
//# sourceMappingURL=role-module.js.map