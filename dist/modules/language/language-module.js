"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const language_router_1 = __importDefault(require("./language-router"));
class LanguageModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new language_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.index().show().store().update().delete();
    }
}
exports.default = LanguageModule;
//# sourceMappingURL=language-module.js.map