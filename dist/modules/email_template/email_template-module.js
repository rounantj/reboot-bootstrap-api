"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_template_router_1 = __importDefault(require("./email_template-router"));
class Email_TemplateModule {
    constructor(moduleName, isPublic, prismaClient) {
        this.moduleName = moduleName;
        this.isPublic = isPublic;
        this.router = new email_template_router_1.default(prismaClient);
        this.loadRoutes();
    }
    loadRoutes() {
        this.router.index().show().store().update().delete().document().sendMail();
    }
}
exports.default = Email_TemplateModule;
//# sourceMappingURL=email_template-module.js.map