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
Object.defineProperty(exports, "__esModule", { value: true });
class PermissionRepository {
    constructor(client) {
        this.client = client;
        this.roleOptions = {
            include: {
                role: true,
            },
        };
    }
    all(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: transform word in plural with irregular to
            const data = yield this.client.permission.findMany({
                include: {
                    roles: params.role ? this.roleOptions : false,
                },
            });
            return data;
        });
    }
    get(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield this.client.permission.findFirst({
                where: { id },
                include: {
                    roles: params.role ? this.roleOptions : false,
                },
            });
            return permission;
        });
    }
    getByName(name, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield this.client.permission.findFirst({
                where: { name },
                include: {
                    roles: params.role ? this.roleOptions : false,
                },
            });
            return permission;
        });
    }
    getRolePermission(roleId, permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rolePermission = yield this.client.role_permission.findFirst({
                where: { roleId, permissionId },
            });
            return rolePermission;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield this.client.permission.delete({
                where: { id },
            });
            return permission;
        });
    }
}
exports.default = PermissionRepository;
//# sourceMappingURL=permission-repository.js.map