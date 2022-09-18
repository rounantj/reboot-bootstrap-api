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
class RoleRepository {
    constructor(client) {
        this.client = client;
        this.permissionOptions = {
            include: {
                permission: true,
            },
        };
    }
    all(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: transform word in plural with irregular to
            const data = yield this.client.role.findMany({
                include: {
                    user: params.user,
                    permissions: params.permission ? this.permissionOptions : false,
                },
            });
            return data;
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.client.role.findFirst({
                where: { name },
            });
            return role;
        });
    }
    get(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.client.role.findFirst({
                where: { id },
                include: {
                    user: params.user,
                    permissions: params.permission ? this.permissionOptions : false,
                },
            });
            return role;
        });
    }
    batchSaveRolesPermissions(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles_permissions = yield this.client.role_permission.createMany({
                data: payload,
            });
            return roles_permissions;
        });
    }
    batchDestroyRolesPermissions(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles_permissions = yield this.client.role_permission.deleteMany({
                where: {
                    roleId: {
                        in: payload.map((rolePermission) => rolePermission.roleId),
                    },
                    permissionId: {
                        in: payload.map((rolePermission) => rolePermission.permissionId),
                    },
                },
            });
            return roles_permissions;
        });
    }
}
exports.default = RoleRepository;
//# sourceMappingURL=role-repository.js.map