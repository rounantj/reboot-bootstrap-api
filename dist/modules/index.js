"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
const product_module_1 = __importDefault(require("./product/product-module"));
const category_module_1 = __importDefault(require("./category/category-module"));
const email_template_module_1 = __importDefault(require("./email_template/email_template-module"));
const language_module_1 = __importDefault(require("./language/language-module"));
const role_module_1 = __importDefault(require("./role/role-module"));
const permission_module_1 = __importDefault(require("./permission/permission-module"));
const user_module_1 = __importDefault(require("./user/user-module"));
const order_module_1 = __importDefault(require("./order/order-module"));
const modules_1 = require("../helpers/modules");
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.modules = [
    new product_module_1.default(modules_1.modules.product, false, prismaClient),
    new order_module_1.default(modules_1.modules.order, false, prismaClient),
    new category_module_1.default(modules_1.modules.category, false, prismaClient),
    new email_template_module_1.default(modules_1.modules.email_template, true, prismaClient),
    new language_module_1.default(modules_1.modules.language, false, prismaClient),
    new role_module_1.default(modules_1.modules.role, true, prismaClient),
    new permission_module_1.default(modules_1.modules.permission, false, prismaClient),
    new user_module_1.default(modules_1.modules.user, false, prismaClient),
];
//# sourceMappingURL=index.js.map