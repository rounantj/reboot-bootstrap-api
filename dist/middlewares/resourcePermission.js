"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcePermission = void 0;
const client_1 = require("@prisma/client");
const reboot_solutions_cms_1 = require("reboot-solutions-cms");
const permission_repository_1 = __importDefault(require("../modules/permission/permission-repository"));
function resourcePermission(resource) {
    return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const permissionRepository = new permission_repository_1.default(new client_1.PrismaClient());
            const { roleId } = request.user;
            const permission = yield permissionRepository.getByName(resource, {
                role: false,
            });
            if (permission && roleId) {
                const rolePermission = yield permissionRepository.getRolePermission(roleId, permission.id);
                if (rolePermission) {
                    next();
                }
                else {
                    throw new reboot_solutions_cms_1.ForbiddenError("Você não tem permissão para acessar esse recurso");
                }
            }
            else {
                throw new reboot_solutions_cms_1.ForbiddenError("Você não tem permissão para acessar esse recurso");
            }
        }
        catch (error) {
            return (0, reboot_solutions_cms_1.onError)(response, error);
        }
    });
}
exports.resourcePermission = resourcePermission;
//# sourceMappingURL=resourcePermission.js.map