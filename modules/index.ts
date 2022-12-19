
import ProductModule from "./product/product-module";
import CategoryModule from "./category/category-module";
import Email_TemplateModule from "./email_template/email_template-module";
import LanguageModule from "./language/language-module";
import RoleModule from "./role/role-module";
import PermissionModule from "./permission/permission-module";
import UserModule from "./user/user-module";
import OrderModule from "./order/order-module";
import { modules as module } from "../helpers/modules";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const modules = [

  new ProductModule(module.product, true, prismaClient),
  new OrderModule(module.order, false, prismaClient),
  new CategoryModule(module.category, false, prismaClient),
  new Email_TemplateModule(module.email_template, true, prismaClient),
  new LanguageModule(module.language, false, prismaClient),
  new RoleModule(module.role, true, prismaClient),
  new PermissionModule(module.permission, false, prismaClient),
  new UserModule(module.user, false, prismaClient),
];
